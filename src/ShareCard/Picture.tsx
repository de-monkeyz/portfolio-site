import React from "react";

export interface PictureProps {
  src: string;
  file?: boolean;
}

const Picture: React.FC<PictureProps> = ({ src, file }) => {
  const transformedSource = `${
    file
      ? `file://${process.cwd()}/public/__share_card/`
      : "http://localhost:3000/__share_card/"
  }${src}`;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={transformedSource} alt="" />;
};

export default Picture;
