import { GetStaticProps } from "next";
import { MDXListOptions, MDXProps, MDXPageList } from "./types";

import { list, loadAndParse } from "./parse";

async function getIndexPages(
  type: string,
  slug: string | string[],
  page: number,
  options: MDXListOptions = {}
): Promise<MDXPageList> {
  if (slug !== "index") {
    return { pages: null, pagination: null };
  }
  const pages = await list(type, {
    ...options,
    excludeIndex: true,
    withMeta: true,
  });

  if (page > 0) {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const total = Math.ceil(pages.length / ITEMS_PER_PAGE);
    return {
      pages: pages.slice(start, start + ITEMS_PER_PAGE),
      pagination: {
        current: page,
        total: total,
      },
    };
  }

  return { pages, pagination: null };
}

const ITEMS_PER_PAGE = 1;
function createStaticProps(
  nameOrCategory: string,
  multi?: boolean,
  paginated?: boolean,
  options: MDXListOptions = {}
) {
  const staticProps: GetStaticProps<MDXProps> = async ({ params = {} }) => {
    let [slug = "index", page = ""] = Array.isArray(params.slug)
      ? params.slug
      : [params.slug];

    // Pagination enabled
    if (paginated) {
      slug = "index";
    }
    const toLoad = multi ? `${nameOrCategory}/${slug}` : nameOrCategory;
    try {
      const data = await loadAndParse(toLoad);
      let pages = null,
        pagination = null;
      if (multi) {
        ({ pagination, pages } = await getIndexPages(
          nameOrCategory,
          slug,
          paginated ? parseInt(page, 10) || 1 : -1,
          options
        ));
      }
      return {
        props: {
          pagination,
          source: data?.source,
          meta: data?.frontMatter,
          error: false,
          pages: pages,
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
function createStaticPaths(
  type: string,
  includeIndex?: boolean,
  pagination?: boolean
) {
  return async function () {
    const items = await list(type, {
      withMeta: true,
    });

    const paths = [
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
    ];

    if (pagination) {
      const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
      for (let i = 1; i <= totalPages; i++) {
        paths.push({
          params: {
            slug: ["page", i.toString()],
          },
        });
      }
    }

    return {
      paths: paths,
      fallback: false,
    };
  };
}

export { createStaticPaths, createStaticProps };
