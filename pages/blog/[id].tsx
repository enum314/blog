import { GetServerSideProps } from "next";
import Head from "next/head";
import Layout from "../../components/Layout";
import { RenderMarkdown } from "../../components/RenderMarkdown";
import { getBlog } from "../../lib/getBlog";

export const getServerSideProps: GetServerSideProps<
  {},
  { id: string }
> = async ({ params }) => {
  if (!params) return { notFound: true };

  const blog = await getBlog(Number(params.id));

  if (!blog)
    return {
      notFound: true,
    };

  return { props: blog };
};

export default function BlogPost({
  id,
  title,
  content,
}: {
  id: string;
  title: string;
  content: string;
}) {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>

      <div className="px-20 m-5 grid grid-cols-1 gap-10">
        <div className="bg-white p-20 rounded-lg">
          <RenderMarkdown>{content}</RenderMarkdown>
        </div>
        <div className="bg-white rounded-lg p-5 grid place-items-center mb-10">
          <button
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 rounded-lg text-white"
            onClick={() =>
              fetch("/api/blog/delete", {
                method: "DELETE",
                body: JSON.stringify({ id }),
                headers: {
                  "Content-Type": "application/json",
                },
              }).then(() => {
                alert("Blog Post has been deleted.");
                window.location.href = "/";
              })
            }
          >
            Delete
          </button>
        </div>
      </div>
    </Layout>
  );
}
