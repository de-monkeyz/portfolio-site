import { css, FlattenSimpleInterpolation } from "styled-components";

export const mobile = (styles: FlattenSimpleInterpolation | string) => css`
  @media (max-width: 1024px) {
    ${styles}
  }
`;

export const notMobile = (styles: FlattenSimpleInterpolation | string) => css`
  @media (min-width: 1025px) {
    ${styles}
  }
`;

// Re-export css for better syntax highlighting when using mixins
export { css };
