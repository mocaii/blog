---
title: 探索 HTML5 新特性
date: '2024-04-10T03:58:55.987Z'
lastModified: '2024-04-10T03:58:55.987Z'
---
# 探索 HTML5 新特性

HTML5 是一种用于创建和呈现互联网内容的标记语言。它是 HTML（HyperText Markup Language）的第五个主要版本，通过引入许多新的元素、属性和 API，增强了网页的结构、样式和交互性能。HTML5 在网页开发中广泛使用，支持音视频播放、图形绘制、动画效果、本地存储等功能，同时还提供了更好的语义化、可访问性和跨平台兼容性，使开发者能够创作出更丰富、更复杂的网页应用。

## 一、语义化标签

HTML5 引入了一系列具有明确语义意义的标签，它们帮助开发者更好地组织页面内容结构，并提升搜索引擎优化（SEO）能力。
以下是一些 HTML5 新增的主要标签：

1. `<article>`：表示独立的、可独立分配或可回收的内容，如博客文章、新闻报道等。

2. `<aside>`：表示页面的侧边栏或附属内容。

3. `<audio>`：用于嵌入音频内容，例如音乐、音效等。

4. `<canvas>`：提供绘制图形、图像、动画的区域，可以使用 JavaScript 进行绘制操作。

5. `<datalist>`：配合`<input>`元素使用，提供输入建议和预定义选项列表。

6. `<details>`：用于创建一个可折叠的内容块，可以通过用户点击展开或收起内容。

7. `<figcaption>`：用于为`<figure>`元素添加标题或说明文本。

8. `<figure>`：表示一组独立的、有关联的媒体内容，通常用于包含图像、图表、照片集等。

9. `<footer>`：表示页面或区块的页脚部分，一般包含版权信息、联系方式等内容。

10. `<header>`：表示页面或区块的顶部部分，一般包含标题、导航栏等内容。

11. `<main>`：表示文档的主要内容，一个文档中应该只有一个`<main>`元素。

12. `<nav>`：表示导航区域，通常用于包含网站的主导航链接。

13. `<section>`：表示文档的一个独立部分。

14. `<video>`：用于嵌入视频内容，例如电影、电视节目、网络视频等。

15. `<time>`：表示日期、时间或时间段的文本。

上述标签只是 HTML5 中新增的一部分，还有其他标签如`<mark>`、`<progress>`、`<meter>`、`<output>`等，每个标签都有不同的语义和用途，可以根据需要选择适合的标签来构建网页结构。

PS：查看全部[HTML 元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a)

## 二、多媒体支持

HTML5 不再依赖 Flash 等第三方插件，而是内置了对多媒体的支持。
在 HTML5 中，`<video>`和`<audio>`元素都有一些共同的属性，用于控制和配置媒体的播放和展示。下面列举了一些常用的属性和方法：

1. `src`：指定媒体文件的 URL，用于加载媒体内容。
2. `controls`：设置是否显示播放控制面板。如果设置为 controls，则显示控制面板；如果不设置或设置为其他值，则不显示控制面板。
3. `autoplay`：设置是否自动播放媒体。如果设置为 autoplay，则在加载完成后自动开始播放；如果不设置或设置为其他值，则需要用户手动点击播放。
4. `loop`：设置是否循环播放媒体。如果设置为 loop，则在播放完毕后重新开始播放；如果不设置或设置为其他值，则播放完毕后停止播放。
5. `muted`：设置是否静音。如果设置为 muted，则静音播放；如果不设置或设置为其他值，则按正常音量播放。
6. `poster`：指定媒体文件加载前显示的封面图片的 URL。
7. `preload`：指定是否预加载媒体内容。可选值有`none`、`metadata`和`auto`，分别表示不预加载、仅预加载元数据(音频的作者、时长等信息)、预加载整个媒体文件。
8. `currentTime`：获取或设置当前的播放时间，单位为秒。
9. `volume`：获取或设置媒体的音量大小，取值范围为 0.0 到 1.0。
10. `duration`：音频的长度，以秒计
11. `buffered`： 已缓冲部分的 TimeRanges 对象
12. `played`: 已播放部分的 TimeRanges 对象

13. `play()`：调用该方法开始播放媒体。
14. `pause()`：调用该方法暂停媒体的播放。
15. `load()`：重新加载音频元素
16. `onplay`、`onpause`、`onended`等事件属性：用于指定播放、暂停、播放结束等事件的回调函数。
17. `canPlayType('audio/ogg')`：坚持浏览器是否能播放指定的音频类型
18. `<source>`：用 source 元素指定多个文件，为不同的浏览器提供可支持的编码格式

请注意，上述属性列表仅列举了一些常用的属性，还有其他一些属性和方法可供使用，具体可查阅[HTML 元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a)文档。

### `<audio>`

audio 对象的事件（aduio 对象基本一致 ）:

```html
<script>
  const audio = document.getElementById("audio");

  //可以开始播放
  audio.addEventListener("canplay", function () {
    console.log("canplay", audio.duration);
  });

  //开始加载
  audio.addEventListener("loadstart", function () {
    console.log("loadstart", new Date().getTime());
  });

  //时长数据发生变化
  audio.addEventListener("durationchange", function () {
    console.log("durationchange", new Date().getTime());
  });

  //音频的元数据已加载
  audio.addEventListener("loadedmetadata", function () {
    console.log("loadedmetadata", new Date().getTime());
  });

  //正在下载
  audio.addEventListener("progress", function () {
    console.log("progress", new Date().getTime());
  });

  //被阻止加载时、完成加载后、被暂停时触发
  audio.addEventListener("suspend", function () {
    console.log("suspend", new Date().getTime());
  });

  //当前帧的数据已加载，当没有足够的数据来播放指定音频的下一帧时触发
  audio.addEventListener("loadeddata", function () {
    console.log("loadeddata", new Date().getTime());
  });

  //能持续播放完整个音频时触发
  audio.addEventListener("canplaythrough", function () {
    console.log("canplaythrough", new Date().getTime());
  });

  //开始播放时触发
  audio.addEventListener("play", function () {
    console.log("play", new Date().getTime());
  });

  //当播放时间改变时触发，在播放过程中一直触发，触发频率取决于系统
  audio.addEventListener("timeupdate", function () {
    console.log("timeupdate", new Date().getTime());
  });

  //暂停或者播放完一个音频时会触发
  audio.addEventListener("pause", function () {
    console.log("pause", new Date().getTime());
  });

  //播放完时触发
  audio.addEventListener("ended", function () {
    console.log("ended", new Date().getTime());
  });

  //音量改变时
  audio.addEventListener("volumechange", function () {
    console.log("volumechange", new Date().getTime());
  });
</script>
```

### `<video>`

- video 在各个浏览器上的表现和兼容性比 audio 要复杂很多
- IOS 的 Safari 浏览器 中，要视频在本网页的页面内播放，需要添加 playsinline 属性
- 在 ios 自定义的 webview 中，要设置 webview.allowInlineMediaPlayback = YES
- 推荐组件：videojs
- 常见音视频封装格式：OGG、MPEG4、WebM

  - OGG：Theora 视频编码、Vorbis 音频编码
  - MPEG4：H.264 视频编码、AAC 音频编码
  - WebM：VP8 视频编码、Vorbis 音频编码

## 三、表单增强

### 3.1 input 类型

HTML5 为表单`<input>`元素引入了一些新的输入类型。以下是一些 HTML5 新增的常用 input type：

1. `date`：用于选择日期（年、月、日）的输入框。

2. `time`：用于选择时间的输入框。

3. `datetime`：用于选择日期和时间的输入框，包括年、月、日、小时、分钟和秒。

4. `week`：用于选择一年中的周数的输入框。

5. `month`：用于选择年份和月份的输入框。

6. `color`：用于选择颜色的输入框。

7. `number`：用于输入数值的文本框，允许输入数字和浮点数。

8. `email`：用于输入邮箱地址的文本框。

9. `url`：用于输入 URL 地址的文本框。

10. `tel`：用于输入电话号码的文本框。

11. `range`：用于选择数值范围的滑块。

12. `search`：用于进行搜索的输入框。

13. `file`：用于上传文件的输入框。

14. `checkbox`、`radio`、`range`、`submit`、`button`等仍然是 HTML5 中的常用[输入类型](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/button)。

### 3.2 自动验证

使用上述新的输入类型时，浏览器会根据指定的类型进行基本的数据格式验证。如果用户输入的数据不符合预期格式，提交表单时浏览器会阻止该操作并给出提示。

### 3.3 占位符文本 (Placeholder)

placeholder 属性可用于任何输入字段，它会在输入框内显示一段灰色的提示文本，当用户开始输入时消失，有助于指导用户填写表单。

### 3.4 自动完成功能 (Autocomplete)

浏览器可以根据之前用户的输入历史提供自动补全建议，尤其在诸如搜索框或者邮件地址输入框中非常实用。

### 3.5 要求必填字段 (Required Attribute)

通过给表单字段添加 required 属性，可以要求用户必须填写此字段才能提交表单，否则浏览器会阻止表单提交，并提示用户填充缺失信息。

### 3.6 新属性与验证

- `pattern` 属性允许开发者自定义正则表达式来验证输入内容。
- `min` 和 `max` 属性可用于需要有特定范围限制的输入类型，比如年龄或数量。
- `step` 属性配合 `number` 类型，控制输入值的合法递增值。

### 3.7 拖放文件上传 (Drag and Drop)

HTML5 支持拖放 API，允许用户直接从文件系统中拖拽文件到表单的指定区域进行上传。

PS: [表单指南](https://developer.mozilla.org/zh-CN/docs/Learn/Forms)

## 四、Canvas 和 WebGL

1. `<canvas>`：这是一个基于像素的绘图 API，允许在网页上动态生成图形、图像甚至是游戏级别的复杂渲染。

2. `WebGL`：基于`<canvas>`扩展的三维图形接口，允许浏览器利用硬件加速执行高质量的 3D 图形渲染。

## 五、客户端存储

1. `localStorage`：持久化的客户端存储方案，即使关闭浏览器后数据仍然存在。
2. `sessionStorage`：仅在当前会话窗口中有效的临时存储，关闭窗口后清除。

## 六、Web Workers

Web Workers 允许在浏览器后台创建并运行独立的脚本，这些脚本在单独的线程中运行，与主线程（也称为 UI 线程）并行执行，互不干扰。Web Workers 主要有两种类型。

### 6.1 专用 Worker（Dedicated Workers）

专用 Worker 是最常见的 Worker 类型，它与父页面之间通过消息传递接口进行通信。父页面创建 Worker 实例时，可以传入一个脚本 URL，Worker 线程加载并执行该脚本。Worker 线程和父页面之间通过 postMessage()方法发送消息，并通过 onmessage 事件接收消息。

```js
//在主线程中通过new Worker(url)创建一个新的Worker对象，其中url指向将在后台执行的JavaScript脚本
const myWorker = new Worker("worker.js");
//监听Worker消息
myWorker.onmessage = function (event) {
  console.log("Received message from worker:", event.data);
};
//向Worker发送消息
myWorker.postMessage({ inputData: "some data to process" });
//错误处理
myWorker.onerror = function (errorEvent) {
  console.error("Error occurred in worker:", errorEvent.message);
};
//关闭Worker
myWorker.terminate();
```

### 6.2 共享 Worker（Shared Workers）

共享 Worker 可以被多个窗口或上下文共享和访问，它们能建立跨页面的通信通道，非常适合用来处理那些需要在多个页面间共享资源或状态的情况。

## 七、地理定位

HTML5 引入了 Geolocation API，用于获取用户的地理位置信息。通过 Geolocation API，开发者可以访问用户设备的地理位置数据，包括纬度、经度、海拔高度、速度等信息，可以提供更加个性化和精准的服务，如导航、天气预报等。当然，为了尊重用户隐私，地理定位功能在使用前需要获得用户的明确同意。

使用 Geolocation API 的一般流程如下：

1. 检测浏览器是否支持 Geolocation API：

```javascript
if (navigator.geolocation) {
  // 支持Geolocation API
} else {
  // 不支持Geolocation API
}
```

2. 请求获取用户地理位置：

```javascript
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
```

其中，`successCallback`是获取位置信息成功时调用的回调函数，`errorCallback`是获取位置信息失败时调用的回调函数。

3. 处理获取到的位置信息：

```javascript
function successCallback(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  var altitude = position.coords.altitude;
  var speed = position.coords.speed;
  // 处理位置信息
}

function errorCallback(error) {
  // 处理获取位置信息失败的情况
}
```

在`successCallback`回调函数中，可以通过`position`参数获取到位置信息的各个属性。

需要注意的是，获取用户地理位置需要用户授权，因此在浏览器中会弹出一个对话框询问用户是否允许共享位置信息。

Geolocation API 还支持其他方法和属性，如`watchPosition`用于持续获取位置信息、`clearWatch`用于停止位置监测等。开发者可以根据自己的需求选择合适的方法和属性来使用地理位置信息。

## 八、Websocket

WebSocket 是一个可以在单个 TCP 连接上进行全双工（full-duplex）通信的协议，它允许客户端和服务器之间建立持续的、低延迟的通信连接，并在任意时刻相互发送数据，而不仅仅是响应客户端请求。与传统的 HTTP 协议相比，WebSocket 能够保持连接打开，使服务器能够实时地向客户端推送数据，而不需要像轮询或长轮询那样频繁请求服务器以获取更新。

在 HTML5 环境下，WebSocket 通过 JavaScript API 的形式提供给 Web 开发者使用，允许他们在浏览器中轻松创建 WebSocket 连接，从而实现诸如实时聊天、股票报价、在线游戏、协同编辑等需要实时通信的应用场景。这意味着，自 HTML5 标准推出以来，WebSocket 已经成为现代 Web 应用中实现双向实时通信的标准手段之一。

## 九、设备访问

Device Access，提供了能够操作原生硬件设备的接口
