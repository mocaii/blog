const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const postsDirectory = path.join(process.cwd(), "src", "posts");

function updateFrontmatter() {
  // 遍历所有文件夹
  const folders = fs.readdirSync(postsDirectory);

  folders.forEach((folder) => {
    const folderPath = path.join(postsDirectory, folder);
    if (!fs.statSync(folderPath).isDirectory()) return;

    // 遍历文件夹中的所有 md 文件
    const files = fs.readdirSync(folderPath).filter((file) => file.endsWith(".md"));

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data: existingFrontmatter, content } = matter(fileContent);

      // 获取文件信息
      const stats = fs.statSync(filePath);
      const fileName = file.replace(".md", "");

      // 准备新的 frontmatter
      const newFrontmatter = {
        title: existingFrontmatter.title || formatTitle(fileName),
        date: existingFrontmatter.date || stats.mtime.toISOString(),
        lastModified: stats.mtime.toISOString(),
        ...existingFrontmatter, // 保留其他已存在的 frontmatter 数据
      };

      // 创建新的文件内容
      const newContent = matter.stringify(content.trim(), newFrontmatter);

      // 写入文件
      try {
        fs.writeFileSync(filePath, newContent);
        console.log(`✅ Updated frontmatter for ${folder}/${file}`);
      } catch (error) {
        console.error(`❌ Error updating ${folder}/${file}:`, error);
      }
    });
  });
}

// 将文件名转换为标题
function formatTitle(fileName) {
  // 移除日期前缀（如果存在）
  const withoutDate = fileName.replace(/^\d{4}-\d{2}-\d{2}-/, "");
  // 将连字符替换为空格，并将每个单词首字母大写
  return withoutDate
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// 运行脚本
updateFrontmatter();
