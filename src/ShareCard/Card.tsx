import { MDXResult } from "MDX/types";
import React from "react";
import styled from "styled-components";
import Picture from "./Picture";
import Icon from "UI/Icon";

import { format, parseISO } from "date-fns";

export interface CardProps {
  useFileURL?: boolean;
  page: MDXResult;
  thumbnail: boolean;
}

const SUBJECTS: { [key: string]: string } = {
  skills: "A skill practised by",
  interests: "A hobby of",
};
const Card: React.FC<CardProps> = ({ useFileURL, page, thumbnail }) => {
  const { frontMatter: meta } = page;
  return (
    <CardWrapper
      style={{
        ["--rotation" as any]: "13deg",
      }}
    >
      <Avatar>
        <Picture file={useFileURL} src="Avatar.jpg" />
      </Avatar>
      {thumbnail && (
        <Thumbnail>
          <Picture file={useFileURL} src={`thumbnails/${meta.id}.jpg`} />
        </Thumbnail>
      )}
      <header>
        <Title>
          {meta.icon && <Icon name={meta.icon} />}
          <h1>{meta.shareTitle || meta.title}</h1>
        </Title>

        <h2>
          <span>{meta.subject || SUBJECTS[meta.type] || "A post by"}</span>{" "}
          <cite>Ashley Blurton</cite>
          {meta.readingTime && (
            <ReadingTime id="time">{meta.readingTime.text}</ReadingTime>
          )}
        </h2>
        {meta.publishedAt && (
          <PublishDate>
            Published:{" "}
            <span>{format(parseISO(meta.publishedAt), "do MMM yyyy")}</span>
          </PublishDate>
        )}
      </header>
    </CardWrapper>
  );
};

const Title = styled.div`
  display: flex;
  font-size: 38px;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  svg {
    width: 32px;
    height: 32px;
    position: relative;
    top: 2px;
  }
`;
const CardWrapper = styled.div`
  overflow: hidden;
  position: relative;
  display: flex;
  width: 1200px;
  height: 630px;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 38px;
    max-width: 650px;
  }

  h1,
  h2 {
    line-height: 1.2;
  }

  h2 {
    font-size: 20px;
    font-weight: normal;
  }

  cite {
    color: var(--color-primary);
    font-style: normal;
  }

  img {
    outline: 0;
    border: 0;
  }
`;

const Avatar = styled.div`
  width: 192px;
  height: 192px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  margin-right: 32px;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    background-image: linear-gradient(
      60deg,
      hsl(203deg 71% 45%) 0%,
      hsl(214deg 39% 55%) 21%,
      hsl(234deg 21% 59%) 30%,
      hsl(289deg 13% 58%) 38%,
      hsl(339deg 23% 61%) 46%,
      hsl(355deg 38% 65%) 54%,
      hsl(3deg 57% 68%) 62%,
      hsl(8deg 78% 69%) 73%,
      hsl(10deg 100% 70%) 94%
    );
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    mix-blend-mode: color;
  }
`;

const Thumbnail = styled.div`
  position: absolute;
  top: 9px;
  left: 1000px;
  height: 693px;
  width: 410px;
  transform: rotate(var(--rotation));
  overflow: hidden;
  box-shadow: var(--effect-lowShadow);

  img {
    display: block;
    width: 270px;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: -156px;
    transform-origin: top left;
    transform: rotate(calc(var(--rotation) * -1));
  }

  & + header {
    padding-right: 120px;
  }
`;

const ReadingTime = styled.time`
  color: var(--color-secondary);
  position: relative;
  margin-left: 2px;
  ::before {
    content: " — ";
  }
`;

const PublishDate = styled.time`
  margin-top: 16px;
  display: block;
  font-size: 18px;
  opacity: 0.5;
`;

export default Card;
