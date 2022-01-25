import React from "react";
import styled from "styled-components";
import { mobile, css } from "styles/mixins";

import { addUnit } from "util/css";

interface PropTypes {
  padding?: number;
  width?: number | string;
  height?: number | string;
}

const Centered: React.FC<PropTypes> = ({
  padding,
  height,
  width,
  children,
}) => {
  return (
    <CenteredWrapper
      style={{
        ["--padding" as any]: addUnit(padding),
        ["--width" as any]: addUnit(width),
        ["--height" as any]: addUnit(height),
      }}
    >
      {children}
    </CenteredWrapper>
  );
};

const CenteredWrapper = styled.div`
  padding: 0 80px;
  margin: 0 auto;
  max-width: var(--size-content-width, 100%);

  ${mobile(css`
    padding: 0 32px;
  `)}
`;

export default Centered;
