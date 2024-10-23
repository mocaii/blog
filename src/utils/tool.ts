// import data from "@/posts/data.json";
import { getPostTags, Post } from "./post";

export interface PostProps {
  tag: string;
  fileName: string;
  title: string;
  description: string;
}
