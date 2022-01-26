import { loadAndParse } from "MDX/parse";
import { MDXResult } from "MDX/types";
import { GetServerSideProps, NextPage, GetServerSidePropsResult } from "next";
import { ReactElement, ReactNode } from "react";
import styled from "styled-components";

import Card from "ShareCard/Card";
import { checkForThumbnail } from "ShareCard/generate";

export interface ShareCardProps {}

const ShareCard: NextPage<ServerProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
} = ({ page, thumbnail }) => {
  return (
    <Viewer>
      <Card page={page} thumbnail={thumbnail} />
    </Viewer>
  );
};

const Viewer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  & > * {
    outline: 1px solid white;
  }
`;

ShareCard.getLayout = (page) => <>{page}</>;

interface ServerProps {
  page: MDXResult;
  thumbnail: boolean;
}
type ServerPropsResult = GetServerSidePropsResult<ServerProps>;
const NOT_FOUND: ServerPropsResult = {
  // returns the default 404 page with a status code of 404 in production
  notFound: true,
};
export const getServerSideProps: GetServerSideProps<ServerProps> = async ({
  query: { page },
}) => {
  try {
    if (process.env.NODE_ENV === "production" || !page || Array.isArray(page)) {
      return NOT_FOUND;
    }
    const data = await loadAndParse(page);
    if (!data) {
      throw new Error("Page not found");
    }

    return {
      props: {
        page: data,
        thumbnail: await checkForThumbnail(page),
      },
    } as ServerPropsResult;
  } catch (e) {
    console.error(e);
    return NOT_FOUND;
  }
};

export default ShareCard;
