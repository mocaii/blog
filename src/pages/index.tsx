import Link from "next/link";
import data from "@/posts/data.json";

const navlist = ["JavaScript", "CSS", "HTML", "React", "Vue", "Webpack", "网络协议", "读书笔记"];
const articleList = [
  {
    title: "JavaScript",
    desc: "JavaScript 是一种解释型语言，是一种轻量级的编程语言，是一种动态类型语言，是一种弱类型语言，是一种基于原型的语言，是一种基于事件驱动的语言，是一种基于对象语言，是一种基于函数式编程",
  },
  {
    title: "CSS",
    desc: "CSS 是一种样式表语言，用于描述和定义文档的样式。CSS 描述了网页的样式，包括字体、颜色、布局、背景图片、边框、动画等等。",
  },
  {
    title: "HTML",
    desc: "HTML 是一种用于创建网页的标准标记语言。HTML 用于描述网页的内容，包括文本、图像、视频、音频等。",
  },
  {
    title: "React",
    desc: "React 是一个用于构建用户界面的 JavaScript 库。React 允许你使用一种声明式的方式来描述用户界面，然后 React 会根据这个描述来更新用户界面。",
  },
  {
    title: "Vue",
    desc: "Vue 是一个用于构建用户界面的 JavaScript 库。Vue 允许你使用一种声明式的方式来描述用户界面，然后 Vue 会根据这个描述来更新用户界面。",
  },
  {
    title: "Webpack",
    desc: "Webpack 是一个用于打包 JavaScript 文件的工具。Webpack 可以将多个 JavaScript 文件合并成一个文件，然后通过浏览器加载。",
  },
  {
    title: "网络协议",
    desc: "网络协议是网络通信的规范，是网络通信的基础。",
  },
];

export default function Home() {
  console.log(data);
  return (
    <main>
      <nav className="tags flex justify-start flex-wrap mb-20 gap-2">
        {navlist.map((item, index) => (
          <Link
            href={`/${item}`}
            key={item}
            className="bg-black dark:bg-white text-white dark:text-black block p-2 no-underline"
          >
            {item}
          </Link>
        ))}
      </nav>
      <section>
        {data.map((item, index) => (
          <div key={item.title} className="">
            <span className="border p-1 mr-2">{item.tag}</span>
            <Link
              href={`/${item.tag}/${item.fileName}`}
              className="text-gray-600 dark:text-gray-400"
            >
              {item.title}
            </Link>
          </div>
        ))}
      </section>
    </main>
  );
}
