/* eslint-disable @next/next/no-page-custom-font,@next/next/no-head-element */

import path from "path";
import fs from "fs";
import puppeteer, { Page, Browser } from "puppeteer";
import { createHash } from "crypto";
import GlobalStyles from "styles/global";
import { MDXResult } from "MDX/types";
import { renderToStaticMarkup } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import { createScriptTag, FallbackStyles } from "styles/theme/ssr";
import Card from "./Card";
import { loadAndParse } from "MDX/parse";

export async function renderHTML(page: MDXResult) {
  const sheet = new ServerStyleSheet();
  const colors = await createScriptTag();

  const hasThumbnail = await checkForThumbnail(page.frontMatter.id);

  const render = () =>
    sheet.collectStyles(
      <>
        <GlobalStyles />
        <Card page={page} thumbnail={hasThumbnail} useFileURL={true} />
      </>
    );

  // Calling this twice as we need styled-components to trigger
  renderToStaticMarkup(render());
  const HTML = renderToStaticMarkup(
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,400;0,700;1,400&amp;display=swap"
          rel="stylesheet"
        />
        <FallbackStyles />
        {sheet.getStyleElement()}
        {colors}
      </head>
      <body>{render()}</body>
    </html>
  );

  return HTML;
}

export async function checkForThumbnail(slug: string) {
  const file = path.resolve(
    process.cwd(),
    "./public/__share_card/thumbnails/",
    `${slug}.jpg`
  );

  try {
    await fs.promises.stat(file);
    return true;
  } catch (e) {
    return false;
  }
}

let browser: Browser | null = null,
  browserTab: Page | null = null;
const OUTPUT_DIR =
  process.env.SHARE_CARD_DIRECTORY ?? `${process.cwd()}/public/share_cards/`;
export async function generateImage(slug: string): Promise<string | null> {
  // This is an relatively bulky (and uncessary) operation to perform during development
  if (process.env.NODE_ENV !== "production") {
    console.info("Share Cards are generated during production builds");
    return null;
  }

  try {
    const page = await loadAndParse(slug);
    const { frontMatter: meta } = page;
    if (!meta.title) {
      console.log("Erroneous front matter", meta);
      return null;
    }

    if (!browser) {
      console.log("Opening the browser...");
      browser = await puppeteer.launch({
        args: ["--disable-dev-shm-usage", "--no-sandbox"],
      });
    }

    if (!browserTab) {
      browserTab = await browser.newPage();
      await browserTab.setViewport({ width: 1200, height: 630 });
      await browserTab.emulateMediaFeatures([
        { name: "prefers-color-scheme", value: "dark" },
      ]);

      // Load a blank HTML file first to stop issues with localStorage and file://
      await browserTab.goto(
        `file://${path.join(process.cwd(), "assets/blank.html")}`
      );
    }

    const hash = createHash("md5").update(slug).digest("hex");
    const file = path.join(OUTPUT_DIR, `${hash}.png`);
    const publicUrl = `${process.env.PUBLIC_URL}/share_cards/${hash}.png`;

    await browserTab.setContent(await renderHTML(page));

    const buffer = (await browserTab.screenshot({ type: "png" })) as Buffer;
    await fs.promises.mkdir(OUTPUT_DIR, { recursive: true });
    await fs.promises.writeFile(file, buffer);

    return publicUrl;
  } catch (e: any) {
    console.error(e);
  }

  return null;
}
