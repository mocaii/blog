# 轻松拿捏，next.js 结合 vercel，快速开发部署个人博客

随着前端技术的发展，Next.js 框架以其强大的静态生成与服务端渲染能力，在 React 生态中脱颖而出，尤其适合用于构建高性能的个人博客站点。与此同时，Vercel 作为一款云原生的持续部署与全球分发平台，以其卓越的速度和易用性备受开发者喜爱。本文将引导你如何结合 Next.js 与 Vercel，快速搭建并部署自己的个人博客。

### 1. Vercel

- Vercel 作为 Next.js 的原生支持平台，提供了无缝的部署体验。
- 前往[vercel.com](https://vercel.com/)注册并登录账户。(直接使用 GitHub 账号登录，很方便。)

### 2. Next.js 项目

- 方法一：通过 vercel 新建项目，vercel 提供很多 next.js 模版，帮助开发者快速开始。
- 方法二：gitbub 已有项目，可以在 vercel 面板导入关联 github 账号的 git 仓库。

![导入项目](https://blog.mocaii.cn/importProject.png)

### 3. 部署

导入项目，以及后续提交代码到 git 仓库，vercel 都会自动部署。

![部署](https://blog.mocaii.cn/deploy.png)

### 4. 域名配置

#### 4.1 默认域名 xxx.vercel.app

vercel 会为项目自动生成一个域名，默认域名为 xxx.vercel.app。可惜被墙了，国内无法访问。

- 方法一：科学上网
- 方法二：绑定自己的域名

#### 4.2 拥有域名

在 Vercel、阿里云等等提供商，购买一个域名（哪里便宜买哪里）

#### 4.3 添加 domain

在 Vercel 对应项目 Settings 面板，新增一条 domain 记录。
新增完提示 Set the following record on your DNS provider to continue。需要把 CNAME 记录添加到域名解析中。
![add domain](https://blog.mocaii.cn/domain4.png)

#### 4.4 域名解析

到所购域名提供商控制台，根据上面的信息，添加一条 CNAME 记录，指向 Vercel 的 cname.vercel-dns.com 域名。（这里以阿里云为例，新加一个二级域名的记录）

![域名解析](https://blog.mocaii.cn/domain2.png)

#### 4.5 域名解析成功后，即可访问。

回到 vercel 项目的 domains 列表看到以下内容，表示域名解析成功，可以成功访问啦。
![DNS Records](https://blog.mocaii.cn/domain3.png)
