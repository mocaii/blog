// components/MarkdownRenderer.js

import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "github-markdown-css/github-markdown.css";
import { useRouter } from "next/router";

const ImageRenderer = ({ src, alt }: any) => {
  const router = useRouter();
  window.location.hostname;
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000" // 开发环境下的基础路径
      : window.location.origin; // 生产环境下的基础路径

  return <img src={`${baseUrl}/${src}`} alt={alt} />;
};

function MarkdownRenderer({ markdown }: any) {
  return (
    <div className="markdown-body">
      <Markdown
        rehypePlugins={[rehypeHighlight]}
        components={{
          img: ImageRenderer,
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
}

export default MarkdownRenderer;
