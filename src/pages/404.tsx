import type { NextPage } from "next";
import Title from "meta/Title";

import Centered from "Layout/Centered";

const Custom404: NextPage = () => {
  return (
    <Centered padding={32} height="100vh">
      <Title>Not Found</Title>
      <h1>404: Not Found</h1>
    </Centered>
  );
};
export default Custom404;
