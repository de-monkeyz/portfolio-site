import React from "react";
import styled from "styled-components";

import { addUnit } from "util/css";

interface PropTypes {
  columns?: string;
  height?: string | number;
}

const Columns: React.FC<PropTypes> = ({ columns, height, children }) => {
  return (
    <ColumnsWrapper
      style={{
        ["--columns" as any]: columns,
        ["--height" as any]: addUnit(height),
      }}
    >
      {children}
    </ColumnsWrapper>
  );
};

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: var(--columns, 1fr);
  min-height: 100vh;
  grid-template-rows: auto 1fr auto;
`;

export default Columns;
