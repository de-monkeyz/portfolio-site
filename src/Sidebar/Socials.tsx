import React from "react";
import styled from "styled-components";

import Github from "assets/logos/Github.svg";
import LinkedIn from "assets/logos/LinkedIn.svg";
import NPM from "assets/logos/npm.svg";

interface PropTypes {}

const Socials: React.FC<PropTypes> = () => {
  return (
    <SocialsWrapper>
      <Link href="https://github.com/de-monkeyz/" target="_blank">
        <Github />
      </Link>
      <Link href="https://www.npmjs.com/~ashleyblurton" target="_blank">
        <NPM />
      </Link>
      <Link href="https://www.linkedin.com/in/akblurton" target="_blank">
        <LinkedIn />
      </Link>
    </SocialsWrapper>
  );
};

const SocialsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  align-items: center;
  width: 100%;
`;
const Link = styled.a`
  color: var(--color-foreground);
  text-decoration: none;
  display: block;
  /* width: 44px; */
  transition: color 0.2s ease-in-out;
  svg {
    display: block;
    width: 34px;
  }
`;

export default Socials;
