import "normalize.css/normalize.css";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    /* Text-size styles */
    /* base size: paragraph (14px) */
    --heading-1: 3.43rem;
    --heading-2: 2.57rem;
    --heading-3: 1.71rem;
    --heading-4: 1.29rem;
    --paragraph: 1rem;

    /* Effect styles */
    --light---low--shadow:  -0.20000000298023224px 0.699999988079071px 0.800000011920929px rgba(168, 168, 168, 0.32), -0.4000000059604645px 1.100000023841858px 1.2999999523162842px rgba(168, 168, 168, 0.31), -0.800000011920929px 2.5999999046325684px 3px rgba(168, 168, 168, 0.3);
    --light---animation--inner--shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.46);
    --dark---low--shadow:  -0.20000000298023224px 0.699999988079071px 0.800000011920929px rgba(43, 43, 43, 0.32), -0.4000000059604645px 1.100000023841858px 1.2999999523162842px rgba(43, 43, 43, 0.31), -0.800000011920929px 2.5999999046325684px 3px rgba(43, 43, 43, 0.3);
    --dark---animation--inner--shadow: inset 0px 0px 5px rgba(0, 0, 0, 1);

    h1, h2, h3, h4, h5 {
      font-weight: bold;
      margin: 0;
    }

    h1 {
      font-size: var(--heading-1);
      text-align: center;
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
      font-family: 'Sarabun', sans-serif;
      font-size: 14px;
      line-height: 1.5;
    }

    * {
      box-sizing: border-box;
    }
  }
`;

export default GlobalStyle;
