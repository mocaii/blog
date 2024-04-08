import React from "react";
import styles from "./index.module.scss";
import Link from "next/link";

const PostList = ({ data }: { data: any[] }) => {
  return (
    <section className={styles.list}>
      {data.map((item) => (
        <div key={item.title} className="before:content-['»'] before:ml-0.5 before:mr-5 mb-5">
          <Link href={`/${item.tag}`} className={styles.tag}>
            {item.tag}
          </Link>
          <Link href={`/${item.tag}/${item.fileName}`} className="">
            {item.title}
          </Link>
        </div>
      ))}
    </section>
  );
};

export default PostList;
