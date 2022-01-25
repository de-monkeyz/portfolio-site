import type { NextPage } from "next";
import { createStaticProps } from "MDX/next";
import { MDXProps } from "MDX/types";
import Post from "MDX/Post";

const Home: NextPage<MDXProps> = ({ error, ...rest }) => {
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

export const getStaticProps = createStaticProps("home");

export default Home;
