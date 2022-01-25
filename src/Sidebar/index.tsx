import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { mobile, notMobile, css } from "styles/mixins";

import NavLink from "./NavLink";
import Avatar from "./Avatar";

import Hamburger from "assets/icons/carbon_menu.svg";
import { motion, Transition } from "framer-motion";

const MenuAnimationConfig: Transition = {
  type: "spring",
  mass: 0.7,
  damping: 15,
};

const Sidebar: React.FC = () => {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    setNavOpen(false);
  }, [router.pathname]);
  return (
    <SidebarWrapper>
      <Avatar />
      <Name>Ashley Blurton</Name>
      <Title>Frontend Engineer</Title>
      <MobileNavToggle onClick={() => setNavOpen((o) => !o)}>
        <Hamburger />
      </MobileNavToggle>
      <Navigation
        animate={{
          translateX: navOpen ? "-100%" : "0%",
        }}
        transition={MenuAnimationConfig}
      >
        <NavLink href="/" exact={true}>
          Home
        </NavLink>
        <NavLink href="/skills">Skills</NavLink>
        <NavLink href="/interests">Interests</NavLink>
      </Navigation>
    </SidebarWrapper>
  );
};

const Name = styled.span`
  font-size: 24px;
  color: var(--color-primary);
  margin-bottom: -20px;
  transition: color 0.2s ease-in-out;
`;
const Title = styled.span``;

const MobileNavToggle = styled.button.attrs({ type: "button" })`
  background: none;
  position: fixed;
  top: 0px;
  right: 0px;
  width: 50px;
  height: 50px;
  border: 0;
  cursor: pointer;
  color: inherit;
  z-index: 2;

  svg {
    width: 24px;
    height: 24px;
  }

  ${notMobile(css`
    display: none;
  `)}
`;
const Navigation = styled(motion.nav)`
  margin: auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: var(--color-panel);
  transition: background-color 0.2s ease-in-out;

  ${notMobile(css`
    transform: none !important;
  `)}

  ${mobile(css`
    width: 80vw;
    max-width: 360px;
    position: fixed;
    left: 100%;
    height: 100vh;
    top: 0;

    --shadow-color: 0deg 0% 0%;
    --shadow-elevation-medium: -0.8px 0.1px 0.8px
        hsl(var(--shadow-color) / 0.17),
      -2.5px 0.3px 2.5px -1.1px hsl(var(--shadow-color) / 0.15),
      -7.1px 1px 7.2px -2.2px hsl(var(--shadow-color) / 0.13),
      -18.5px 2.5px 18.8px -3.3px hsl(var(--shadow-color) / 0.11);

    box-shadow: var(--shadow-elevation-medium);
  `)}
`;

const SidebarWrapper = styled.aside`
  min-height: calc(100vh - var(--size-footer, 0px));
  background: var(--color-sidebar);
  /* width: 360px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 32px;
  gap: 20px;
  transition: background-color 0.2s ease-in-out;
  position: sticky;
  top: 0;

  ${mobile(
    css`
      top: -290px;
      order: -1;
      min-height: auto;
      padding-bottom: 50px;
    `
  )};
`;

export default Sidebar;
