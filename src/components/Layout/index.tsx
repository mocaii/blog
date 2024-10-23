import React, { useEffect } from "react";
import type { Metadata } from "next";
import BackToTop from "./BackToTop";
import Header from "./Header";
import Head from "next/head";

export const metadata: Metadata = {
  title: "灵感漫游记",
  description: "资源收集，计划管理，学习笔记，个人博客",
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    let theme = localStorage.getItem("blog-theme");
    if (!theme) {
      theme = "light";
      localStorage.setItem("blog-theme", theme);
    }
    document.documentElement.classList.add(theme);
  }, []);
  return (
    <div className=" bg-white dark:bg-black">
      <Head>
        <title>mocai的博客</title>
        <meta name="description" content={"mocai的个人博"} />
        <link rel="icon" href="/favicon.png" />
        <link href="https://esm.sh/@wooorm/starry-night@3/style/both.css" rel="stylesheet" />
        {/* <link href="https://esm.sh/github-markdown-css@5/github-markdown.css" rel="stylesheet" /> */}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github.min.css"
          rel="stylesheet"
        />
        {/* 其他元数据 */}
      </Head>
      <main className="max-w-5xl mx-auto min-h-screen px-4 py-6 sm:px-8  tracking-tighter text-black dark:text-white">
        <Header />
        {children}
      </main>
      <BackToTop />
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
