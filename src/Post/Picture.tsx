import React from "react";
import styled, { css } from "styled-components";
import Image from "next/image";
import { addUnit } from "util/css";

export interface PictureProps {
  alt?: string;
  caption?: string;
  src: string;
  width?: number;
  height?: number;
  aspect?: number;
}

const MAX_WIDTH = 760;
const Picture: React.FC<PictureProps> = ({
  src,
  alt,
  caption,
  width,
  height,
  aspect = 16 / 9,
}) => {
  const portrait = aspect < 1;

  function getSizes() {
    if (portrait) {
      return `(min-width: 1500px) ${Math.ceil(MAX_WIDTH * aspect)}px,50vw,30vw`;
    }

    return `(min-width: 1500px) ${MAX_WIDTH},50vw,30vw`;
  }

  return (
    <PictureWrapper
      $portrait={portrait}
      style={{
        ["--aspect" as any]: aspect,
        ["--width" as any]: addUnit(width),
        ["--height" as any]: addUnit(height),
      }}
    >
      <Frame $portrait={portrait}>
        <Image
          alt={alt ?? caption ?? ""}
          src={src}
          width={width}
          height={height}
          layout={width && height ? "intrinsic" : "fill"}
          sizes={getSizes()}
          objectFit="cover"
        />
      </Frame>
      {caption && <Caption>{caption}</Caption>}
    </PictureWrapper>
  );
};

const PictureWrapper = styled.div<{ $portrait: boolean }>`
  width: var(--width, 80%);
  margin: 0 auto;
  padding: 32px 0;
  overflow: hidden;
  ${(props) =>
    props.$portrait &&
    css`
      width: var(--width, calc(80% * var(--aspect)));
    `}
`;

const Frame = styled.div<{ $portrait: boolean }>`
  margin: auto;
  height: var(--height, auto);
  width: 100%;

  background: var(--color-empty);
  position: relative;
  overflow: hidden;
  border-radius: 3px;

  &::before {
    content: "";
    width: 0;
    padding-bottom: calc(100% / var(--aspect, 1));
    display: block;
    float: left;
  }
`;

const Caption = styled.p`
  margin: 0;
  padding-top: 3px;
  font-style: italic;
  text-align: center;
  font-size: var(--small-text);
`;

export default Picture;
