// components/MarkdownRenderer.js

import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
// import "github-markdown-css/github-markdown.css";
import { useRouter } from "next/router";

function MarkdownRenderer({ markdown }: any) {
  return (
    <div className="markdown-body p-5">
      <Markdown rehypePlugins={[rehypeHighlight]}>{markdown}</Markdown>
    </div>
  );
}

export default MarkdownRenderer;
