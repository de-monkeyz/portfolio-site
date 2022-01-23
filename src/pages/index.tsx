import type { NextPage } from "next";
import { getStaticMDXProps, MDXProps } from "MDX/utils";
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

export const getStaticProps = getStaticMDXProps("home");

export default Home;
