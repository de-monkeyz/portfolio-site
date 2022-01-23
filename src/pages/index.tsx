import type { NextPage } from "next";
import Title from "meta/Title";

import Centered from "Layout/Centered";
import Panel from "UI/Panel";

const Home: NextPage = () => {
  return (
    <Centered padding={32} height="100vh">
      <Panel>
        <Title>Hello!</Title>
        <h1>Coming Soon.</h1>
      </Panel>
    </Centered>
  );
};
export default Home;
