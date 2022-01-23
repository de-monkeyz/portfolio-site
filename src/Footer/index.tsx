import React from "react";
import styled from "styled-components";
import { mobile, css } from "styles/mixins";

import Socials from "./Socials";

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <Socials />
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  height: var(--size-footer);
  background: var(--color-sidebar);
  transition: background-color 0.2s ease-in-out;
  grid-column: 2;
  display: flex;
  align-items: center;
  justify-content: center;

  ${mobile(
    css`
      grid-column: 1;
    `
  )}
`;

export default Footer;
