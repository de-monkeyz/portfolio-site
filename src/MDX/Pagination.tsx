import Centered from "Layout/Centered";
import { MDXPagination } from "MDX/types";
import Link from "next/link";
import React from "react";
import styled, { css } from "styled-components";

export interface PaginationProps {
  pagination?: MDXPagination;
  base: string;
}

const Pagination: React.FC<PaginationProps> = ({ pagination, base }) => {
  if (!pagination) {
    return null;
  }

  const { current, total } = pagination;

  const min = Math.max(1, current - 3);
  const max = Math.min(total, current + 3);

  let pages: number[] = [];
  for (let i = min; i <= max; i++) {
    pages.push(i);
  }

  return (
    <PaginationWrapper>
      <Layout>
        <Link href={`/${base}/page/1`} passHref={true}>
          <Item $disabled={current === 1} aria-disabled={current === 1}>
            First
          </Item>
        </Link>
        {pages.map((page) => (
          <Link href={`/${base}/page/${page}`} passHref={true} key={page}>
            <Item aria-disabled={page === current} $current={page === current}>
              {page}
            </Item>
          </Link>
        ))}
        <Link href={`/${base}/page/${total}`} passHref={true}>
          <Item $disabled={current === total} aria-disabled={current === total}>
            Last
          </Item>
        </Link>
      </Layout>
    </PaginationWrapper>
  );
};

const Item = styled.a<{ $disabled?: boolean; $current?: boolean }>`
  display: block;
  padding: 8px;
  background: none;
  border: 1px solid var(--color-secondary);
  color: var(--color-secondary);
  text-decoration: none;
  border-radius: 3px;
  width: 38px;
  text-align: center;

  &:first-child {
    margin-right: auto;
  }

  &:last-child {
    margin-left: auto;
  }

  &:first-child,
  &:last-child {
    width: 80px;
  }

  ${(props) =>
    props.$disabled &&
    css`
      visibility: hidden;
      pointer-events: none;
    `}

  ${(props) =>
    props.$current &&
    css`
      border: none;
      color: var(--color-foreground);
    `}
`;
const Layout = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
const PaginationWrapper = styled(Centered)`
  margin-top: auto;
  padding-bottom: 32px;
  padding-top: 32px;
`;

export default Pagination;
