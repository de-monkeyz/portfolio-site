import React from "react";
import styled from "styled-components";
import { transitionTheme } from "styles/mixins";

export interface AlertBoxProps {
  color?: "notice" | "success" | "error" | "warning";
}

const AlertBox: React.FC<AlertBoxProps> = ({ children, color }) => {
  return (
    <AlertBoxWrapper
      style={{
        ["--color" as any]: `var(--color-${color})`,
      }}
    >
      {children}
    </AlertBoxWrapper>
  );
};

const AlertBoxWrapper = styled.div`
  padding: 16px;
  border-radius: 3px;
  border: 2px solid var(--color, --color-notice);
  background: var(--color-panel);
  ${transitionTheme(["color", "background-color", "border-color"])}
  margin: 32px 0;

  > :first-child {
    margin-top: 0;
  }

  > :last-child {
    margin-bottom: 0;
  }
`;

export default AlertBox;
