import React, { ReactNode } from "react";
import styled, { css } from "styled-components";

import Head from "next/head";
import Title from "meta/Title";
import Centered from "Layout/Centered";

import { MDXRemoteSerializeResult, MDXRemote } from "next-mdx-remote";
import { MDXRelatedItem, MDXMeta, MDXRoute } from "MDX/types";
import Related from "./Related";
import Listing from "./Listing";
import Gif from "./Gif";

export interface PostProps {
  source: MDXRemoteSerializeResult;
  shareCard: string | null;
  meta: MDXMeta & {
    description?: string;
    image?: string;
    publishedAt: string;
    updatedAt?: string;
    related: Array<MDXRelatedItem>;
  };
  pages?: Array<MDXRoute>;
}

const COMPONENTS: { [key: string]: ReactNode } = {
  Gif: Gif,
};

const Post: React.FC<PostProps> = ({ source, meta, shareCard, pages }) => {
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
        <MDXRemote {...source} components={COMPONENTS} />
      </PostWrapper>
      {!!meta.related.length && (
        <>
          <h4>Related</h4>
          <RelatedItems>
            {meta.related.map((item) => (
              <Related key={item.id} item={item} />
            ))}
          </RelatedItems>
        </>
      )}
      {!!pages?.length && (
        <>
          <h4>All {meta.noun ?? "pages"}</h4>
          <RelatedItems $layout="horizontal">
            {pages.map(
              (item) =>
                !!item.data && <Listing key={item.data.id} item={item.data} />
            )}
          </RelatedItems>
        </>
      )}
    </Centered>
  );
};

const RelatedItems = styled.aside<{ $layout?: "horizontal" | "vertical" }>`
  padding-top: 32px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding-bottom: 32px;
  justify-content: start;
  display: grid;

  ${(props) =>
    props.$layout === "horizontal" &&
    css`
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    `}

  @media(max-width: 500px) {
    grid-template-columns: 1fr !important;
  }
`;
const PostWrapper = styled.article`
  padding: 32px 0;

  h1 {
    position: relative;
  }
`;

export default Post;
