import type { NextPage } from "next";
import {
  getStaticMDXProps,
  getStaticMDXPaths,
  MDXProps,
  list,
} from "MDX/utils";
import Post from "MDX/Post";

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

export const getStaticPaths = getStaticMDXPaths("skills", true);
export const getStaticProps = getStaticMDXProps("skills", true);

export default Skill;