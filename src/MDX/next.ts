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
          pages:
            multi && slug === "index"
              ? await list(nameOrCategory, true, true)
              : null,
        } as MDXProps,
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
        ...items.map((item) => ({
          params: item.params,
        })),
      ],
      fallback: false,
    };
  };
}

export { createStaticPaths, createStaticProps };
