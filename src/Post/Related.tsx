import { MDXRelatedItem } from "MDX/types";
import React from "react";
import styled from "styled-components";

import Link from "next/link";
import { transitionTheme } from "styles/mixins";
import ThumbnailOrIcon from "./ThumbnailOrIcon";

export interface RelatedProps {
  item: MDXRelatedItem;
}

const COLORS: { [key: string]: string } = {
  skills: "var(--color-primary)",
  interests: "var(--color-secondary)",
};

const Related: React.FC<RelatedProps> = ({ item }) => {
  const color = COLORS[item.type];
  return (
    <Link href={`/${item.id}`} passHref={true}>
      <RelatedWrapper
        style={{
          ["--background" as any]: color,
        }}
      >
        <ThumbnailOrIcon id={item.id} icon={item.icon} size={true} />
        <Title>{item.title}</Title>
        <Summary>
          {item.excerpt}
          <strong>Read More</strong>
        </Summary>
      </RelatedWrapper>
    </Link>
  );
};

const Summary = styled.span`
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  color: var(--color-foreground);
  padding: 16px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  opacity: 0;
  transition: opacity 0.3s;
`;

const Title = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  padding: 8px;
  background: var(--color-panel);
`;

const RelatedWrapper = styled.a`
  position: relative;
  border-radius: 3px;
  overflow: hidden;
  color: var(--color-foreground);
  ${transitionTheme()}
  box-shadow: var(--effect-lowShadow);
  gap: 32px;
  text-decoration: none;
  font-size: var(--heading-4);

  &:hover ${Summary} {
    opacity: 1;
  }
`;

export default Related;
