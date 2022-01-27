import { MDXSummary } from "MDX/types";
import styled, { css } from "styled-components";

import Link from "next/link";
import { transitionTheme } from "styles/mixins";
import ThumbnailOrIcon from "./ThumbnailOrIcon";

import NextIcon from "assets/icons/next.svg";

export interface ListingProps {
  item: MDXSummary;
}

const COLORS: { [key: string]: string } = {
  skills: "var(--color-primary)",
  interests: "var(--color-secondary)",
};

const Listing: React.FC<ListingProps> = ({ item }) => {
  const color = COLORS[item.type];
  return (
    <Link href={`/${item.id}`} passHref={true}>
      <ListingWrapper
        $draft={item.draft}
        style={{
          ["--background" as any]: color,
        }}
      >
        <Thumbnail id={item.id} icon={item.icon} size={100} />
        <Details>
          <Title>{item.title}</Title>
        </Details>
        <More>
          <NextIcon />
        </More>
      </ListingWrapper>
    </Link>
  );
};

const Thumbnail = styled(ThumbnailOrIcon)``;
const Title = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 8px;
  font-size: 14px;
`;

const ListingWrapper = styled.a<{ $draft?: boolean }>`
  height: 100px;
  position: relative;
  border-radius: 3px;
  overflow: hidden;
  color: var(--color-foreground);
  box-shadow: var(--effect-lowShadow);
  ${transitionTheme(["color", "background-color", "box-shadow"])}
  text-decoration: none;
  font-size: var(--heading-4);
  display: flex;
  align-items: center;
  gap: 0;
  background: var(--color-panel);
  perspective: 10000px;

  ${(props) =>
    props.$draft &&
    css`
      &::after {
        content: "Draft";
        position: absolute;
        top: 8px;
        right: 8px;
        padding: 8px;
        color: var(--color-warning);
        border: 1px solid;
        border-radius: 3px;
        font-size: 12px;
        line-height: 1em;
        width: 84px;
        height: 84px;
      }
    `}
`;

const Details = styled.span`
  position: relative;
  display: block;
  flex: 1;
  backface-visibility: hidden;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 16px;
`;

const More = styled.button.attrs({ type: "button", tabIndex: -1 })`
  min-width: 100px;
  height: 100px;
  background: none;
  border: none;
  pointer-events: none;
  color: inherit;
  background: rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: opacity 0.2s ease-in-out;

  ${ListingWrapper}:hover & {
    opacity: 1;
  }

  @media (max-width: 450px) {
    display: none;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

export default Listing;
