# HTML5

HTML5 是一种用于创建和呈现互联网内容的标记语言。它是 HTML（HyperText Markup Language）的第五个主要版本，通过引入许多新的元素、属性和 API，增强了网页的结构、样式和交互性能。HTML5 在网页开发中广泛使用，支持音视频播放、图形绘制、动画效果、本地存储等功能，同时还提供了更好的语义化、可访问性和跨平台兼容性，使开发者能够创作出更丰富、更复杂的网页应用。

## 一、新增语义标签

HTML5 引入了许多新的语义化标签，以下是一些 HTML5 新增的主要标签：

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

## 二、多媒体 Video、Audio

在 HTML5 中，`<video>`和`<audio>`元素都有一些共同的属性，用于控制和配置媒体的播放和展示。下面列举了一些常用的属性和方法：

- `src`：指定媒体文件的 URL，用于加载媒体内容。
- `controls`：设置是否显示播放控制面板。如果设置为`controls`，则显示控制面板；如果不设置或设置为其他值，则不显示控制面板。
- `autoplay`：设置是否自动播放媒体。如果设置为`autoplay`，则在加载完成后自动开始播放；如果不设置或设置为其他值，则需要用户手动点击播放。
- `loop`：设置是否循环播放媒体。如果设置为`loop`，则在播放完毕后重新开始播放；如果不设置或设置为其他值，则播放完毕后停止播放。
- `muted`：设置是否静音。如果设置为`muted`，则静音播放；如果不设置或设置为其他值，则按正常音量播放。
- `poster`：指定媒体文件加载前显示的封面图片的 URL。
- `preload`：指定是否预加载媒体内容。可选值有`none`、`metadata`和`auto`，分别表示不预加载、仅预加载元数据(音频的作者、时长等信息)、预加载整个媒体文件。
- `currentTime`：获取或设置当前的播放时间，单位为秒。
- `volume`：获取或设置媒体的音量大小，取值范围为 0.0 到 1.0。
- `duration`：音频的长度，以秒计
- `buffered`： 已缓冲部分的 TimeRanges 对象
- `played`: 已播放部分的 TimeRanges 对象

---

- `play()`：调用该方法开始播放媒体。
- `pause()`：调用该方法暂停媒体的播放。
- `load()`：重新加载音频元素
- `onplay`、`onpause`、`onended`等事件属性：用于指定播放、暂停、播放结束等事件的回调函数。
- `canPlayType('audio/ogg')`：坚持浏览器是否能播放指定的音频类型

---

- `<source>`：用 source 元素指定多个文件，为不同的浏览器提供可支持的编码格式

请注意，上述属性列表仅列举了一些常用的属性，还有其他一些属性和方法可供使用，具体可查阅相关 HTML5 文档和规范来获取更详细的信息。

### <audio>

- audio 对象的事件

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

### <video>

- 在各个浏览器上的表现和兼容性比 audio 要复杂很多
- 常见音乐格式：OGG、MPEG4、WebM

  - OGG：Theora 视频编码、Vorbis 音频编码
  - MPEG4：H.264 视频编码、AAC 音频编码
  - WebM：VP8 视频编码、Vorbis 音频编码

- IOS 的 Safari 浏览器 中，要视频在本网页的页面内播放，需要添加 playsinline 属性
- 在 ios 自定义的 webview 中，要设置 webview.allowInlineMediaPlayback = YES
- 推荐组件：videojs

## 三、Canvas 和 2D/3D 绘画

## 四、离线和存储

### 1. sessionStorage

### 2.localStorage

## 五、表单增强

### 1.新增类型

HTML5 为表单输入元素引入了一些新的输入类型。以下是一些 HTML5 新增的常用输入类型：

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

14. `checkbox`、`radio`、`range`、`submit`、`button`等仍然是 HTML5 中的常用输入类型。

## 六、Web Workers

## 七、地理定位

HTML5 引入了 Geolocation API，用于获取用户的地理位置信息。通过 Geolocation API，开发者可以访问用户设备的地理位置数据，包括纬度、经度、海拔高度、速度等信息。

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

## 八、websocket

## 九、设备访问

Device Access，提供了能够操作原生硬件设备的接口
