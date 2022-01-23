import React from "react";
import Image from "next/image";
import styled from "styled-components";
import Picture from "assets/photos/Avatar@3x.jpg";

const Avatar: React.FC = () => {
  return (
    <AvatarWrapper>
      <Image src={Picture} alt="Me" width={192} height={192} />
      <ColorOverlay />
    </AvatarWrapper>
  );
};

const ColorOverlay = styled.div`
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
`;
const AvatarWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 192px;
  height: 192px;
  border-radius: 50%;
  box-shadow: inset 0px 0px 5px #000000;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default Avatar;
