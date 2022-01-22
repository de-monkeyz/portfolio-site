import GlobalStyle from "styles/global";
import type { AppProps } from "next/app";

import { ThemeProvider } from "styles/theme/Context";

import Columns from "Layout/Columns";
import Sidebar from "Sidebar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Columns columns="1fr 360px">
        <main>
          <Component {...pageProps} />
        </main>
        <Sidebar />
      </Columns>
    </ThemeProvider>
  );
}

export default MyApp;
