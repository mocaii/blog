import React, { useEffect, useState } from "react";
import { getPostListByTag } from "@/utils/post";
import PostList from "@/components/PostList";

// import axios from "axios"; // 假设你使用axios获取API数据

export async function getServerSideProps(context: any) {
  const { params } = context;
  const { category } = params;
  const data = getPostListByTag(category);

  return {
    props: {
      category: category,
      data,
    },
  };
}
interface CategoryPageProps {
  category: string;
}
const CategoryPage: React.FC<CategoryPageProps> = ({ category, data }: any) => {
  return (
    <div className="category-page">
      <h1 className="font-bold text-left text-4xl md:text-5xl xtracking-tighter py-8 overflow-hidden">
        Posts tagged {`"${category}"`}
      </h1>
      <PostList posts={data} />
    </div>
  );
};

export default CategoryPage;
