# 快速了解 webpack

一个前端工程化工具，用于打包、构建和优化前端项目。将多个前端资源文件（如 JavaScript、CSS、图片等）进行模块化管理，并通过各种加载器和插件进行处理和转换，最终生成用于部署的静态资源文件。

## 一、作用

### 1.模块化管理

将项目中的各个模块进行依赖分析和管理，通过模块化的方式组织代码，提高代码的可维护性和复用性。

### 2.打包和压缩

webpack 可以将多个模块打包成一个或多个静态资源文件，减少网络请求次数，提高页面加载速度。它还可以对生成的文件进行压缩，减小文件体积，提升页面性能。

### 3.资源优化

Webpack 可以对各种资源文件进行处理和优化，如使用 loader 处理 CSS、JavaScript 的转译、压缩和代码分割，使用 plugin 进行图片压缩、缓存等操作，以提高应用的性能和用户体验。

### 4.开发环境支持

Webpack 提供了开发环境(开发服务器 express)的支持，包括热模块替换（Hot Module Replacement）、代码调试等功能，方便开发者进行开发和调试工作。

## 二、核心内容

### 1.entry

entry 是 webpack 的入口配置，它指定了 webpack 打包的起点。可以是一个或多个入口文件，取决于项目的需求。入口文件可以是 JavaScript 文件、CSS 文件、HTML 文件或其他类型的文件。当 webpack 运行时，会根据 entry 的配置找到所有的依赖模块，并从入口文件开始构建依赖图。

entry 的配置方式有两种：

- 字符串形式：可以直接指定一个入口文件的路径，例如：

```js
entry: "./src/index.js";
```

- 对象形式：可以指定多个入口文件，每个入口文件都会生成一个对应的输出文件。这在多页面应用中很常见，例如：

```js
entry: {
  main: './src/main.js',
  app: './src/app.js'
}
```

### 2.output

output 是 webpack 的输出配置，它指定了打包后的文件应该输出到哪个目录，以及输出文件的命名规则。
output 的配置方式也有两种：

- 单个文件输出：可以通过指定文件路径和文件名来配置输出文件的位置和名称，例如：

```js
output: {
  path: path.resolve(__dirname, 'dist'),
  filename: 'bundle.js'
}
```

- 多个文件输出：可以使用占位符来生成多个输出文件，例如：

```js
//static/js/[name].[contenthash:8].chunk.js
output: {
  path: path.resolve(__dirname, 'dist'),
  filename: '[name].js'
}
```

这里的 `[name]` 占位符会被替换为 entry 中指定的入口文件的键名，例如上面的配置会生成 main.js 和 app.js 两个文件。

### 3.devServer

Webpack Dev Server (简称 WDS) 是一个基于 Node.js 的轻量级开发服务器，通常配合 Webpack 一起使用，特别适用于前端项目的快速开发迭代。其核心特性包括：

#### 实时重载（Hot Module Replacement / HMR）：

当源代码发生变化时，Dev Server 能自动检测并重新编译相关模块，而且在许多情况下，它能够做到无需刷新整个页面就实现模块的热更新，大大提升了开发效率。

#### 内联模式：

开启内联模式后，Dev Server 可以将编译错误和警告直接推送到浏览器端，使得开发者能够迅速定位问题。

#### 静态文件服务：

Dev Server 默认会将 Webpack 编译输出的资源文件以及任何配置中指定的静态目录下的文件作为可访问的静态资源，即开发者可以直接通过浏览器访问这些文件。

#### 自动打开浏览器：

可以配置 Dev Server 在启动时自动打开浏览器并指向指定的地址。

#### 代理功能（Proxy）：

Dev Server 支持设置代理规则，用于转发前端发出的 API 请求到实际的后端服务器，便于在开发环境中模拟生产环境的请求路由。

#### HTTPS 支持：

可以配置为通过 HTTPS 提供服务，以便测试安全相关的功能或者满足某些现代浏览器的安全要求。

#### WebSocket 通信：

Dev Server 通过 WebSocket 与浏览器建立连接，实现高效实时的通信机制，从而实现上述的 HMR 和其他交互功能。

在 Webpack 配置文件（webpack.config.js）中，通过 devServer 配置项来定制 Webpack Dev Server 的行为，比如设置监听端口、主机名、启用 HMR、配置代理等。在开发阶段，只需运行 webpack serve 或者 npx webpack serve 命令即可启动 Dev Server，开始便捷的开发体验。

```js
devServer: {
    port: 3000,
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
  },
```

### 4.loader

#### 作用

Loader 是 Webpack 中的一种处理模块的中间件，主要用于转换某种类型的文件。每个 Loader 都是一个独立的模块，它们接收原始文件作为输入，并将其转换为可在浏览器中使用的有效格式或另一种可被 Webpack 识别的模块格式。

例如，当遇到.js 文件，Babel Loader 可以将 ES6、ES7 等高级 JS 语法转换为向后兼容的 ES5 代码；而对于.scss 或.less 这样的预处理器样式文件，对应的 Loader 则可以将其转换为普通的 CSS 文件。

#### 工作原理

Loader 通过链式调用的方式执行，每个 Loader 负责解决一种特定的转换任务，通过在 webpack 配置文件中指定 module.rules 来决定哪些文件需要经过哪些 Loader 的处理。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/, // 匹配.js文件
        use: ["babel-loader"], // 使用Babel Loader
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // 将CSS插入到DOM中
          "css-loader", // 解析CSS文件中的import和url()
          "sass-loader", // 将Sass转换为CSS
        ],
      },
    ],
  },
};
```

### 5.plugin

#### 作用

Plugin 则是对 Webpack 构建流程的扩展，它可以参与到 Webpack 整个生命周期中的各个阶段，执行更复杂和广泛的构建步骤，如文件优化、资源注入、环境变量替换、编译报告生成等。

举例来说，HtmlWebpackPlugin 可以在构建过程中生成 HTML 入口文件，自动注入编译后的 JS 和 CSS 资源；UglifyJsPlugin 则可以在打包完成后对 JS 代码进行压缩优化。

#### 工作原理

Plugin 通过暴露一个 apply 方法来注册自身到 Webpack 的编译生命周期中，利用 Tapable 提供的钩子系统来插入自己的逻辑。在 webpack 配置文件中，通过 plugins 数组来配置和使用 Plugin。

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    new UglifyJsPlugin(), // 对JS进行压缩
  ],
};
```

Loader 侧重于文件内容的转换，而 Plugin 关注的是整个构建流程的控制和优化，两者共同构成了 Webpack 强大而灵活的生态系统。s

### 6.resolve

用于配置 webpack 如何解析模块。通过配置该字段，你可以指定模块的查找路径、文件后缀名的解析顺序等。一些常用的配置选项包括 extensions（用于指定模块的文件后缀名）、alias（用于创建模块的别名）等。

`extensions`用于指定模块的文件后缀名，webpack 会按照指定的顺序尝试解析模块。`如果你配置了 extensions: ['.js', '.jsx']，那么在引入模块时，你可以省略文件的后缀名，webpack 会自动尝试解析 .js 或 .jsx 文件`。
`alias`用于创建模块的别名，可以简化模块的引入路径。

```js
resolve: {
  extensions: ['.js', '.jsx'],
  alias: {
    '@': path.resolve(__dirname, 'src')
  }
}
```

### 7.mode

用于告诉 webpack 当前的构建模式,可以设置为 'development'（开发模式）或 'production'（生产模式）。在不同的模式下，webpack 会采取不同的优化策略和默认配置。另外，还有一个 'none' 的选项，表示没有设置特定的构建模式。

- `development`：开发模式，会启用一些开发工具和优化策略，例如更详细的错误提示、更快的构建速度等。
- `production`：生产模式，会启用一些生产环境下的优化策略，例如代码压缩、资源优化等。
- `none`：没有设置特定的构建模式，webpack 不会应用任何默认配置。

```js
module.exports = {
  // ...
  mode: "development",
};
```

### 8.内置的 webpack 插件

- `splitChunks`分割代码（生产模式默认开启）
- `UglifyJsPlugin`压缩 js（生产模式默认开启）
- `OptimizeCSSAssetsPlugin`压缩 css
- `DefinePlugin`定义全局常量。你可以使用该插件来定义一些在编译时就确定的常量，例如 API 地址、环境变量等。

```js
const webpack = require("webpack");

module.exports = {
  // ...
  plugins: [
    new webpack.UglifyJsPlugin(),
    new webpack.optimize.OptimizeCSSAssetsPlugin(),
    new webpack.DefinePlugin({
      API_URL: JSON.stringify("http://api.example.com"),
      ENV: JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
```

### 9.process.env 环境变量

可以在配置文件中访问 process.env 对象，并根据环境变量的值来进行不同的配置。

```js
module.exports = {
  // ...
  output: {
    filename: process.env.NODE_ENV === "production" ? "bundle.min.js" : "bundle.js",
  },
};
```

## 三、使用 webpack 构建项目常见问题

### 1.构建变慢

#### `原因`

- 项目规模的增大、文件数量增加、loader 和 plugin 增多
- 入口文件过多
- 大量不必要的模块加载
- 复杂的 loader 或 plugin
- 缓存失效
- 单线程构建

这是因为 webpack 需要处理更多的文件和模块，执行更多的操作，导致构建时间增加。

#### `优化 webpack 构建速度的方法`

1）`使用新版本 webpack和相关插件`：每个版本的 webpack 都会进行性能优化，因此确保你使用的是最新版本。

2）`减少入口文件的数量`：减少入口文件的数量可以减少 webpack 所需处理的文件数量，从而提高构建速度。

3）`使用代码分割和懒加载`：通过代码分割和懒加载可以将代码拆分成更小的块，只在需要时加载，从而减少初始加载的文件大小和构建时间。

在`webpack.config.js`配置 splitChunks 进行代码分割：

```js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: "all", //表示将所有的模块代码都进行拆分
      minSize: 30000, //表示拆分后的文件大小至少为 30KB
      maxSize: 0,
      minChunks: 1, //表示至少被引用一次的模块才会被拆分
      maxAsyncRequests: 5, //表示同时加载的模块数量不超过 5 个
      maxInitialRequests: 3, //表示入口文件的最大并行请求数量不超过 3 个
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        // 是一个缓存组的配置，用于将模块分组，根据不同的规则进行拆分
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

在需要进行懒加载的组件中，使用 `React.lazy()` 函数来引入`懒加载`的模块

```js
import React, { lazy, Suspense } from "react";

const MyLazyComponent = lazy(() => import("./MyLazyComponent"));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <MyLazyComponent />
      </Suspense>
    </div>
  );
}

export default App;
```

在支持 `ES6`模块的环境中，可以使用动态 `import `语法来实现按需加载，这种方式可以在运行时动态加载模块，只有在需要时才会进行加载。

```js
import("./MyLazyComponent").then((module) => {
  // 模块加载完成后的处理逻辑
});
```

对于`旧版本`的 webpack，可以使用 `require.ensure` 来实现代码分割和懒加载

```js
require.ensure([], (require) => {
  const MyLazyComponent = require("./MyLazyComponent");
  // 使用 MyLazyComponent
});
```

使用第三方库 `react-loadable` 和 `loadable-components`

4）`使用缓存`：使用 webpack 的缓存功能可以避免重复构建未更改的模块，从而提高构建速度。可以通过在 webpack 配置中设置 cache: true 来启用缓存。

5）`使用多线程或并行构建`：使用 webpack 的多线程或并行构建功能可以同时处理多个任务，从而加快构建速度。可以使用插件如 thread-loader 或 parallel-webpack 来实现。

6）`减少 loader 和插件的使用`：每个 loader 和插件都会增加构建时间，因此只使用必要的 loader 和插件，避免不必要的处理。(选择合适的 loader)

7）`使用生产模式构建`：在生产模式下构建项目可以启用各种优化，如代码压缩和 tree shaking，从而减小构建产物的大小和提高性能。

8）`使用 externals 配置`：将一些第三方库通过 externals 配置排除在构建过程之外，从而减少构建时间。

### 2.构建产物体积过大

webpack 构建的产物体积过大可能会导致加载时间过长，影响用户体验。这可能是因为未优化的代码、重复的模块、未压缩的资源等原因导致的。

- 代码压缩
- 资源优化
- 代码分割
- 懒加载

### 3.模块解析问题

webpack 通过解析模块来确定模块之间的依赖关系，但有时可能会遇到模块解析失败或解析路径错误的问题。这可能是因为配置错误、路径问题、模块命名冲突等原因导致的。

- resolve.alias
- resolve.extensions

### 4.兼容性问题

webpack 默认使用 ES5 语法进行构建，但在一些老旧的浏览器中可能不支持某些 ES5 或 ES6 的语法特性。这可能会导致构建产物在某些浏览器中无法正常运行。

- babel 转译
- polyfill 填充

### 5.缓存问题

webpack 默认使用文件内容的 hash 值作为文件名，以实现缓存的效果。但有时可能会遇到缓存失效的问题，即使文件内容没有变化也会重新加载。这可能是因为配置错误、缓存策略不当等原因导致的。

- output.filename
- output.chunkFilename
- 正确配置缓存策略

`cache 持久化缓存：`webpack5 内置了关于缓存的插件，可通过 cache 字段 (opens new window)配置开启

```js
{
  cache: {
    type: "filesystem";
  }
}
```

## 四、打包分析工具

1）`webpack-bundle-analyzer`

这是一个可视化工具，可以帮助你分析 webpack 构建产物的大小和依赖关系。它会生成一个可交互的报告，让你可以直观地了解每个模块的大小和引用关系，从而帮助你优化构建速度。
首先，安装 webpack-bundle-analyzer：

```shell
npm install --save-dev webpack-bundle-analyzer
```

然后，在 webpack 配置文件中引入并使用插件：

```js
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  // ...
  plugins: [new BundleAnalyzerPlugin()],
};
```

运行 webpack 构建命令后，会生成一个报告文件，并自动在浏览器中打开该报告。你可以通过该报告来分析构建产物的大小和依赖关系。

2）`speed-measure-webpack-plugin`：

这个插件可以测量和记录每个 loader 和插件的执行时间，以及整个构建过程的耗时。它会生成一个详细的报告，让你可以了解哪些 loader 和插件的执行时间较长，从而帮助你找到性能瓶颈。
首先，安装 speed-measure-webpack-plugin：

```shell
npm install --save-dev speed-measure-webpack-plugin
```

然后，在 webpack 配置文件中引入并使用插件：

```js
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
  // ...
});
```

运行 webpack 构建命令后，会在控制台输出每个 loader 和插件的执行时间，以及整个构建过程的耗时。

3） `webpack-build-notifier`：
这个工具可以在构建完成时发送桌面通知，包括构建时间、产物大小等信息。这可以帮助你快速了解每次构建的性能情况，以及是否有异常。
首先，安装 webpack-build-notifier：

```shell
npm install --save-dev webpack-build-notifier
```

然后，在 webpack 配置文件中引入并使用插件：

```js
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");

module.exports = {
  // ...
  plugins: [
    new WebpackBuildNotifierPlugin({
      title: "My Project Webpack Build",
      suppressSuccess: true,
    }),
  ],
};
```

运行 webpack 构建命令后，会在构建完成时发送桌面通知，包括构建时间、产物大小等信息。

4）`webpack-dashboard`：
这是一个可视化的仪表盘工具，可以在终端中展示构建过程的进度和统计信息。它提供了一个直观的界面，让你可以实时监控构建进度，并了解构建速度和性能。
首先，安装 webpack-dashboard：

```shell
npm install --save-dev webpack-dashboard
```

然后，在 webpack 配置文件中引入并使用插件：

```js
const DashboardPlugin = require("webpack-dashboard/plugin");

module.exports = {
  // ...
  plugins: [new DashboardPlugin()],
};
```

运行 webpack 构建命令后，会在终端中展示一个可视化的仪表盘，显示构建过程的进度和统计信息。

## 五、Q&A

### 1. 简要介绍 webpack 和它的主要功能

Webpack 是一个前端工程化的工具，它可以将多个文件打包成一个或多个静态资源文件，以便在浏览器中加载和执行。
Webpack 的主要作用是将多个文件打包成一个或多个静态资源文件，以便在浏览器中加载和执行。它可以将多个 JavaScript、CSS、图片等文件打包成一个或多个 bundle 文件，并且支持模块化打包，可以按需加载和动态更新。
Webpack 还可以通过插件和 loader 来实现代码转换、代码分割、代码压缩、代码优化等功能，从而提高了前端开发效率和质量。
除此之外，Webpack 还支持热更新和开发服务器，可以在开发过程中快速刷新页面，并且通过代码分割和懒加载等技术来优化性能和用户体验。
总之，Webpack 是一个强大的前端工程化工具，可以帮助我们快速、高效地开发和构建前端项目。

### 2. Webpack 中的 entry 和 output 分别是什么意思，它们的作用是什么？

- entry 用于指定打包的入口文件，即 webpack 开始构建的起点。它可以是一个或多个文件，也可以是一个对象，指定多个入口文件。例如，如果你的项目有两个入口文件：main.js 和 app.js，你可以这样配置 entry：

```javascript
module.exports = {
  entry: {
    main: "./src/main.js",
    app: "./src/app.js",
  },
  // 其他配置项...
};
```

output 用于指定打包后的输出目录和文件名。可以通过配置 output.path 来指定输出的目录，通过 output.filename 来指定输出的文件名。例如，如果你想将打包后的文件输出到 dist 目录下，并且文件名为 bundle.js，你可以这样配置 output：

```javascript
module.exports = {
  // 其他配置项...
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
};
```

这样，在运行 webpack 构建时，它会根据 entry 配置的入口文件，进行打包，并将打包后的文件输出到 output 配置的目录中。
