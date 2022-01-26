import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { ReadTimeResults } from "reading-time";

export interface MDXRelatedItem {
  id: string;
  type: string;
  slug: string;
  title: string;
  icon?: string;
  excerpt: string | null;
}
export interface MDXRawMeta extends MDXRelatedItem {
  shareTitle?: string;
  related?: string;
  readingTime?: ReadTimeResults;
  [key: string]: any;
}

export interface MDXRoute {
  data: MDXRelatedItem | null;
  params: {
    slug: Array<string>;
  };
}
export interface MDXMeta extends Omit<MDXRawMeta, "related"> {
  related: Array<MDXRelatedItem>;
}

export interface MDXResult {
  source: MDXRemoteSerializeResult | null;
  frontMatter: MDXMeta;
  pages?: Array<MDXRelatedItem>;
  [key: string]: any;
}

export interface MDXProps {
  source?: MDXRemoteSerializeResult;
  meta?: MDXMeta;
  error: boolean;
  pages?: Array<MDXRoute>;
}

export type MDXParseOptions = {
  loadRelated?: boolean;
  parseContent?: boolean;
};
