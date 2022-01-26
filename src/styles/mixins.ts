import { css, FlattenSimpleInterpolation } from "styled-components";

export const mobile = (styles: FlattenSimpleInterpolation | string) => css`
  @media (max-width: 1024px) {
    ${styles}
  }
`;

export const notMobile = (styles: FlattenSimpleInterpolation | string) => css`
  @media not (max-width: 1024px) {
    ${styles}
  }
`;

export const transitionTheme = () =>
  css`
    transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
  `;

// Re-export css for better syntax highlighting when using mixins
export { css };
