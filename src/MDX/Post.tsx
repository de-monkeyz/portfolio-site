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
    description?: string;
    image?: string;
    publishedAt: string;
    updatedAt?: string;
  };
}

const Post: React.FC<PropTypes> = ({ source, meta, shareCard }) => {
  return (
    <Centered>
      {meta.title && <Title>{meta.title}</Title>}
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
      </Head>
      <PostWrapper>
        <MDXRemote {...source} />
      </PostWrapper>
    </Centered>
  );
};

const PostWrapper = styled.article`
  padding: 32px 0;
`;

export default Post;
