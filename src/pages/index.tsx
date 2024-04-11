import Link from "next/link";
import data from "@/posts/data.json";
import Image from "next/image";
import styles from "./index.module.scss";
import PostList from "@/components/PostList";
import { getTags } from "@/utils/tool";

const navlist = getTags();

export default function Home() {
  return (
    <main className={styles.home}>
      <div className="flex pb-5 mb-5 border-b">
        <Image
          src={require("@/assets/images/cat.png")}
          width={100}
          height={100}
          alt="Picture of the author"
          className=""
        />
        <h1 className="ml-5 w-full  font-bold text-left text-4xl md:text-5xl tracking-tighter py-6 overflow-hidden">
          {`Hi, I'm mocai`}
        </h1>
      </div>
      <nav className="tags flex justify-start flex-wrap mb-20 gap-1">
        {navlist.map((item, index) => (
          <Link
            href={`/${item}`}
            key={item}
            className="bg-black dark:bg-white text-white dark:text-black block p-2 no-underline text-sm"
          >
            {item}
          </Link>
        ))}
      </nav>
      <PostList data={data} />
    </main>
  );
}
