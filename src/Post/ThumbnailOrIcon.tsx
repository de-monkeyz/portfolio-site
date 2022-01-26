import React from "react";
import styled from "styled-components";
import Image from "next/image";
import SVGIcon from "UI/Icon";

export interface ThumbnailOrIconProps {
  id: string;
  size: number | true;
  icon?: string;
  className?: string;
}

const ThumbnailOrIcon: React.FC<ThumbnailOrIconProps> = ({
  size,
  icon,
  id,
  className,
}) => {
  return (
    <Tile
      className={className}
      style={{
        ["--size" as any]: size === true ? "100%" : `${size}px`,
      }}
    >
      {icon && <Icon name={icon} />}
      <Thumbnail>
        <Image
          width={size === true ? 350 : size}
          height={size === true ? 350 : size}
          src={`/thumbnails/${id}.jpg`}
          alt=""
          layout="responsive"
          objectFit="cover"
          quality={90}
        />
      </Thumbnail>
    </Tile>
  );
};

const Tile = styled.span`
  box-sizing: content-box;
  min-width: var(--size, 100%);
  max-width: var(--size, 100%);
  display: block;
  position: relative;
  overflow: hidden;
  background-color: var(--background, var(--color-foreground));
  &::before {
    content: "";
    display: block;
    width: 0;
    padding-bottom: 100%;
  }
`;
const Icon = styled(SVGIcon)`
  width: 64px;
  height: 64px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  color: var(--color-foreground);
`;

const Thumbnail = styled.span`
  display: block;
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  img {
    width: 100%;
    height: 100%;
  }
`;

export default ThumbnailOrIcon;
