import Link from "next/link";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="bg-gray-900 p-5 grid place-items-center text-white">
        <ul className="grid grid-cols-2 gap-x-5">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link
              className="py-2 px-4 bg-green-600 font-medium leading-4 rounded-lg text-white hover:bg-green-700"
              href="/create"
            >
              Create Blog
            </Link>
          </li>
        </ul>
      </nav>

      <main>{children}</main>
    </>
  );
}
