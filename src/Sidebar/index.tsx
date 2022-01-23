import styled from "styled-components";

import NavLink from "./NavLink";
import Socials from "./Socials";
import Avatar from "./Avatar";

const Sidebar: React.FC = () => {
  return (
    <SidebarWrapper>
      <Avatar />
      <Name>Ashley Blurton</Name>
      <Title>Frontend Engineer</Title>
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

const Name = styled.span`
  font-size: 24px;
  color: var(--color-primary);
  margin-bottom: -20px;
  transition: color 0.2s ease-in-out;
`;
const Title = styled.span``;

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
  gap: 20px;
  transition: background-color 0.2s ease-in-out;
`;

export default Sidebar;
