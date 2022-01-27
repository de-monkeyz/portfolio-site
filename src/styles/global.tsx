import "normalize.css/normalize.css";
import {
  css,
  createGlobalStyle,
  FlattenSimpleInterpolation,
} from "styled-components";

const globalCss: FlattenSimpleInterpolation = css`
  :root {
    /* Text-size styles */
    /* base size: paragraph (14px) */
    --heading-1: 3.43rem;
    --heading-2: 2.57rem;
    --heading-3: 1.71rem;
    --heading-4: 1.29rem;
    --paragraph: 1rem;

    /* Effect styles */
    --light---animation--inner--shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.46);
    --dark---animation--inner--shadow: inset 0px 0px 5px #141313;

    /* Sizing */
    --size-content-width: 1112px;
    --size-footer: 64px;

    /* Layout */
    --layout-columns: 1fr 360px;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    font-weight: bold;
    margin: 0;
  }

  h1 {
    font-size: var(--heading-1);
  }

  h2 {
    font-size: var(--heading-2);
  }

  h3 {
    font-size: var(--heading-3);
  }

  h4 {
    font-size: var(--heading-4);
  }

  p {
    font-size: var(--paragraph);
  }

  body {
    background: var(--color-background);
    color: var(--color-foreground);
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Sarabun", sans-serif;
    font-size: 14px;
    line-height: 1.5;

    transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
  }

  * {
    box-sizing: border-box;
  }

  a,
  button {
    &:focus-visible {
      outline: 2px solid var(--color-secondary);
      outline-offset: 3px;
    }
  }
`;

const GlobalStyle = createGlobalStyle`${globalCss}`;
export { globalCss };
export default GlobalStyle;
