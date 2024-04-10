import data from "@/posts/data.json";
// "id": 5,
//     "tag": "Vue",
//     "fileName": "Vue3",
//     "title": "Vue3",
//     "description": ""
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

export const getTags = () => {
  const tags = data.map((item: PostProps) => item.tag);
  return Array.from(new Set(tags));
};
