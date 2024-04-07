// pages/blog/[category].js
import React, { useEffect, useState } from "react";
// import axios from "axios"; // 假设你使用axios获取API数据

interface BlogPost {
  title: string;
  author: string;
  date: string;
  summary: string;
  // 更多你的博客对象属性...
}

interface CategoryPageProps {
  category: string;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function fetchCategoryPosts() {
      // const response = await axios.get(`/api/get-posts-by-category/${category}`);

      // 替换上述API路径为你实际获取博客分类数据的接口地址
      setPosts([]);
    }

    fetchCategoryPosts();
  }, [category]);

  return (
    <div className="category-page">
      <h1>类别: {category}</h1>
      {/* <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>
              {post.author} - {post.date}
            </p>
            <p>{post.summary}</p>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default CategoryPage;

// // 获取动态路由参数
// export async function getStaticPaths() {
//   // 如果你的所有分类都是已知且固定的，可以在这里列举它们
//   // 否则，你需要从后端API或其他来源获取所有分类
//   const categoriesResponse = await axios.get("/api/categories");
//   const categories = categoriesResponse.data.categories;

//   const paths = categories.map((category) => ({
//     params: { category },
//   }));

//   return {
//     paths,
//     fallback: "blocking", // 或者 'false' 表示不支持未列出的页面
//   };
// }

// // 获取单个分类页的静态数据
// export async function getStaticProps(context) {
//   const { params } = context;
//   const category = params.category as string;

//   // 这里可以调用API获取指定分类的元数据（例如标题、描述等）
//   // 并将其作为props传递给组件
//   const metadataResponse = await axios.get(`/api/get-metadata-for-category/${category}`);

//   const metadata = metadataResponse.data;

//   return {
//     props: {
//       category,
//       metadata,
//     },
//   };
// }
