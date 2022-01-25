import type { NextPage } from "next";
import { createStaticProps, createStaticPaths } from "MDX/next";
import { MDXProps } from "MDX/types";
import Post from "MDX/Post";
import { getStaticShareCardProps } from "util/sharing";

const Skill: NextPage<MDXProps> = ({ error, ...rest }) => {
  if (error) {
    return <p>Crap!</p>;
  }

  return (
    <Post {...(rest as any)} />
    // <Centered padding={32} height="100vh">
    //   <Panel>
    //     <Title>Hello!</Title>
    //     <h1>Coming Soon.</h1>
    //   </Panel>
    // </Centered>
  );
};

export const getStaticPaths = createStaticPaths("skills", true);
export const getStaticProps = getStaticShareCardProps(
  "skills",
  createStaticProps("skills", true)
);

export default Skill;
