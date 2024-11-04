import React from "react";
import styles from "./index.module.scss";
import Link from "next/link";
import { SortedPost } from "@/utils/post";

const PostList = ({ posts }: { posts: SortedPost[] }) => {
  return (
    <section className={styles.list}>
      {posts.map((item: SortedPost) => (
        <div key={item.name} className="before:content-['»'] before:ml-0.5 before:mr-5 mb-5">
          <Link href={`/${item.folder}`} className={styles.tag}>
            {item.folder}
          </Link>
          <Link href={`/${item.folder}/${item.name}`} className="">
            {item.name}
          </Link>
          <span className="text-xs text-gray-500 ml-7">{item.date}</span>
        </div>
      ))}
    </section>
  );
};

export default PostList;
