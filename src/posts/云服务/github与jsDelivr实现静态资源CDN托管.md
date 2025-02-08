---
title: Github与jsDelivr实现静态资源CDN托管
date: '2024-09-01T11:41:12.448Z'
lastModified: '2024-09-01T11:41:12.448Z'
---
# github 与 jsDelivr 实现静态资源 CDN 托管

## 操作步骤

### 1.上传图片到 GitHub

首先，您需要将您的图片上传到一个 GitHub 仓库中。GitHub 可以作为您静态资源的存储库。

### 2.使用 jsDelivr 链接

上传图片后，您就可以使用 jsDelivr 提供的特定格式的 URL 来引用这些图片。例如，如果您的 GitHub 用户名是 username，仓库名是 repo，那么图片的 jsDelivr 链接格式如下：

```html
https://cdn.jsdelivr.net/gh/username/repo@branch/folder/image.jpg
```

其中 @branch 可以是具体的分支名（如 master），也可以是标签（如版本号），或者省略以使用最新提交。

### 3.在项目中引用

在您的网页或应用中，将图片的 src 属性设置为上述 jsDelivr 提供的链接，这样用户在访问您的网站时，图片就会通过 CDN 加速加载。

例如，如果您有一个名为 example.jpg 的图片文件，存放在 GitHub 仓库的 images 文件夹中，您的 jsDelivr 链接可能如下所示：

```html
<img src="https://cdn.jsdelivr.net/gh/username/repo@master/images/example.jpg" alt="Description" />
```

请注意，jsDelivr 对于 GitHub 仓库的文件大小有限制，单个文件不应超过 50MB。此外，由于 jsDelivr 是一个免费的服务，它可能不适合所有类型的项目，特别是那些需要大量带宽或高级功能的项目。

使用 jsDelivr 可以有效地减少服务器的负载，提高资源的加载速度，并且它是完全免费的。不过，如果您的项目对 CDN 服务有更特定的需求，例如需要更多的带宽、更高级的缓存策略或安全功能，您可能需要考虑使用付费的 CDN 服务。

## jsDelivr 服务

JSDelivr 是由 @Cloudflare 提供的免费开源公共 CDN。默认提供的节点是：`cdn.jsdelivr.net`。该节点国内几乎不可用，需要使用可用性高的节点作为替代。

### 1.可用的 jsDelivr 节点

| 节点                      | 描述            | 可用性     |
| ------------------------- | --------------- | ---------- |
| gcore.jsdelivr.net        | Gcore 节点      | 可用性高   |
| testingcf.jsdelivr.net    | Cloudflare 节点 | 可用性高   |
| quantil.jsdelivr.net      | Quantil 节点    | 可用性一般 |
| fastly.jsdelivr.net       | Fastly 节点     | 可用性一般 |
| originfastly.jsdelivr.net | Fastly 节点     | 可用性低   |
| test1.jsdelivr.net        | Cloudflare 节点 | 可用性低   |
| cdn.jsdelivr.net          | 通用节点        | 可用性低   |

### 2.第三方提供的 jsDelivr 节点

| 节点               | 来源     | 特点 |
| ------------------ | -------- | ---- |
| jsd.cdn.zzko.cn    | 国内 CDN |      |
| jsd.onmicrosoft.cn | 国内 CDN |      |
| jsdelivr.b-cdn.net | 台湾 CDN |      |
| cdn.jsdelivr.us    | Anycast  |      |

### 3.npm 节点

| 节点                  | 来源   | 特点           |
| --------------------- | ------ | -------------- |
| npm.elemecdn.com      | 饿了么 | 同步快，缺的多 |
| npm.onmicrosoft.cn    | 公益   | 需准确的版本号 |
| unpkg.zhimg.com       | 知乎   | 同步慢         |
| npm.akass.cn          | 公益   | 需准确的版本号 |
| cdn.chuqis.com/npm/   | 公益   | 需准确的版本号 |
| code.bdstatic.com/npm | 百度   | 仅同步热门包   |

### 注意事项

- **unpkg.com** 在国内几乎不可用，建议使用上方提供的国内 CDN 节点。
- 请根据项目需求和国内访问情况选择合适的 CDN 节点。

参考来源:[jsdelivr npm CDN 国内加速节点](https://www.cnblogs.com/xkboi/p/18218418)
