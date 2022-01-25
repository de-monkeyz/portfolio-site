import { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface MDXRawMeta {
  type: string;
  slug: string;
  title: string;
  shareTitle?: string;
  excerpt: string | null;
  related?: string;
  [key: string]: any;
}

export interface MDXRelatedItem
  extends Required<Pick<MDXMeta, "title" | "type" | "slug">> {}
export interface MDXMeta extends Omit<MDXRawMeta, "related"> {
  related: Array<MDXRelatedItem>;
}

export interface MDXResult {
  source: MDXRemoteSerializeResult | null;
  frontMatter: MDXMeta;
  pages?: Array<{
    slug: string;
    title: string;
  }>;
  [key: string]: any;
}

export interface MDXProps {
  source?: MDXRemoteSerializeResult;
  meta?: Object;
  error: boolean;
}

export type MDXParseOptions = {
  loadRelated?: boolean;
  parseContent?: boolean;
};
