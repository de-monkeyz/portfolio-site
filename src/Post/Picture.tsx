import React from "react";
import styled from "styled-components";
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

const Picture: React.FC<PictureProps> = ({
  src,
  alt,
  caption,
  width,
  height,
  aspect = 16 / 9,
}) => {
  return (
    <PictureWrapper
      style={{
        ["--aspect" as any]: aspect,
        ["--width" as any]: addUnit(width),
        ["--height" as any]: addUnit(height),
      }}
    >
      <Frame>
        <Image
          alt={alt ?? caption ?? ""}
          src={src}
          width={width}
          height={height}
          layout={width || height ? "intrinsic" : "fill"}
          sizes="(min-width: 1500px) 760px,50vw,30vw"
          objectFit="cover"
        />
      </Frame>
      {caption && <Caption>{caption}</Caption>}
    </PictureWrapper>
  );
};

const PictureWrapper = styled.div`
  width: 80%;
  margin: 0 auto;

  padding: 32px 0;
  overflow: hidden;
`;

const Frame = styled.div`
  margin: auto;
  width: var(--width, 100%);
  height: var(--height, auto);
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
