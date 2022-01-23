import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useThemeToggle } from "styles/theme/Context";
import { motion, Transition } from "framer-motion";

import SunIcon from "assets/icons/carbon_sun.svg";
import MoonIcon from "assets/icons/carbon_moon.svg";

const AnimationConfig: Transition = {
  type: "spring",
  duration: 1,
};

const ThemeToggle: React.FC = () => {
  const [theme, toggleTheme] = useThemeToggle();
  const lastTheme = useRef(theme);
  const [rotation, setRotation] = useState<number>(-1);

  useEffect(() => {
    if (!theme) {
      return;
    }

    if (lastTheme.current !== theme) {
      if (!lastTheme.current) {
        setRotation(theme === "dark" ? 180 : 0);
      } else {
        setRotation((r) => (r += 180));
      }
    }
    lastTheme.current = theme;
  }, [theme]);

  if (!theme || rotation < 0) {
    return null;
  }

  return (
    <ThemeToggleWrapper onClick={() => toggleTheme()}>
      <AnimationWrapper
        initial={false}
        animate={{
          rotate: rotation,
        }}
        transition={AnimationConfig}
      >
        <Sun>
          <SunIcon />
        </Sun>
        <Moon>
          <MoonIcon />
        </Moon>
      </AnimationWrapper>
    </ThemeToggleWrapper>
  );
};

const Sun = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  svg {
    display: block;
    width: 24px;
    height: 24px;
  }
`;
const Moon = styled(Sun)`
  transform: rotate(180deg);
`;
const AnimationWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200%;
  transform-origin: center;
`;
const ThemeToggleWrapper = styled.button.attrs({ type: "button" })`
  position: absolute;
  top: 16px;
  left: 16px;
  border: 0;
  width: 44px;
  height: 32px;
  background: none;
  /* box-shadow: var(--effect-lowShadow); */
  /* border-radius: 3px; */
  overflow: hidden;
  /* background: var(--color-panel); */
  transition: color 0.25s ease-in-out, border-bottom-color 0.25s ease-in-out;
  cursor: pointer;
  border-bottom: 2px solid rgba(0, 0, 0, 0);

  &:hover {
    border-bottom-color: var(--color-foreground);
  }
`;

export default ThemeToggle;
