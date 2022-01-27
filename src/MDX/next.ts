import { GetStaticProps } from "next";
import { MDXListOptions, MDXProps, MDXSummary } from "./types";

import { list, loadAndParse } from "./parse";

async function getIndexPages(
  type: string,
  slug: string | string[],
  options: MDXListOptions = {}
): Promise<Partial<MDXSummary>[] | null> {
  if (slug !== "index") {
    return null;
  }
  const items = await list(type, {
    ...options,
    excludeIndex: true,
    withMeta: true,
  });
  return items;
}

function createStaticProps(
  nameOrCategory: string,
  multi?: boolean,
  options: MDXListOptions = {}
) {
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
          pages: multi
            ? await getIndexPages(nameOrCategory, slug, options)
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
          params: {
            slug: [item.slug],
          },
        })),
      ],
      fallback: false,
    };
  };
}

export { createStaticPaths, createStaticProps };
