import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { RenderMarkdown } from "../components/RenderMarkdown";
import { getBlogs } from "../lib/getBlogs";
import { remark } from "remark";
import html from "remark-html";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async () => {
  const blogs = await getBlogs();

  return { props: { blogs } };
};

function BlogCard({
  id,
  title,
  content,
}: {
  id: string;
  title: string;
  content: string;
}) {
  const [marked, setMarked] = useState("");

  useEffect(() => {
    remark()
      .use(html)
      .process(content)
      .then((vfile) => setMarked(vfile.toString()));
  }, [content]);

  return (
    <article className="bg-white rounded-lg shadow-lg p-5">
      <h2 className="text-2xl font-bold border-transparent border-b-gray-400 border-2">
        {title}
      </h2>
      <div className="grid place-items-end">
        <div className="grid grid-cols-2 gap-x-5 p-2">
          <Link
            href={`/blog/${id}`}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white"
          >
            View
          </Link>
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
                window.location.reload();
              })
            }
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Home({
  blogs,
}: {
  blogs: { id: string; title: string; content: string }[];
}) {
  return (
    <Layout>
      <Head>
        <title>Blog Website</title>
      </Head>
      <section className="px-20 py-10">
        <h2 className="text-3xl font-bold mb-1 px-3 py-4 bg-white rounded-lg shadow-lg">
          Blog Posts
        </h2>
        <div className="grid mt-10 gap-5 grid-cols-1 md:grid-cols-2">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
