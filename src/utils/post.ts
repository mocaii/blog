import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 定义接口
export interface Post {
  folder: string;
  files: File[];
}
export interface File {
  name: string;
  lastModified: Date;
}

export interface SortedPost {
  folder: string;
  name: string;
  date: string;
  lastModified: Date;
}

//第一步：获取posts目录下所有文件夹名
//第二步：获取每个文件夹下的所有md文件名及其最后修改时间
// 第三步：输出一个md文件列表数组，每一项包含字段folder,name,lastModified时间，并以lastModified排序
export const getPostTags = (): Post[] => {
  const postsDir = path.join(process.cwd(), "src", "posts");
  const folders = fs.readdirSync(postsDir);

  const posts = folders
    .map((folder) => {
      const folderPath = path.join(postsDir, folder);
      const stats = fs.statSync(folderPath);

      if (stats.isDirectory()) {
        const files = fs
          .readdirSync(folderPath)
          .filter((file) => path.extname(file).toLowerCase() === ".md")
          .map((file) => {
            //去除.md后缀
            const name = file.replace(".md", "");
            const filePath = path.join(folderPath, file);
            const fileStats = fs.statSync(filePath);
            return {
              name: name,
              lastModified: fileStats.mtime,
            };
          });

        return {
          folder: folder,
          files: files,
        };
      }
      return null;
    })
    .filter((post): post is Post => post !== null);

  return posts;
};

//写一个方法将posts里的md文件按最后修改时间输出为一个数组，每个对象包含folder，name,lastModified字段
export const getSortedPosts = () => {
  const posts = getPostTags();
  //将posts数组展平，每个文件夹下的md文件都输出为一个对象
  const flattenedPosts = posts.flatMap((post) =>
    post.files.map((file) => ({
      folder: post.folder,
      name: file.name,
      date: formatLastModified(file.lastModified),
      lastModified: file.lastModified.toISOString(), // 将 Date 转换为 ISO 字符串
    }))
  );

  return flattenedPosts.sort(
    (a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
  );
};

export const getTags = () => {
  const postTags = getPostTags();
  const tags = postTags.map((item: Post) => item.folder);
  return Array.from(new Set(tags));
};

//格式化lastModified为YYYY-MM-DD HH:mm
export const formatLastModified = (lastModified: Date) => {
  return lastModified.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getPostListByTag = (tag: string) => {
  const posts = getSortedPosts();
  const list = posts.filter((item) => item.folder === tag);
  return list;
};
