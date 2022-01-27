import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import readingTime from "reading-time";
import { formatISO } from "date-fns";
import { remark } from "remark";
import strip from "strip-markdown";

import path from "path";
import fs from "fs";

import {
  MDXResult,
  MDXRawMeta,
  MDXMeta,
  MDXRelatedItem,
  MDXParseOptions,
  MDXRoute,
} from "./types";

function nameToTypeAndSlug(name: string): [string, string] {
  let [typeOrSlug, slug] = name.split("/");
  if (slug === void 0) {
    slug = typeOrSlug;
    typeOrSlug = "page";
  }

  return [typeOrSlug, slug];
}

const MDX_DIR = path.join(process.cwd(), "data/mdx/");
async function load(name: string): Promise<string> {
  const fileToLoad = path.join(MDX_DIR, `${name}.mdx`);
  return await fs.promises.readFile(fileToLoad, "utf-8");
}

async function loadRelatedItems(ids?: string): Promise<Array<MDXRelatedItem>> {
  if (!ids || typeof ids !== "string") {
    return [];
  }

  const identifiers = ids.split(",").map((id) => id.trim());
  const loaders: Array<Promise<MDXRelatedItem | null>> = [];

  const loadOrNull = async (item: string) => {
    try {
      return await loadMeta(item);
    } catch (e) {
      return null;
    }
  };

  for (const item of identifiers) {
    loaders.push(loadOrNull(item));
  }

  const loaded: Array<MDXRelatedItem | null> = await Promise.all(loaders);
  return loaded.filter((l) => l) as Array<MDXRelatedItem>;
}

async function processMatter(data: MDXRawMeta, loadRelated?: boolean) {
  const processed: MDXMeta = {
    related: [],
  };

  for (const [key, value] of Object.entries(data)) {
    if (key === "related") {
      if (loadRelated) {
        processed.related = await loadRelatedItems(value as string);
      }
      continue;
    }

    if (value instanceof Date) {
      processed[key] = formatISO(value);
    }

    if (["string", "boolean", "number"].includes(typeof value)) {
      processed[key] = value;
    }
  }

  return processed;
}

async function parseMatter(
  source: string,
  name: string = "unknown",
  loadRelated?: boolean
) {
  const [type, slug] = nameToTypeAndSlug(name);
  const { content, data, excerpt } = matter(source, {
    excerpt: true,
    excerpt_separator: "<!-- end -->",
  });

  // Convert excerpt to plain text
  const textExcerpt = (
    await remark()
      .use(strip)
      .process(excerpt ?? "")
  )
    .toString()
    .trim();

  const parsed = await processMatter(
    {
      ...data,
      id: name,
      slug,
      type,
      excerpt: textExcerpt,
    } as MDXRawMeta,
    loadRelated
  );

  if (!parsed.title) {
    if (process.env.NODE_ENV === "development") {
      throw new Error("MDX file is missing title field in grey matter");
    } else {
      console.error("MDX file is missing title field in grey matter");
    }
  }

  return { content, data: parsed, excerpt };
}

async function parse(
  mdx: string,
  name?: string,
  options: MDXParseOptions = {}
): Promise<MDXResult> {
  const { content, data, excerpt } = await parseMatter(
    mdx,
    name,
    options.loadRelated
  );
  const source =
    options.parseContent ?? true
      ? await serialize(content, { scope: data })
      : null;

  return {
    source,
    frontMatter: {
      readingTime: readingTime(content),
      ...data,
      excerpt,
    },
  };
}

async function loadMeta(name: string): Promise<MDXRelatedItem> {
  const source = await load(name);
  const { frontMatter } = await parse(source, name, {
    loadRelated: false,
    parseContent: false,
  });

  return {
    id: frontMatter.id,
    icon: frontMatter.icon ?? null,
    type: frontMatter.type,
    title: frontMatter.title,
    slug: frontMatter.slug,
    excerpt: frontMatter.excerpt ?? null,
  };
}

async function loadAndParse(name: string): Promise<MDXResult> {
  const source = await load(name);
  return await parse(source, name, {
    loadRelated: true,
  });
}

async function list(
  category: string,
  withMeta?: boolean,
  excludeIndex?: boolean
): Promise<Array<MDXRoute>> {
  try {
    const directory = path.join(MDX_DIR, `/${category}/`);
    const files = await fs.promises.readdir(directory);

    const items: Array<MDXRoute> = [];
    for (const filename of files) {
      if (excludeIndex && filename === "index.mdx") {
        continue;
      }
      const slug = filename.replace(/\.mdx$/, "");
      let data = {};
      if (withMeta) {
        const name = `${category}/${slug}`;
        const content = await load(name);
        ({ data } = await parseMatter(content, name));
      }
      items.push({
        data: withMeta ? (data as MDXRelatedItem) : null,
        params: {
          slug: [slug],
        },
      });
    }

    return items;
  } catch (e) {
    // Ignore error
  }

  return [];
}

export { load, list, parse, loadAndParse };
