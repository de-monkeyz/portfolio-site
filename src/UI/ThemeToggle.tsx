import React from "react";
import styled from "styled-components";
import { useThemeToggle } from "styles/theme/Context";

const ThemeToggle: React.FC = (props) => {
  const [, toggleTheme] = useThemeToggle();
  return (
    <ThemeToggleWrapper onClick={() => toggleTheme()}>
      Toggle
    </ThemeToggleWrapper>
  );
};

const ThemeToggleWrapper = styled.button.attrs({ type: "button" })`
  position: absolute;
  top: 16px;
  left: 16px;
`;

export default ThemeToggle;
