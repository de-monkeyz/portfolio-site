import { css } from "styled-components";

export const mobile = (styles: string) => css`
  @media (max-width: 1024px) {
    ${styles}
  }
`;

// Re-export css for better syntax highlighting when using mixins
export { css };
