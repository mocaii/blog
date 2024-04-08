import React from "react";
import { markdownToHtml } from "@/utils/markdown-to-html";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownRenderer from "@/components/MarkdownRenderer";

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

export default function Post({ markdownContent }: any) {
  return (
    <div className=" blog-post prose max-w-none prose-newspapermax-w-3xl mx-auto min-h-screen my-6 tracking-tighter bg-white dark:bg-black">
      <MarkdownRenderer markdown={markdownContent} />
    </div>
  );
}
