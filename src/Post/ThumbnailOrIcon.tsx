import styled from "styled-components";
import Image from "next/image";
import SVGIcon from "UI/Icon";
import { transitionTheme } from "styles/mixins";

import PageIcon from "assets/icons/page.svg";

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
      <Icon name={icon} fallback={PageIcon} />
      <Thumbnail>
        <Image
          width={size === true ? 350 : size}
          height={size === true ? 350 : size}
          src={`/thumbnails/${id}.jpg`}
          alt=""
          layout="intrinsic"
          objectFit="cover"
          quality={90}
        />
      </Thumbnail>
    </Tile>
  );
};

const Tile = styled.div`
  box-sizing: content-box;
  min-width: var(--size, 100%);
  max-width: var(--size, 100%);
  display: block;
  position: relative;
  overflow: hidden;
  background-color: var(--color-empty);
  ${transitionTheme()}
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
  ${transitionTheme()}
`;

const Thumbnail = styled.div`
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
