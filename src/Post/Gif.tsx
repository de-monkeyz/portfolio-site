import React from "react";
import styled from "styled-components";
import { transitionTheme, mobile, css } from "styles/mixins";

export interface GifProps {
  src: string;
  caption?: string;
  aspect?: number;
}

const Gif: React.FC<GifProps> = ({ src, aspect = 1, caption }) => {
  return (
    <GifWrapper
      style={{
        ["--aspect" as any]: aspect,
      }}
    >
      <Video src={src} autoPlay={true} loop={true} muted={true} />
      {caption && <Caption>{caption}</Caption>}
    </GifWrapper>
  );
};

const Caption = styled.figcaption`
  text-align: center;
  display: block;
  position: relative;
  background: var(--color-background);
  line-height: 1.2;
  padding: 0 8px 8px;
  font-style: italic;
  ${transitionTheme()}

  ${mobile(
    css`
      font-size: 12px;
    `
  )}
`;
const Video = styled.video`
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 32px;
  border-radius: 3px;
`;
const GifWrapper = styled.figure`
  display: block;
  margin: 64px auto;
  width: 80%;
  /* max-width: 300px; */
  overflow: hidden;
  position: relative;

  &::before {
    content: "";
    width: 100%;
    height: 0;
    box-sizing: content-box;
    display: block;
    padding-bottom: calc(100% / var(--aspect));
  }

  ${mobile(
    css`
      margin: 32px auto;
      width: 100%;
    `
  )}
`;

export default Gif;
