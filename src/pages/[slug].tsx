import { GetStaticProps, GetStaticPaths } from "next";
import Markdown from "react-markdown";

import { getPageBySlug, getAllPages } from "../lib/queries";

import Layout from "../components/layout";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const { page } = await getPageBySlug(slug);

  return {
    props: {
      page,
    },
    revalidate: 5,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { pages } = await getAllPages();

  const paths = pages.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export const PageTemplate = ({ page }) => {
  return (
    <Layout {...page}>
      <div className="max-w-5xl mx-auto prose md:prose-lg py-6 md:py-12 lg:py-24">
        <Markdown children={page.content?.markdown} />
      </div>
    </Layout>
  );
};

export default PageTemplate;
