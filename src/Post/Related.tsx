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
          <Excerpt>{item.excerpt}</Excerpt>
          <strong>Read More</strong>
        </Summary>
      </RelatedWrapper>
    </Link>
  );
};

const Excerpt = styled.em`
  max-height: 60%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
`;
const Summary = styled.p`
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 44px;
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
  text-align: center;
`;

const Title = styled.h6`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: absolute;
  bottom: 0;
  left: 0;
  font-weight: normal;
  right: 0;
  text-align: center;
  padding: 8px;
  background: var(--color-panel);
  z-index: 1;
  margin: 0;
  font-size: var(--paragraph);
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

  &:hover,
  &:active {
    ${Summary} {
      opacity: 1;
    }
  }
`;

export default Related;
