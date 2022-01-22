import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

import { createScriptTag, FallbackStyles } from "styles/theme/ssr";

type PropTypes = DocumentInitialProps & { prebodyScript: JSX.Element };
export default class MyDocument extends Document<PropTypes> {
  static async getInitialProps(ctx: DocumentContext): Promise<PropTypes> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    const script = await createScriptTag();

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="anonymous"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,400;0,700;1,400&amp;display=swap"
              rel="stylesheet"
            />
            <FallbackStyles />
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
        prebodyScript: script,
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          {this.props.prebodyScript}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
