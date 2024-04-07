// components/MarkdownRenderer.js

import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "github-markdown-css/github-markdown.css";

function MarkdownRenderer({ markdown }: any) {
  return (
    <div className="markdown-body">
      <Markdown rehypePlugins={[rehypeHighlight]}>{markdown}</Markdown>
    </div>
  );
}

export default MarkdownRenderer;
