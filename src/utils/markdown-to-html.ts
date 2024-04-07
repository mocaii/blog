// 创建一个markdown-to-html.js工具模块
import markdownit from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";

const md = markdownit({
  html: true,
}).use(markdownItAnchor, {
  /* options */
});

export function markdownToHtml(markdownText: any) {
  return md.render(markdownText);
}
