import { MDXRelatedItem } from "MDX/types";
import React from "react";
import styled from "styled-components";

import Link from "next/link";
import SVGIcon from "UI/Icon";
import { transitionTheme } from "styles/mixins";

export interface RelatedProps {
  item: MDXRelatedItem;
}

const COLORS: { [key: string]: { active: string; default: string } } = {
  skills: {
    default: "var(--color-primary)",
    active: "var(--color-primaryActive)",
  },
  interests: {
    default: "var(--color-secondary)",
    active: "var(--color-secondaryActive)",
  },
};
const Related: React.FC<RelatedProps> = ({ item }) => {
  const color = COLORS[item.type];
  return (
    <Link href={`/${item.id}`} passHref={true}>
      <RelatedWrapper
        style={{
          ["--background" as any]: color?.default,
          ["--backgroundActive" as any]: color?.active,
        }}
      >
        <Flex>
          <Icon name={item.icon} />
          {item.title}
        </Flex>
      </RelatedWrapper>
    </Link>
  );
};

const Flex = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 16px;
  flex-direction: column;
`;
const Icon = styled(SVGIcon)`
  width: 64px;
  height: 64px;
  opacity: 0.2;
`;
const RelatedWrapper = styled.a`
  background-color: var(--background, var(--color-foreground));
  border-radius: 3px;
  color: var(--color-background);
  ${transitionTheme()}
  box-shadow: var(--effect-lowShadow);
  gap: 32px;
  text-decoration: none;

  &:hover,
  &:active,
  &:focus {
    background-color: var(--backgroundActive, var(--color-foreground));
  }

  font-size: var(--heading-4);
  &::before {
    float: left;
    content: "";
    display: block;
    height: 0;
    width: 0;
    padding-bottom: 100%;
  }
`;

export default Related;
