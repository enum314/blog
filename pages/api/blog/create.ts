// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

type Data = {
  id: number;
  title: string;
  content: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(405).json({ id: -1, title: "", content: "" });

    return;
  }

  const data = req.body as Omit<Data, "id">;

  if (
    typeof data.title !== "string" ||
    typeof data.content !== "string" ||
    !data.title.length ||
    !data.content.length
  ) {
    res.status(400).json({ id: -1, ...data });

    return;
  }

  const blog = await prisma.blog.create({ data });

  res.status(201).json(blog);
}
