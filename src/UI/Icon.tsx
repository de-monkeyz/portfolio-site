import React, { ComponentType } from "react";
export interface IconProps {
  name?: string | null;
  className?: string;
  fallback?: ComponentType<{ className?: string }>;
}

const Icon: React.FC<IconProps> = ({ name, className, fallback: Fallback }) => {
  let SVG = null;
  try {
    if (name) {
      SVG = require(`assets/icons/posts/${name}.svg`)?.default;
    }
  } catch (e) {}
  if (!SVG) {
    if (Fallback) {
      return <Fallback className={className} />;
    }
    return null;
  }
  return <SVG className={className} />;
};

export default Icon;
