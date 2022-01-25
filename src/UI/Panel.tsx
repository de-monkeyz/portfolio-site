import React from "react";
import styled from "styled-components";

enum ShadowOptions {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

const Shadows: { [key in ShadowOptions]?: string } = {
  [ShadowOptions.LOW]: "--effect-lowShadow",
};
interface PropTypes {
  shadow?: ShadowOptions;
}

const Panel: React.FC<PropTypes> = ({ shadow, children }) => {
  return (
    <PanelWrapper
      style={{
        ["--shadow" as any]: `var(${Shadows[shadow ?? ShadowOptions.LOW]})`,
      }}
    >
      {children}
    </PanelWrapper>
  );
};

const PanelWrapper = styled.div`
  padding: 16px;
  border-radius: 4px;
  background: var(--color-panel);
  box-shadow: var(--shadow);
  transition: background-color 0.2s ease-in-out;
`;

export default Panel;
export { ShadowOptions };
