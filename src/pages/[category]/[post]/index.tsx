import React, { useEffect, useState } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Link from "next/link";

export async function getServerSideProps(context: any) {
  const { params } = context;
  const { category, post } = params;

  const markdownWithMeta = fs.readFileSync(
    path.join(process.cwd(), `src/posts/${category}/`, `${post}.md`),
    "utf-8"
  );

  const { content } = matter(markdownWithMeta);

  return {
    props: {
      markdownContent: content,
    },
  };
}

export function generateUniqueId(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return `heading-${Math.abs(hash).toString(36)}`;
}

export default function Post({ markdownContent }: any) {
  const [toc, setToc] = useState([]);

  useEffect(() => {
    const headers = markdownContent.match(/^##\s+.+$/gm);
    if (headers) {
      const toc = headers.map((header: string) => {
        const cleanHeader = header.replace(/^##\s+/, "");
        const id = generateUniqueId(cleanHeader);
        const text = cleanHeader;
        return { id, text };
      });
      setToc(toc);
    } else {
      setToc([]);
    }
  }, [markdownContent]);

  const [isNavOpen, setIsNavOpen] = useState(true);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 dark:bg-gray-900">
      <button
        onClick={toggleNav}
        className="fixed top-4 right-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md focus:outline-none"
        aria-label={isNavOpen ? "Close navigation" : "Open navigation"}
      >
        {isNavOpen ? (
          <span className="text-gray-800 dark:text-gray-200 text-sm">收起</span>
        ) : (
          <span className="text-gray-800 dark:text-gray-200 text-sm">展开</span>
        )}
      </button>

      <nav
        className={`
        fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg 
        transition-transform duration-300 ease-in-out overflow-y-auto
        ${isNavOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">目录</h2>
          <ul className="space-y-2">
            {toc.map((item: any) => (
              <li key={item.id}>
                <Link href={`#${item.id}`} className="text-sm hover:text-blue-500">
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <main className="flex-grow lg:w-3/4 p-3 lg:p-6">
        <article className="prose prose-lg max-w-none dark:prose-invert">
          <MarkdownRenderer markdown={markdownContent} />
        </article>
      </main>
    </div>
  );
}
