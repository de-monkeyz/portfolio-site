import type { NextPage } from "next";
import { createStaticProps, createStaticPaths } from "MDX/next";
import Error from "next/error";
import { MDXProps } from "MDX/types";
import { createStaticProps as shareCardProps } from "ShareCard/next";
import { compareDesc, parseISO } from "date-fns";
import Pagination from "MDX/Pagination";

const Blog: NextPage<MDXProps> = ({ error, pagination, pages }) => {
  if (error) {
    return <Error statusCode={500} />;
  }

  return (
    <>
      <pre>{JSON.stringify(pages, null, 2)}</pre>
      <Pagination pagination={pagination} base="blog" />
    </>
  );
};

export const getStaticPaths = createStaticPaths("blog", true, true);
export const getStaticProps = shareCardProps(
  "blog",
  createStaticProps("blog", true, true, {
    sort: (a, b) => {
      const dateA = a.publishedAt ? parseISO(a.publishedAt) : new Date();
      const dateB = b.publishedAt ? parseISO(b.publishedAt) : new Date();

      return compareDesc(dateA, dateB);
    },
  })
);

export default Blog;
