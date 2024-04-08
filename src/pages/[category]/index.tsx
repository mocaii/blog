import React, { useEffect, useState } from "react";
import { getPostListByTag } from "@/utils/tool";
import PostList from "@/components/PostList";

// import axios from "axios"; // 假设你使用axios获取API数据

export async function getServerSideProps(context: any) {
  const { params } = context;
  const { category } = params;

  return {
    props: {
      category: category,
    },
  };
}
interface CategoryPageProps {
  category: string;
}
const CategoryPage: React.FC<CategoryPageProps> = ({ category }) => {
  const data = getPostListByTag(category);

  return (
    <div className="category-page">
      <h1 className="font-bold text-left text-4xl md:text-5xl xtracking-tighter py-8 overflow-hidden">
        Posts tagged {`"${category}"`}
      </h1>
      <PostList data={data} />
    </div>
  );
};

export default CategoryPage;
