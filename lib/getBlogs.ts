import prisma from "./prisma";

export async function getBlogs() {
  const blogs = await prisma.blog.findMany();

  return blogs.sort((a, b) => b.id - a.id);
}
