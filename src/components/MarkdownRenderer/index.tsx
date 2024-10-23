// components/MarkdownRenderer.js

import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "github-markdown-css/github-markdown.css";
import { useRouter } from "next/router";
import { generateUniqueId } from "@/pages/[category]/[post]";

function MarkdownRenderer({ markdown }: any) {
  return (
    <div className="markdown-body p-5">
      <Markdown
        rehypePlugins={[rehypeHighlight]}
        remarkPlugins={[remarkGfm]}
        components={{
          h2(props: any) {
            const text = props.children?.toString() || "";
            const id = generateUniqueId(text);
            return <h2 id={id}>{text}</h2>;
          },
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
}

export default MarkdownRenderer;
