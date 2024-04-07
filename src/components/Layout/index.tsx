import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

export const metadata: Metadata = {
  title: "灵感漫游记",
  description: "资源收集，计划管理，学习笔记，个人博客",
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Head>
        <title>灵感漫游记</title>
        <meta name="description" content={"资源收集，计划管理，学习笔记，个人博"} />
        <link rel="icon" href="/favicon.png" />
        <link href="https://esm.sh/@wooorm/starry-night@3/style/both.css" rel="stylesheet" />
        <link href="https://esm.sh/github-markdown-css@5/github-markdown.css" rel="stylesheet" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github.min.css"
          rel="stylesheet"
        />
        {/* 其他元数据 */}
      </Head>
      <main className="max-w-3xl mx-auto min-h-screen px-6 sm:px-8 my-6 tracking-tighter">
        <header className="flex mb-10">
          <Link href="/">
            <Image
              src={require("@/assets/images/cat.png")}
              width={100}
              height={100}
              alt="Picture of the author"
              className=""
            />
          </Link>

          <h1 className="ml-5 font-bold text-left text-4xl md:text-5xl tracking-tighter py-6 overflow-hidden">
            Hi, I'm mocai
          </h1>
        </header>
        {children}
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
