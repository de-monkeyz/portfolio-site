import React from "react";
import styled from "styled-components";

import Head from "next/head";
import Title from "meta/Title";
import Centered from "Layout/Centered";

import { MDXRemoteSerializeResult, MDXRemote } from "next-mdx-remote";

interface PropTypes {
  source: MDXRemoteSerializeResult;
  shareCard: string | null;
  meta: {
    title?: string;
    shareTitle?: string;
    description?: string;
    excerpt?: string;
    image?: string;
    publishedAt: string;
    updatedAt?: string;
  };
}

const Post: React.FC<PropTypes> = ({ source, meta, shareCard }) => {
  const description = meta.description || meta.excerpt;
  const shareTitle = meta.shareTitle || meta.title;
  return (
    <Centered>
      {shareTitle && <Title>{shareTitle}</Title>}
      <Head>
        {shareCard && (
          <meta property="og:image" content={shareCard} key="image" />
        )}
        <meta
          key="published"
          property="og:article:published_time"
          content={meta.publishedAt}
        />
        {meta.updatedAt && (
          <meta
            key="published"
            property="og:article:modified_time"
            content={meta.updatedAt}
          />
        )}
        {description && (
          <meta
            property="og:description"
            content={description}
            key="description"
          />
        )}
      </Head>
      <PostWrapper>
        {meta.title && <h1>{meta.title}</h1>}
        <MDXRemote {...source} />
      </PostWrapper>
    </Centered>
  );
};

const PostWrapper = styled.article`
  padding: 32px 0;
`;

export default Post;
