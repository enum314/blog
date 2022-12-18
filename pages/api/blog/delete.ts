// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "DELETE") {
    res.status(405).json({ message: "no" });

    return;
  }

  const data = req.body as { id: number };

  if (typeof data.id !== "number") {
    res.status(400).json({ message: "No" });

    return;
  }

  const { count } = await prisma.blog.deleteMany({ where: { id: data.id } });

  if (count > 0) {
    res.status(201).json({ message: "Deleted" });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
}
