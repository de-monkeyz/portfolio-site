import { GetStaticProps } from "next";
import path from "path";
import fs from "fs";
import puppeteer, { Page, Browser } from "puppeteer";
import { createHash } from "crypto";

import { globalCss } from "styles/global";
import { colorsToString } from "styles/theme/ssr";
import { loadAndParse } from "MDX/parse";
import { format, parseISO } from "date-fns";

interface ShareCardMetadata {
  title?: string;
  publishedAt?: string;
  updatedAt?: string;
  readingTime?: {
    text: string;
  };
}

type FrontMatter = {
  frontMatter: ShareCardMetadata;
};

let browser: Browser | null = null;
const IMAGES =
  process.env.SHARE_CARD_DIRECTORY ?? `${process.cwd()}/public/share_cards/`;
export async function getOGImage(slug: string): Promise<string | null> {
  // This is an expensive operation to perform during development
  if (process.env.NODE_ENV === "development") {
    return null;
  }

  if (!browser) {
    browser = await puppeteer.launch({
      args: ["--disable-dev-shm-usage", "--no-sandbox"],
    });
  }

  let page: Page | null = null;

  try {
    const { frontMatter } = (await loadAndParse(slug)) as FrontMatter;
    if (!frontMatter.title) {
      console.log("Erroneous front matter", frontMatter);
      return null;
    }

    const hash = createHash("md5").update(slug).digest("hex");
    const file = path.join(IMAGES, `${hash}.png`);
    const thumbnail = `${process.cwd()}/assets/share_thumbnails/${slug}.jpg`;
    const url = `file://${process.cwd()}/public/__generated-share-card.html`;
    const thumbnailUrl = fs.existsSync(thumbnail)
      ? `file://${process.cwd()}/assets/share_thumbnails/${slug}.jpg`
      : null;

    const publicUrl = `${process.env.PUBLIC_URL}/share_cards/${hash}.png`;

    try {
      await fs.promises.stat(file);
      return publicUrl;
    } catch (e) {
      // file does not exists, so we create it
    }

    page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });
    await page.emulateMediaFeatures([
      { name: "prefers-color-scheme", value: "dark" },
    ]);

    await page.goto(url, { waitUntil: "networkidle0" });

    const publishedAt = frontMatter.publishedAt
      ? format(parseISO(frontMatter.publishedAt), "do MMM yyyy")
      : null;
    await page.evaluate(
      function (
        css: string,
        javascript: string,
        metadata: ShareCardMetadata,
        thumbnail: string | null,
        publishedAt: string | null
      ) {
        const script = document.createElement("script");
        const style = document.createElement("style");
        style.appendChild(document.createTextNode(css));
        script.innerHTML = javascript;
        document.body.appendChild(script);
        document.head.appendChild(style);

        for (const [key, value] of Object.entries(metadata)) {
          const element = document.getElementById(key);
          if (element) {
            element.innerText = value;
          }
        }

        // Reading time indicator
        const readingTime = document.getElementById("time");
        if (readingTime !== null) {
          if (metadata.readingTime) {
            readingTime.innerText = metadata.readingTime.text;
          } else {
            readingTime.parentNode?.removeChild(readingTime);
          }
        }

        const image = document.getElementById("image");
        if (image) {
          if (!thumbnail) {
            image.parentNode?.removeChild(image);
          } else {
            image.querySelector("img")!.src = thumbnail;
          }
        }

        const dateTime = document.getElementById("dateTime");
        if (dateTime) {
          if (!publishedAt) {
            dateTime.parentNode?.removeChild(dateTime);
          } else {
            dateTime.querySelector("#published")!.innerHTML = publishedAt;
          }
        }
      },
      globalCss.toString(),
      await colorsToString(),
      frontMatter as any,
      thumbnailUrl,
      publishedAt
    );

    await page.waitForNetworkIdle();

    const buffer = (await page.screenshot({ type: "png" })) as Buffer;
    await fs.promises.mkdir(IMAGES, { recursive: true });
    await fs.promises.writeFile(file, buffer);

    return publicUrl;
  } catch (e: any) {
    console.error(e);
  } finally {
    if (page) {
      try {
        await page.close();
      } catch (e) {
        console.warn("Could not close browser tab");
      }
    }
  }

  return null;
}

export function getStaticShareCardProps(type: string, func?: GetStaticProps) {
  const getStaticProps: GetStaticProps = async (...args) => {
    const context = args[0];
    const passthrough = (await func?.(...args)) || ({} as any);
    return {
      ...passthrough,
      props: {
        ...(passthrough.props || {}),
        shareCard: await getOGImage(
          `${type}/${context?.params?.slug ?? "index"}`
        ),
      },
    };
  };
  return getStaticProps;
}
