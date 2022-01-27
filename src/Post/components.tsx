import { ComponentType } from "react";
import AlertBox from "./AlertBox";
import Gif from "./Gif";
import Picture from "./Picture";
import Link from "next/link";

const Components: { [key: string]: ComponentType<any> } = {
  Notice: (props) => <AlertBox {...props} color="notice" />,
  Success: (props) => <AlertBox {...props} color="success" />,
  Error: (props) => <AlertBox {...props} color="error" />,
  Warning: (props) => <AlertBox {...props} color="warning" />,
  Gif,
  Picture,
  a: ({ href, ...props }) => (
    <Link href={href}>
      <a {...props} />
    </Link>
  ),
};

export default Components;
