import GlobalStyle from "styles/global";

import { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

import styled from "styled-components";
import { mobile, notMobile, css } from "styles/mixins";
import { ThemeProvider } from "styles/theme/Context";
import { MotionConfig } from "framer-motion";

import Head from "next/head";

import Columns from "Layout/Columns";
import ThemeToggle from "UI/ThemeToggle";
import Sidebar from "Sidebar";
import Footer from "Footer";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const layout = Component.getLayout?.(<Component {...pageProps} />);
  if (layout) {
    return (
      <ThemeProvider>
        <GlobalStyle />
        {layout}
      </ThemeProvider>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <Head>
          <meta
            property="og:image"
            content="https://blurton.me/share-card.png"
            key="image"
          />
          <meta property="og:image:width" content="1200" key="imageWidth" />
          <meta property="og:image:height" content="630" key="imageHeight" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png "
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png "
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png "
          />
          <link rel="manifest" href="/site.webmanifest " />
          <link
            rel="mask-icon"
            href="/safari-pinned-tab.svg"
            color="#5bbad5 "
          />
          <meta name="msapplication-TileColor" content="#da532c " />
          <meta name="theme-color" content="#ffffff " />
          <meta
            name="viewport"
            content="initial-scale=1, maximum-scale=1, minimum-scale=1"
          />
        </Head>
        <GlobalStyle />
        <ThemeToggle />
        <App columns="var(--layout-columns)">
          <main>
            <Component {...pageProps} />
          </main>
          <Sidebar />
          <Footer />
        </App>
      </ThemeProvider>
    </MotionConfig>
  );
}

const App = styled(Columns)`
  ${mobile(`--layout-columns: 1fr !important;`)}
  align-items: start;

  ${notMobile(css`
    main {
      grid-row: 1 / -1;
    }
  `)}
`;

export default MyApp;
