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

export const transitionTheme = (
  properties: Array<string> = ["color", "background-color"]
) =>
  css`
    transition: ${properties
      .map((prop) => `${prop} 0.2s ease-in-out`)
      .join(", ")};
  `;

// Re-export css for better syntax highlighting when using mixins
export { css };
