import { remark } from "remark";
import html from "remark-html";
import prisma from "./prisma";

export async function getBlog(id: number) {
  if (typeof id !== "number") return undefined;

  const blog = await prisma.blog.findUnique({ where: { id } });

  if (!blog) return undefined;

  const vfile = await remark().use(html).process(blog.content);
  const processed = vfile.toString();

  return {
    id,
    title: blog.title,
    content: processed,
  };
}
