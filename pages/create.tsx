import Layout from "../components/Layout";
import { useForm } from "@mantine/form";
import { Button, Textarea, TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { remark } from "remark";
import html from "remark-html";
import { RenderMarkdown } from "../components/RenderMarkdown";
import { useEffect, useMemo, useState } from "react";
import Head from "next/head";

export default function CreateBlog() {
  const form = useForm({
    initialValues: {
      title: "",
      content: "",
    },
    validate: {
      title: (value) => (!value.length ? "*required" : null),
      content: (value) => (!value.length ? "*required" : null),
    },
  });

  const [debounced] = useDebouncedValue(form.values.content, 400);
  const [content, setContent] = useState("");

  useEffect(() => {
    remark()
      .use(html)
      .process(form.values.content)
      .then((vfile) => setContent(vfile.toString()));
  }, [form.values.content]);

  return (
    <Layout>
      <Head>
        <title>Create a Blog</title>
      </Head>
      <div className="px-20 py-10">
        <form
          className="grid grid-cols-1 gap-5"
          onSubmit={form.onSubmit((values) =>
            fetch("/api/blog/create", {
              method: "POST",
              body: JSON.stringify(values),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => res.json())
              .then(({ id }) => {
                alert("Blog Post has been created");
                window.location.href = `/blog/${id}`;
              })
          )}
        >
          <div className="bg-white shadow-lg p-5 rounded-md">
            <TextInput
              label="Blog Title"
              required
              withAsterisk
              {...form.getInputProps("title")}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <h1 className="text-xl font-bold">Blog Content</h1>
              <Textarea
                className="bg-white shadow-lg p-5 pb-0 rounded-md min-h-[350px]"
                withAsterisk
                required
                autosize
                minRows={3}
                {...form.getInputProps("content")}
              />
            </div>
            <div>
              <h1 className="text-xl font-bold">Preview</h1>
              <div className="bg-white shadow-lg p-5 rounded-md min-h-[350px]">
                <RenderMarkdown>{content}</RenderMarkdown>
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
