import type { NextPage } from "next";
import { createStaticProps, createStaticPaths } from "MDX/next";
import { MDXProps } from "MDX/types";
import Post from "Post";
import { createStaticProps as shareCardProps } from "ShareCard/next";

const Skill: NextPage<MDXProps> = ({ error, ...rest }) => {
  if (error) {
    return <p>Crap!</p>;
  }

  return <Post {...(rest as any)} />;
};

export const getStaticPaths = createStaticPaths("skills", true);
export const getStaticProps = shareCardProps(
  "skills",
  createStaticProps("skills", true)
);

export default Skill;
