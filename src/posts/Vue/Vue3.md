# vue3

## 基础

### 实例与组件

#### 创建实例

使用`createApp`创建 Vue 应用的根实例

#### 挂载 DOM

`app.mount("#app")`，根组件，将根实例挂载到 DOM 指定的选择器(`#app`)上。

#### 全局组件

`app.component()`，在根应用实例挂载前定义全局组件。可在任意 Vue 组件中使用。

#### 局部组件

`components`属性，只能在当前注册的组件中使用。

#### 数据属性 (`data`)

- 定义一个返回对象的函数，表示页面的数据。
- 示例：`data(){ return {} }`
- 存储在组件实例中，可通过 `$data` 访问。

#### 模板属性 (`template`)

定义组件模板。

#### 方法属性 (`methods`)

- 为组件添加方法。
- 只要页面重新渲染就会调用方法（插值表达式时）

#### 计算属性 (`computed`)

- 类似于 `methods`，但在依赖数据未改变时会直接返回缓存数据。

#### 监听器 (`watch`)

- 监听数据变化。
- 监听的数据可以是一个函数，也可以是一个对象
- 示例：

```javascript
watch: {
  name(newVal, oldVal){},
  // 或者更复杂的监听选项
  name: {
    handler(newVal, oldVal){},
    immediate: true,
    deep: true
  }
}
```

- `handler`: 执行的方法。
- `immediate`: 是否在声明时立即执行。
- `deep`: 是否深度监听对象内部属性变化。

### 单文件组件（SFC）

- 文件扩展名 `.vue`
- `<template>` 标签：定义模板代码，可使用 `src` 引入外部文件。
- `<script>` 标签：定义脚本代码，可指定 `lang="ts"` 使用 TypeScript，并通过 `src` 引入外部文件。
- `<style>` 标签：定义样式，`scoped` 表示样式仅限当前组件有效；可使用 `lang` 指定预处理器（如 `less`）及通过 `src` 引入外部文件。

## 模版语法

### 功能

让用户界面渲染和用户交互操作的代码经过一系列编译，生成 html 代码，最终输出到页面。

### 插值（Mustache）表达式

#### 文本插值：

- 使用两个大括号`{{}}`包裹
- 使用`v-once`指令，数据改变时，插值内容不会更新

#### 原始 html 插值

使用`v-html`指令（容易导致 xss 攻击）

```js
<span v-html="rawhtml"></span>
```

#### 属性插值

- 使用`v-bind`指令

```js
<div v-bind:style="box"></div>
```

#### js 表达式插值

### 指令

#### `v-bind`

绑定数据到属性，简写`:[name]`

```js
<img  v-bind:src="url"/>
//可省略v-bind简写
<img  :src="url"/>
```

#### `v-if`, `v-else`, `v-else-if`

条件渲染，根据表达式的值为“真或假”来渲染元素，为 false 时，元素会被摧毁。

```js
<div v-if="type==='A'">A</div>
```

#### `v-show`

控制元素可见性，不同于`v-if`，元素本身不会被销毁。

```js
<div v-show="type==='A'">A</div>
```

#### `v-for`

- 循环渲染。
- 遍历对象时，不是按对象定义顺序遍历，想按顺序需转换成数组

```js
<span v-for="(item,index) in list">{{item.msg}}</span>
```

#### `v-on`

事件绑定，缩写形式为 `@`。

```js
<div @click="clickCallback('hi',$event)"></div>
```

修饰符:

- .stop: 阻止事件冒泡
- .prevent: 禁止默认行为
- .capture:使用事件捕获模式
- .self: 只有当 event.target 是当前元素自身时才触发函数
- .once: 只触发一次
- .passive: 不阻止默认行为，与 prevent 相反
- .left: 鼠标左键单击触发
- .middle: 鼠标中键单击触发
- .right: 鼠标右键单击触发
- .{keyAlias}: 只有当事件是有特定按键触发时才调用函数

#### `v-model`

双向绑定，用于表单元素。
修饰符:

- .lazy: 默认情况下，v-model 会实时同步输入框的值和数据，使用.lazy 修饰符后，在输入框事件触发后再进行值和数据的 。实时同步
- .number: 自动将用户的输入值转化为 number 类型
- .trim: 自动过滤用户输入的首尾空格

#### `v-memo`

- 提升列表渲染性能。

#### 动态指令

- 如 `:<attributeName>` 和 `@<eventName>`。

#### `v-slot`

- 指定插槽名称。

### 组件

#### 生命周期

- `beforeCreate`
- `created`
- `beforeMount`
- `mounted`
- `beforeUpdate`
- `updated`
- `beforeUnmount`
- `unmounted`
- `activated`, `deactivated`
- `renderTriggered`, `renderTracked`
- `errorCaptured`

#### 组件通信

- 父向子：`props`
- 子向父：`$emit`
- 非父子间：事件总线、`provide`/`inject`

#### 组件插槽

- 默认插槽
- 具名插槽
- 动态插槽名
- 插槽后备
- 作用域插槽
- 解构插槽 props

#### 动态组件与异步组件

- `<component>`
- `<keep-alive>`
- `defineAsyncComponent`
- `<suspense>`

#### teleport 组件

- 内置组件，允许组件内容渲染至指定 DOM 位置。

### Mixin

- 抽离公共逻辑
- 合并规则

### 组合式 API

#### `setup(props, context)`

- 组合式 API 的核心方法。
- `props`：响应式父组件传递的数据。
- `context`：包含`attrs`, `slots`, `emit`等信息。
- 返回对象供模板访问。

#### 响应式类方法

- `Vue.ref()`，`Vue.reactive()`
- `Vue.toRef()`, `Vue.toRefs()`
- `Vue.shallowRef()`, `Vue.shallowReactive()`
- `Vue.triggerRef()`
- `Vue.readonly()`, `Vue.shallowReadonly()`
- `Vue.isReadonly()`, `Vue.isRef()`, `Vue.isReactive()`, `Vue.toRaw()`, `Vue.makeRaw()`

#### 监听类方法

- `computed()`
- `watchEffect(() => {})`
- `watch(state, (newState, prevState) => {})`

#### 生命周期类方法

- onBeforeMount, onMounted, ...
- 这些生命周期钩子在 setup 方法内使用。

#### methods

- 可在 setup 中定义并返回。

#### provide/inject

- 在 setup 中使用。

### <script setup>

- 简洁的组合式 API 写法。
- 自动导入 props 和 emit：`defineProps`，`defineEmits`。
- `useSlots`，`useAttrs`。

### 动画组件 `<transition>`

- 属性（例如：`enter-from-class`, `enter-active-class`等）
- 钩子函数（如 `@before-enter`）
- 原生支持事件（如 `transitionend`）
- 过渡模式（`in-out`、`out-in`）
- 多元素/组件过渡
- 列表数据过渡（`<transition-group>`）
