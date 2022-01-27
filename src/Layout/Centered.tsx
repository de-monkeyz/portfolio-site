import React from "react";
import styled from "styled-components";
import { mobile, css } from "styles/mixins";

import { addUnit } from "util/css";

interface PropTypes {
  padding?: number;
  width?: number | string;
  height?: number | string;
  className?: string;
}

const Centered: React.FC<PropTypes> = ({
  padding,
  height,
  width,
  children,
  className,
}) => {
  return (
    <CenteredWrapper
      className={className}
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
  display: flex;
  flex-direction: column;

  & > * {
    flex: 0;
  }

  ${mobile(css`
    padding-left: 32px;
    padding-right: 32px;
  `)}
`;

export default Centered;
