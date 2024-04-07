import React from "react";
import { markdownToHtml } from "@/utils/markdown-to-html";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownRenderer from "@/components/MarkdownRenderer";

// export default function ArticleDetail() {
//   return <div>articleDetail</div>;
// }

// export async function getStaticProps({ name = "WebSocket" }: any) {
//   // 假设从文件系统读取Markdown文件
//   const markdownContent = await import(`@/contens/articles/${name}.md`);

//   // 转换Markdown为HTML
//   const contentHtml = markdownToHtml(markdownContent.default);

//   return {
//     props: {
//       contentHtml,
//     },
//   };
// }

export async function getStaticProps(context: any) {
  console.log(context, context.query, 999);
  const { query } = context;

  const name = "WebSocket";

  const markdownWithMeta = fs.readFileSync(
    path.join(process.cwd(), "src/contents/posts", `${name}.md`),
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
    <div className="mb-20 blog-post prose max-w-none prose-newspapermax-w-3xl mx-auto min-h-screen px-6 sm:px-8 my-6 tracking-tighter">
      <MarkdownRenderer markdown={markdownContent} />
    </div>
  );
}
