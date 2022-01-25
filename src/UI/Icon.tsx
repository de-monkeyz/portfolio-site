import React from "react";
export interface IconProps {
  name: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className }) => {
  let SVG = null;
  try {
    SVG = require(`assets/icons/posts/${name}.svg`)?.default;
  } catch (e) {}
  if (!SVG) {
    return null;
  }
  return <SVG className={className} />;
};

export default Icon;
