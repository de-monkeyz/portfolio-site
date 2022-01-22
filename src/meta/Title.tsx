import React from "react";
import Head from "next/head";

const template = (text: string) => `${text} | Ashley Blurton`;
interface PropTypes {
  useTemplate?: boolean;
  applyMeta?: boolean;
  children: string;
}
const Title: React.FC<PropTypes> = ({
  useTemplate,
  children: title,
  applyMeta,
}) => {
  const usedTitle = useTemplate ?? true ? template(title) : title;

  return (
    <Head>
      <title>{usedTitle}</title>
      {(applyMeta ?? true) && (
        <meta key="title" property="og:title" content={usedTitle} />
      )}
    </Head>
  );
};

export default Title;
