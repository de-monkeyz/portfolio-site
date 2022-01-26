import { GetStaticProps } from "next";
import { generateImage } from "./generate";

export function createStaticProps(type: string, func?: GetStaticProps) {
  const getStaticProps: GetStaticProps = async (...args) => {
    const context = args[0];
    const passthrough = (await func?.(...args)) || ({} as any);
    return {
      ...passthrough,
      props: {
        ...(passthrough.props || {}),
        shareCard: await generateImage(
          `${type}/${context?.params?.slug ?? "index"}`
        ),
      },
    };
  };
  return getStaticProps;
}
