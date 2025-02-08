---
title: CSS属性一行垂直居中
date: '2024-08-23T08:30:28.652Z'
lastModified: '2024-08-23T08:30:28.652Z'
---
# CSS 属性一行垂直居中

[原文：CSS finally adds vertical centering in 2024.](https://build-your-own.org/blog/20240813_css_vertical_center/)CSS 终于在 2024 年增加了 verticalcentering

`align-content` 在 2024 年的默认布局中工作，允许使用 1 个 CSS 属性进行垂直居中。

```html
<div style="align-content: center; height: 100px;"><code>align-content</code> just works!</div>
```

[浏览器兼容情况](https://caniuse.com/?search=align-content):
Chrome: 123 | Firefox: 125 | Safari: 17.4

## 新增功能

CSS 对齐目前的方案是切换到 `flexbox` 或 `grid`，因为 align-content 在默认布局（流）中不起作用。但 2024 年，浏览器已为流布局实施了 [align-content](https://web.dev/blog/align-content-block)。这有一些优点：

- 你不需要 flexbox 或 grid，只需要 1 个 CSS 属性来对齐。
- 因此，内容不需要包装在 div 中。

```html
<!-- Works ✅-->
<div style="display: grid; align-content: center;">Content.</div>

<!-- FAIL! ❌-->
<div style="display: grid; align-content: center;">Content with <em>multiple</em> nodes.</div>

<!-- Works with the content wrapper ✅-->
<div style="display: grid; align-content: center;">
  <div>
    <!-- The extra wrapper -->
    Content with <em>multiple</em> nodes.
  </div>
</div>

<!-- Works without the content wrapper ✅-->
<div style="align-content: center;">Content with <em>multiple</em> nodes.</div>
```

令人惊讶的是，经过几十年的进步，CSS 终于有一个属性来控制垂直对齐！

## 垂直居中的历史

浏览器很有趣，像对齐东西这样的基本需求在很长一段时间内都没有简单的答案。
以下是在浏览器中垂直居中的方法：

### 方法 1：表格单元格 table cell

合理性：★★★☆☆
有 4 种主要布局：flow（默认）、table、flexbox、grid。如何对齐内容取决于容器的布局。Flexbox 和 grid 的添加时间较晚，因此 table 是第一个选项。

```html
<div style="display: table;">
  <div style="display: table-cell; vertical-align: middle;">Content.</div>
</div>
```

一个表格可以纯粹从 CSS 中调用，但遗憾的是需要这样的间接性。

### 方法 2：绝对定位 absolute position

合理性: ☆☆☆☆☆
原因我不明白。人们不断发明更多间接的做事方式。

```html
<div style="position: relative;">
  <div style="position: absolute; top: 50%; transform: translateY(-50%);">Content.</div>
</div>
```

这个使用绝对定位来绕过布局，因为 flow 布局对我们没有帮助： 0. 使用 position: relative 标记引用容器。

1. 将内容的边缘放在中心位置 position: absolute; top: 50%
2. 转换 translateY(-50%) 将内容向上移动到容器的一半。

### 方法 3：内联内容 inline content

合理性: ☆☆☆☆☆
虽然 flow 流布局对内容对齐没有帮助。它允许在一条线内进行垂直对齐。那么为什么不做一条和容器一样高的线呢？

```html
<div class="container">
  ::before
  <div class="content">Content.</div>
</div>
```

```css
.container::before {
  content: "";
  height: 100%;
  display: inline-block;
  vertical-align: middle;
}
.content {
  display: inline-block;
  vertical-align: middle;
}
```

这有一些缺陷：除了牺牲一个伪元素之外，开头还有一个零宽度的 [strut](https://christopheraue.net/design/vertical-align#:~:text=strut) 字符，这可能会把事情搞得一团糟。

### 方法 4：单行 flexbox

合理性: ★★★☆☆
在 Web 起飞 20 年后，Flexbox 变得广泛可用。它有 2 种模式：单行和多行。在 single-line 模式（默认）中，行填充垂直空间，`align-items` 对齐行内的内容。

```html
<div style="display: flex; align-items: center;">
  <div>Content.</div>
</div>
```

或者，将行设置为列，并将项目与`justify-content` 对齐。

```html
<div style="display: flex; flex-flow: column; justify-content: center;">
  <div>Content.</div>
</div>
```

### 方法 5：多行 flexbox

c ★★★☆☆
在多行 flexbox 中，行不再填充垂直空间，因此行（其中只有 1 个项目）可以与 `align-content` 对齐。

```html
<div style="display: flex; flex-flow: row wrap; align-content: center;">
  <div>Content.</div>
</div>
```

### 方法 6：网格内容 grid content

合理性: ★★★★☆

Grid 甚至更晚。对齐变得更加简单。

```html
<div style="display: grid; align-content: center;">
  <div>Content.</div>
</div>
```

### 方法 7：网格单元格 grid cell

合理性: ★★★★☆

请注意与前一个的细微差别：

- `align-content` 使单元格与容器居中。
- `align-items` 将内容居中到单元格，同时单元格会拉伸以适应容器。

```html
<div style="display: grid; align-items: center;">
  <div>Content.</div>
</div>
```

似乎有很多方法可以做同样的事情。

### 方法 8：auto-margin

合理性: ★★★☆☆

在流布局中，margin:auto 水平居中，但不垂直居中。Flexbox 和 grid 并不共享这种荒谬之处。

```html
<div style="display: grid;">
  <div style="margin-block: auto;">Content.</div>
</div>
```

尽管如此，我还是很困惑为什么 margin 也被设计为控制对齐。

### 方法九：2024 css align-content

Sanity: ★★★★★ 理智：★★★★★

为什么浏览器一开始没有添加它呢？

```html
<div style="align-content: center;"><code>align-content</code> just works!</div>
```

方法 1 中的表格单元格与此方法一样，也不需要内容包装器（尽管它需要 atable 包装器）。我们回到了原点！

### 总结

所有垂直居中方法都在 [codepen](https://codepen.io/byo-books/pen/Porpmab?editors=1000) 中演示。（更多内容请看原文）
