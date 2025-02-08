---
title: 包管理器：npm的使用笔记
date: '2024-05-07T09:28:06.167Z'
lastModified: '2024-05-07T09:28:06.167Z'
---
# 包管理器：npm 的使用笔记

持续记录 npm 相关知识 。

## 一、常用命令

### 1. 安装/卸载

```shell
npm init #初始化项目
npm init -y # -y 是以默认配置快速初始化
npm install #安装依赖包
npm install --save-dev #安装开发依赖包
npm cache verify #重新计算，磁盘文件是否与 sha1 值匹配，如果不匹配可能删除
npm cache clean --force #删除磁盘所有缓存文件
npm install xxx -D #安装开发依赖包，-D是--save-dev的简写
```

### 2. 配置

```shell
npm config get userconfig # 获取 npm 的配置文件
npm config set registry https://registry.npmjs.org/  #设置 npm 源
npm config get registry # 查看 npm 源
npm config set registry https://registry.npmmirror.com/ #设置为中国开发者定制的 npm 包管理服务镜像源

```

- 设置 npm 的镜像源： `npm config set registry xxx`（`npm config set registry https://registry.npmmirror.com`）

## 二、发布 npm 包

1. 注册 npm 账号 https://www.npmjs.com/
2. 本地通过命令行 `npm login` 登陆

- 由于设置了镜像，登录可能会失败，将源设置会默认`npm config set registry https://registry.npmjs.org/ `

3. 进入到项目目录下（与 package.json 同级），在 package.json 中指定发布文件、文件夹

```json
//package.json最重要的字段
{
  "name": "demo",
  "version": "1.0.0",
  "main": "./index.js",
  "files": ["lib", "package.jon"] //实际发包内容
}
```

4. 执行`npm version`更新版本， `npm publish --registry=https://registry.npmjs.org/ `发布

**包更新：可使用 npm version 控制版本升级,遵循 Semver 规范**

```s
# 增加一个修复版本号: 1.0.1 -> 1.0.2 (自动更改 package.json 中的 version 字段)
$ npm version patch

# 增加一个次版本号: 1.0.1 -> 1.1.0 (自动更改 package.json 中的 version 字段)
$ npm version minor

# 增加一个主版本号：1.0.0 -> 2.0.0
$ npm version major

```

## 三、加速 npm install

1. 选择时延低的 registry，pnpm，yarn

```sh
npm config set registry https://registry.npmmirror.com
```

2. `NODE_ENV=production`，只安装生产环境必要的包
3. `CI=true`，npm 会在此环境变量下自动优化
4. 结合 CI 的缓存功能，充分利用 `npm cache`
5. 使用 `npm ci` 代替 npm i，既提升速度又保障应用安全性

## 四、npm ci 与 npm i

### 1.npm ci

1. 主要设计用于` CI/CD（持续集成/持续部署）环境和生产环境`，追求安装的确定性和一致性。
2. 完全依赖于 package-lock.json 或 npm-shrinkwrap.json 文件，精确安装指定版本的依赖，不会检查或安装最新版本。
3. npm ci 不会修改 package-lock.json，没有这个文件时，npm ci 不起作用，需要使用 npm i.
4. 速度通常比 npm install 更快，因为它跳过了版本查找的过程，直接从锁定文件中读取信息。
5. 仅安装生产依赖（dependencies），忽略开发依赖（devDependencies），除非明确指定了 --include-dev 参数。
6. 在执行前会清空现有的 node_modules 目录，确保环境的纯净性。

### 2.npm i

1. 通常用于`开发环境`中，根据 package.json 文件中列出的依赖项进行安装。
2. 它会检查每个依赖的最新版本（根据语义版本控制），并尝试更新到最新兼容版本。
3. 如果存在 package-lock.json 或 npm-shrinkwrap.json，则会按照文件中的依赖关系和版本精确安装，但依然可能更新某些依赖的子依赖。npm i 会修改 package-lock.json。
4. 会安装开发依赖（devDependencies）和生产依赖（dependencies）。

## 五、packagge.json

package.json 记录了项目的配置信息，包括名称、版本、许可证等数据，也会记录所需的各种模块，包括 执行依赖，和开发依赖，以及 scripts 字段。

### 1.各种 dependencies

- `dependencies`：用到生产环境的依赖，正常运行所依赖的包
- `devDependencies`：（开发工具）开发环境依赖，开发、测试、打包工具
- `peerDependencies`：对等依赖的作用
- `optionalDependencies`：可依赖可不依赖，依赖不是程序运行所必须的，但是安装后可能会有新功能。例如一个图片解码库，安装了 optionalDependencies 后会支持更多的格式。
- `bundledDependencies`：发布包时需要打包的依赖，似乎很少见。

### 2.项目中指定 node 版本

在 package.json 中配置 engines 字段指定 node 版本

```js
{
  "engines": {
    "node": ">=14.0.0"
  }
}
```

### 3.package.json 中的 main/module/browser/exports

在 package.json 文件中，main, module, browser, 和 exports 字段都用于指导模块系统如何加载模块，特别是在不同的环境和使用场景下。

#### `main`

- **含义**：`main`字段指定了 Node.js 环境中模块的入口文件。当你在 Node.js 项目中通过 require()方法导入另一个 npm 包时，Node.js 会查找并加载这个指定的文件。对某个 package 进行导入时，实际上导入的是 main 字段所指向的文件。commonjs 时代产物。
- **典型值**：`"main": "index.js"` 或 `"main": "./dist/main.cjs"`。
- **使用场景**：主要用于 Node.js 服务端项目，或者需要兼容 CommonJS 模块系统的情况。

#### `module`

- **含义**：module 字段是为 ES 模块（ESM）环境提供的入口文件。当你的包同时支持 CommonJS 和 ES 模块，这个字段告诉支持 ESM 的打包工具或环境应该加载哪个文件。
- **典型值**：`"module": "index.esm.js"` 或 `"module": "./dist/main.mjs"`。
- **使用场景**：适用于现代前端项目或支持 ES 模块的 Node.js 环境，旨在优化模块加载性能和利用 ESM 的特性。

#### `browser`

- **含义**：browser 字段用于指定在浏览器环境中应该使用的入口文件。它可以用来指向一个针对浏览器环境特别优化的版本，或者一个 UMD 模块，以兼容多种模块加载机制。
- **典型值**：`"browser": "./dist/index.browser.js"`。
- **使用场景**：当你的包需要在浏览器端运行时，这个字段可以帮助打包工具自动选择合适的入口文件，避免引入 Node.js 特有的 API 或模块。

#### `exports`

- **含义**：exports 字段提供了一种更精细的控制模块导出的方式，允许你根据导入路径或环境条件指定不同的导出策略。这个字段支持复杂配置，可以按条件（比如子路径、条件导出、环境）映射不同的文件或模块。更容易地控制子目录的访问路径，也被称为 export map。exports 不仅可根据模块化方案不同选择不同的入口文件，还可以根据环境变量(NODE_ENV)、运行环境(nodejs/browser/electron) 导入不同的入口文件。
- **使用场景**：适用于大型库或框架，需要根据用户的导入路径、环境或其它条件动态提供不同实现的情况。它使得包的作者能更灵活地组织模块结构，同时为用户提供简洁的导入体验。

#### 总结

- 如果 npm 包导出的是 ESM 规范的包，使用 module
- 如果 npm 包只在 web 端使用，并且严禁在 server 端使用，使用 browser
- 如果 npm 包只在 server 端使用，使用 main
- 如果 npm 包在 web 端和 server 端都允许使用，使用 browser 和 main

### 4.browserlist

在不同的前端工具之间共用目标浏览器和 node 版本的配置工具。当于给 Babel、PostCSS、ESLint、StyleLint 等这些前端工具预设一个浏览器支持范围，这些工具转换或检查代码时会参考这个范围。**与垫片 polyfill 相关的涉及 browserlist**

- 由于低浏览器版本的存在，垫片是必不可少的
- 垫片越少，则打包体积越小
- 浏览器版本越新，则垫片越少

#### 4.1 caniuse-lite:浏览器版本数据库

常用查询语法

**（1）根据用户份额**：

```
> 5%: 在全球用户份额大于 5% 的浏览器
> 5% in CN: 在中国用户份额大于 5% 的浏览器
```

**（2）根据最新浏览器版本**

```
last 2 versions: 所有浏览器的最新两个版本
last 2 Chrome versions: Chrome 浏览器的最新两个版本
```

**（3）不再维护的浏览器**

```
dead: 官方不在维护已过两年，比如 IE10
```

**（4）浏览器版本号**

```
Chrome > 90: Chrome 大于 90 版本号的浏览器
```

## 六、package-lock.josn/yarn.lock

描述当前项目 npm 包的依赖树，记录各个模块的版本信息和下载路径

### 作用

锁定版本号，保证开发环境与生产环境的一致性，避免出现不兼容 API 导致生产环境报错

## 七、npm script 的生命周期

- prepublishOnly:最重要的一个生命周期
- prepack：npm install 之后，npm publish 之前自动执行

```js
//如husky
{
  prepare: "husky install";
}
```

- prepare
- postpack
- publish
- postpublish

**如果你需要在发包之前自动做一些事情，如测试、构建等，请在 prepulishOnly 中完成**

```js
{
  prepublishOnly: "npm run test && npm run build";
}
```

## 八、检测安装的依赖是否安全(偷偷挖矿？)

### 1. 审计，检测你的所有依赖是否安全

```js
npm/yarn audit
npx snyk //高级版本audit
npx wizard
npm audit fix //自动修复该库风险，原理就是升级依赖库
```

### 2. CI 机器人

可通过 CI/gitlab/github 中配置机器人，使他们每天轮询一次检查仓库的依赖中是否有风险。（设置 dependabot，解决方案也是升级版本号）

## 九、项目中平滑升级 npm 包

### 1. 自动发现更新

```sh
npm outdated #发现并列出待更新的 package
```

### 2. 自动更新版本号：借助工具 npm-check-updates

```sh
npm-check-updates -u #将 package.json 中待更新的版本号进行重写
```

## 十、node_modules 的目录结构：拓扑结构

node.js 可以依赖文件系统层层寻找 node_modules
node_modules 查找顺序：先从自身 node_modules 查找，找不到就从上级 node_modules 查找

- 以前：嵌套结构
- 现在：平铺结构（npm/yarn）

## 十一、使用 patch-package 修复 npm 包的紧急 bug
