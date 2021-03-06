import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { ReadTimeResults } from "reading-time";

export interface MDXSummary {
  id: string;
  type: string;
  slug: string;
  title: string;
  icon?: string;
  publishedAt?: string;
  draft: boolean;
  excerpt: string | null;
}
export type MDXListItem = Partial<MDXSummary>;
export interface MDXRawMeta extends MDXSummary {
  shareTitle?: string;
  related?: string;
  readingTime?: ReadTimeResults;
  [key: string]: any;
}

export interface MDXRoute {
  data: MDXSummary | null;
  params: {
    slug: Array<string>;
  };
}
export interface MDXMeta extends Omit<MDXRawMeta, "related"> {
  related: Array<MDXSummary>;
}

export interface MDXResult {
  source: MDXRemoteSerializeResult | null;
  frontMatter: MDXMeta;
  pages?: Array<MDXSummary>;
  [key: string]: any;
}

export type MDXPagination = {
  total: number;
  current: number;
} | null;
export interface MDXPageList {
  pages: Partial<MDXSummary>[] | null;
  pagination: MDXPagination;
}
export interface MDXProps {
  source?: MDXRemoteSerializeResult;
  meta?: MDXMeta;
  error: boolean;
  pages?: Array<MDXSummary>;
  pagination?: MDXPagination;
}

export type MDXParseOptions = {
  loadRelated?: boolean;
  parseContent?: boolean;
};

export interface MDXStaticPathsOptions {
  filter?: (route: MDXRoute) => boolean;
}

export interface MDXListOptions {
  excludeIndex?: boolean;
  withMeta?: boolean;
  filter?: (item: MDXListItem) => boolean;
  sort?: (a: MDXListItem, b: MDXListItem) => number;
}
