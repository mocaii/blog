import React, { useEffect } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Head from "next/head";
import styles from "./index.module.scss";
import Link from "next/link";

export const metadata: Metadata = {
  title: "灵感漫游记",
  description: "资源收集，计划管理，学习笔记，个人博客",
};

const changeTheme = () => {
  let theme = localStorage.getItem("blog-theme");
  if (theme === "dark") {
    theme = "light";
    document.documentElement.classList.remove("dark");
  } else {
    theme = "dark";
    document.documentElement.classList.remove("light");
  }

  document.documentElement.classList.add(theme);
  localStorage.setItem("blog-theme", theme);
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
        <link href="https://esm.sh/github-markdown-css@5/github-markdown.css" rel="stylesheet" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github.min.css"
          rel="stylesheet"
        />
        {/* 其他元数据 */}
      </Head>

      <main className="max-w-3xl mx-auto min-h-screen px-4 sm:px-8  tracking-tighter text-black dark:text-white">
        <header className="flex justify-between py-5 items-center ">
          <nav className={styles.nav}>
            <ul className="flex items-center">
              <li>
                <Link href="/" className="flex items-center">
                  <Image
                    src={require("@/assets/images/favicon.png")}
                    width={25}
                    height={25}
                    alt="Picture of the author"
                    className="mr-2"
                  />
                  Home
                </Link>
              </li>
              <li className="mx-8">
                <a href="http://mocaii.cn/" target="_blank">
                  ·灵感漫游记
                </a>
              </li>
              <li>
                <a href="https://mocaii.github.io/" target="_blank">
                  ·旧博客
                </a>
              </li>
            </ul>
          </nav>

          <label className={styles.switch}>
            <input type="checkbox" id="switchToggle" onClick={() => changeTheme()} />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
        </header>
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
