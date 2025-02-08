---
title: Next.js开发遇到的问题
date: '2024-10-23T07:42:27.740Z'
lastModified: '2024-10-23T07:42:27.740Z'
---
# Next.js 开发遇到的问题

## 1. 报错`Can't resolve 'fs'`

在 Next.js 项目中遇到 "Module not found: Can't resolve 'fs'" 错误通常是因为 fs 模块是 Node.js 的内置模块，它在浏览器环境中不可用。因此，当你尝试在客户端代码中导入 fs 模块时，会出现这个错误。

解决方法：确保 fs 模块仅在服务器端代码中使用：你可以在 getStaticProps、getStaticPaths 或 getServerSideProps 函数中使用 fs 模块，因为这些函数只在服务器端执行。

```ts
import fs from "fs";

// ⛔️ CAN'T use fs here ⛔️

export const getServerSideProps = async () => {
  // ✅ Can use fs here (runs only on the server)
  console.log(fs);

  return {
    props: {}, // will be passed to the page component as props
  };
};
```
