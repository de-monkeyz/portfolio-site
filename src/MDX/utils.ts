import { GetStaticProps } from "next";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import readingTime from "reading-time";
import { formatISO } from "date-fns";

import path from "path";
import fs from "fs";

type MDXResult = {
  source: MDXRemoteSerializeResult;
  frontMatter: Object;
  pages?: Array<{
    slug: string;
    title: string;
  }>;
  [key: string]: any;
};

const MDX_DIR = path.join(process.cwd(), "data/mdx/");
async function load(name: string): Promise<string> {
  const fileToLoad = path.join(MDX_DIR, `${name}.mdx`);
  return await fs.promises.readFile(fileToLoad, "utf-8");
}

function loadMatter(source: string) {
  const { content, data } = matter(source);
  // Next.js can't process any Date objects, so forcibly convert them here
  for (const [key, value] of Object.entries(data)) {
    console.log(
      "Iterating over metadata",
      key,
      "=>",
      value,
      "(",
      typeof value,
      ")"
    );
    if (value instanceof Date) {
      console.log("Converting", value, "to ISO");
      data[key] = formatISO(value);
    }
  }

  return { content, data };
}

async function parse(mdx: string): Promise<MDXResult> {
  const { content, data } = loadMatter(mdx);
  const source = await serialize(content, { scope: data });
  return {
    source,
    frontMatter: {
      readingTime: readingTime(content),
      ...data,
    },
  };
}

async function loadAndParse(name: string): Promise<MDXResult> {
  const source = await load(name);
  return await parse(source);
}

type MDXProps = {
  source?: MDXRemoteSerializeResult;
  meta?: Object;
  error: boolean;
};
function getStaticMDXProps(nameOrCategory: string, multi?: boolean) {
  const staticProps: GetStaticProps<MDXProps> = async ({ params = {} }) => {
    const slug = params.slug ?? "index";
    const toLoad = multi ? `${nameOrCategory}/${slug}` : nameOrCategory;
    try {
      const data = await loadAndParse(toLoad);
      return {
        props: {
          source: data?.source,
          meta: data?.frontMatter,
          error: false,
          ...(multi && slug === "index"
            ? {
                pages: await list(nameOrCategory, true),
              }
            : {}),
        },
      };
    } catch (e) {
      return {
        props: {
          error: true,
        },
      };
    }
  };
  return staticProps;
}

async function list(category: string, withMeta?: boolean) {
  try {
    const directory = path.join(MDX_DIR, `/${category}/`);
    const files = await fs.promises.readdir(directory);

    const items = [];
    for (const filename of files) {
      const slug = filename.replace(/\.mdx$/, "");
      let data = {};
      if (withMeta) {
        const content = await load(`${category}/${slug}`);
        ({ data } = loadMatter(content));
      }
      items.push({
        ...(withMeta ? data : {}),
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

function getStaticMDXPaths(type: string, includeEmpty?: boolean) {
  return async function () {
    const items = await list(type);
    return {
      paths: [
        ...(includeEmpty
          ? [
              {
                params: { slug: [] },
              },
            ]
          : []),
        ...items,
      ],
      fallback: false,
    };
  };
}

export {
  load,
  list,
  parse,
  loadAndParse,
  getStaticMDXProps,
  getStaticMDXPaths,
};
export type { MDXProps };
