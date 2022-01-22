import styled from "styled-components";

import NavLink from "./NavLink";
import Socials from "./Socials";
import { useThemeToggle } from "styles/theme/Context";

const Sidebar: React.FC = () => {
  const [, toggleTheme] = useThemeToggle();
  return (
    <SidebarWrapper>
      <button onClick={() => toggleTheme()}>Toggle</button>
      <Navigation>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/skills">Skills</NavLink>
        <NavLink href="/interests">Interests</NavLink>
      </Navigation>
      <Socials />
    </SidebarWrapper>
  );
};

Sidebar.propTypes = {};

const Navigation = styled.nav`
  margin: auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const SidebarWrapper = styled.aside`
  min-height: 100vh;
  background: var(--color-sidebar);
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 32px;
`;

export default Sidebar;
