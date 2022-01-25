import { GetStaticProps } from "next";
import { MDXProps } from "./types";

import { list, loadAndParse } from "./parse";

function createStaticProps(nameOrCategory: string, multi?: boolean) {
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

function createStaticPaths(type: string, includeIndex?: boolean) {
  return async function () {
    const items = await list(type);
    return {
      paths: [
        ...(includeIndex
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

export { createStaticPaths, createStaticProps };
