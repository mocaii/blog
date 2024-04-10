# WebSocket

## 1. 引言

在当今实时互联的世界中，`即时、双向`的通信变得至关重要，尤其是在 Web 应用程序中。传统的 HTTP 协议虽然在 Web 开发中占据了主导地位，但因其请求-响应的模型并不适用于需要实时推送和接收数据的场景。在这种背景下，WebSocket 协议应运而生，它提供了一个`全双工的、低延迟`的通信通道，使得客户端和服务器之间能够实现实时消息传输。

## 2. WebSocket 简介

WebSocket 是一种在`单个TCP连接`上进行`全双工`通信的协议，由 IETF 标准化为 RFC 6455。相较于 HTTP，WebSocket 最大的特点是建立了持久连接，一旦握手成功，双方都可以在任意时刻主动发送数据，无需再为每个消息发起新的连接请求。

**全双工**：Full Duplex，是一个通信技术术语，描述的是通信系统中数据传输的能力。在全双工通信模式下，数据可以在两个方向上同时传输，而且互不影响。这意味着在同一时间内，通信的两端都能够独立地发送和接收数据。

## 3. 工作原理

WebSocket 连接始于一个 HTTP Upgrade 请求，客户端（通常是浏览器）通过`ws://`或加密的`wss://`协议向服务器发起握手请求。如果服务器同意升级连接，之后的通信便在同一个 TCP 连接上进行，数据以帧的形式传输，不受 HTTP 协议头和响应等待的影响，从而大大提升了效率和实时性。

### 3.1 基本用法

- 客户端，用 WebSocket API 提供的 WebSocket 对象实现（也可以直接使用第三方库）

```js
// 创建WebSocket实例，连接到服务器
var socket = new WebSocket("ws://localhost:8080/myWebSocketEndpoint");

// 连接打开的回调函数
socket.onopen = function (event) {
  console.log("WebSocket已连接");
  // 发送消息给服务器
  socket.send("Hello from client!");
};

// 接收到服务器消息的回调函数
socket.onmessage = function (event) {
  console.log("来自服务器的消息：" + event.data);
};

// 连接关闭的回调函数
socket.onclose = function (event) {
  console.log("WebSocket连接已关闭");
};

// 错误处理回调函数
socket.onerror = function (error) {
  console.error("WebSocket错误：" + error);
};
```

- 服务端，以 node.js 为例，使用 ws 库来创建一个 WebSocket 服务器来接收和响应客户端的连接和消息

```sh
 npm install ws
```

```js
// 引入ws库
const WebSocket = require("ws");

// 创建WebSocket服务器
const wss = new WebSocket.Server({ port: 8080 });

// 当客户端连接时触发
wss.on("connection", (ws) => {
  console.log("客户端已连接");

  // 当接收到客户端消息时触发
  ws.on("message", (message) => {
    console.log("收到了客户端消息:", message);

    // 处理客户端消息并发送响应
    let responseMessage = `你发送的消息是：${message}`;
    ws.send(responseMessage);
  });

  // 当客户端断开连接时触发
  ws.on("close", () => {
    console.log("客户端已断开连接");
  });

  // 可选：发送欢迎消息给新连接的客户端
  ws.send("你好，欢迎连接到WebSocket服务器！");
});

console.log("WebSocket服务器已启动，监听在端口8080");
```

### 3.2 自动重连

Auto Reconnect，是指当客户端与服务器的连接因网络波动、服务器重启等原因中断后，客户端能够自动尝试重新建立连接的过程。在 WebSocket 应用中，网络不稳定或短暂断开是很常见的现象，如果没有自动重连机制，客户端可能需要人工干预才能恢复通信。
实现自动重连通常包括以下步骤：

1.  `监听 onclose 事件`：当 WebSocket 连接关闭时触发此事件，可能是由于网络故障、服务器主动关闭连接或其它原因。
2.  `设定重试策略`：根据业务需求和网络环境设置重连间隔时间、重试次数等策略，如首次重连立即执行，后续逐渐增大间隔时间（退避算法）。
3.  `实现重连逻辑`：在 onclose 事件处理器中，安排一个定时器，到达指定时间后重新创建 WebSocket 连接，并尝试重新握手。

```js
let reconnectAttempts = 0;
let socket;

function connectToWebSocket() {
  socket = new WebSocket("ws://example.com/socket");
  socket.onclose = function (event) {
    console.log("WebSocket连接已关闭，即将尝试重新连接...");
    reconnectAttempts++;
    setTimeout(() => {
      connectToWebSocket();
    }, getReconnectDelay(reconnectAttempts)); // 根据重试次数计算延时
  };
  // 其他事件监听...
}

connectToWebSocket();
```

### 3.3 心跳检测

Heartbeat Detection or Keepalive Mechanism，心跳检测是一种维持长连接有效性的重要手段。在网络通信中，长时间没有数据传输时，某些中间节点（如路由器、防火墙等）可能会认为连接已经空闲并关闭连接。心跳检测通过定期发送一个简短的数据包（称为心跳包或 ping 消息）来维持连接活跃。
在 WebSocket 应用中，心跳检测通常包括两个部分：

1. `客户端定时发送心跳包`：客户端周期性地向服务器发送一个特殊格式的消息，告知服务器连接仍在使用。
2. `服务器确认心跳`：服务器接收到心跳包后，通常会回应一个 pong 消息，确认连接有效。

如果服务器在一段时间内没有收到客户端的心跳或者客户端没有收到服务器的响应，则可以认为连接出现问题，此时客户端可以启动自动重连机制。

```js
// 客户端
socket.onopen = function () {
  setInterval(function () {
    socket.send("ping"); // 发送心跳消息
  }, 30000); // 每30秒发送一次心跳
};

// 服务器端（伪代码）
socket.on("ping", function (data) {
  socket.send("pong"); // 回复心跳确认
});
```

## 4. 第三方库

尽管原生的 WebSocket API 足以应对大部分需求，但在实际项目中，开发者往往会借助成熟的第三方库来简化开发流程，增加更多高级功能，如自动重连、心跳检测、错误处理等。以下是一些常用的 WebSocket 库：

### 4.1 Socket.IO

一个跨平台的实时应用框架，向下兼容 WebSocket 和其他协议，提供统一的 API 接口，广泛应用于实时聊天、游戏和协同编辑等场景。官方网站：https://socket.io/

### 4.2 ws

一个纯 JavaScript 编写的 WebSocket 客户端和服务器端库，支持 Node.js 和浏览器环境。 官方 GitHub：https://github.com/websockets/ws

### 4.3signalR (.NET)

微软推出的实时通信库，可以自动选择最优的传输方式，包括 WebSocket、Server-Sent Events 和 Long Polling。 官方文档：https://docs.microsoft.com/en-us/aspnet/core/signalr/

## 5. 应用场景

WebSocket 在现代 Web 应用中有着广泛的应用，如实时聊天应用、股票交易系统、在线游戏、协同办公工具、实时数据分析仪表盘等，任何需要实时数据更新和双向通信的场景都可以考虑使用 WebSocket 技术。

## 6. 总结

WebSocket 作为现代 Web 应用实现实时通信的关键技术，其高效的全双工通信模式彻底改变了 Web 应用程序的设计思路和用户体验。通过充分利用原生 WebSocket API 或第三方库，开发者能够轻松构建出高性能、实时交互的 Web 应用。随着 Web 技术的不断演进，WebSocket 在未来将继续发挥重要作用，为构建更加实时、互动的互联网体验提供坚实支撑。
