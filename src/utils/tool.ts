import data from "@/posts/data.json";
import { getPostTags, Post } from "./post";

export interface PostProps {
  tag: string;
  fileName: string;
  title: string;
  description: string;
}

export const getPostListByTag = (tag: string) => {
  const list = data.filter((item: PostProps) => item.tag === tag);
  return list;
};
