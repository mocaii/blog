# Vue3 快速入门指南

Vue3 是 Vue.js 框架的最新版本，带来了诸多改进和新特性，旨在提升开发者的生产力和应用性能。

## 一、基础

### 1. 实例与组件

#### 1.1 创建实例

使用`createApp`创建 Vue 应用的根实例

#### 1.2 挂载 DOM

`app.mount("#app")`，根组件，将根实例挂载到 DOM 指定的选择器(`#app`)上。

#### 1.3 全局组件

`app.component()`，需在根应用实例挂载前定义全局组件。可在任意 Vue 组件中使用。

#### 1.4 局部组件

`components`属性，只能在当前注册的组件中使用。

#### 1.5 数据属性 (data)

- 定义一个返回对象的函数，表示页面的数据。
- 存储在组件实例中，可通过 `$data` 访问。

```js
data(){
  return {
    name: "Vue3",
  }
}
```

#### 1.6 模板属性 (template)

定义组件模板。

#### 1.7 方法属性 (methods)

- 为组件添加方法。
- 只要页面重新渲染就会调用方法（插值表达式时）

#### 1.8 计算属性 (computed)

- 为组件添加方法，和 methods 差不多
- 如果依赖数据没有发生改变，会直接返回缓存数据，不会重新计算（插值表达式时）

#### 1.9 监听器 (watch)

监听数据变化。监听的数据可以是一个函数，也可以是一个对象

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

#### 1.10 单文件组件（SFC）

- 文件扩展名： `.vue`
- `<template>` 标签：定义模板代码，可使用 `src` 引入外部文件。
- `<script>` 标签：定义脚本代码，可指定 `lang="ts"` 使用 TypeScript，并通过 `src` 引入外部文件。
- `<style>` 标签：定义样式，`scoped` 表示样式仅限当前组件有效；使用深度选择器`:deep()`影响非当前组件所产生的 dom 元素，可使用 `lang` 指定预处理器（如 `less`），通过 `src` 引入外部文件。

### 2. 模版语法

让用户界面渲染和用户交互操作的代码经过一系列编译，生成 html 代码，最终输出到页面。底层实现：将模版编译成 DOM 渲染函数。

#### 2.1 插值（Mustache）表达式

##### （1）文本插值：

- 使用两个大括号`{{}}`包裹
- 使用`v-once`指令，数据改变时，插值内容不会更新

##### （2）原始 html 插值

使用`v-html`指令（容易导致 xss 攻击）

```js
<span v-html="rawhtml"></span>
```

##### （3）属性插值

使用`v-bind`指令

```js
<div v-bind:style="box"></div>
```

##### （4）js 表达式插值

#### 2.2 指令

##### （1）`v-bind`

绑定数据到属性，简写`:[name]`

```js
<img  v-bind:src="url"/>
//可省略v-bind简写
<img  :src="url"/>
```

##### （2）`v-if`, `v-else`, `v-else-if`

条件渲染，根据表达式的值为“真或假”来渲染元素，为 false 时，元素会被摧毁。

```js
<div v-if="type==='A'">A</div>
<div v-else-if="type==='B'">B</div>
<div v-else>C</div>
```

##### （3）`v-show`

控制元素可见性，不同于`v-if`，元素本身不会被销毁。

```js
<div v-show="type==='A'">A</div>
```

##### （4）`v-for`

- 循环渲染，遍历数组或对象
- 遍历对象时，不是按对象定义顺序遍历，想按顺序需转换成数组

```js
<span v-for="(item,index) in list">{{item.msg}}</span>
```

##### （5）`v-on`

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

##### （6）`v-model`

一般用在表单元素上，以便实现双向绑定。

修饰符:

- .lazy: 默认情况下，v-model 会实时同步输入框的值和数据，使用.lazy 修饰符后，在输入框事件触发后再进行值和数据的。实时同步
- .number: 自动将用户的输入值转化为 number 类型
- .trim: 自动过滤用户输入的首尾空格

##### （7）`v-memo`

在列表渲染时，在某种场景下通过新的虚拟 DOM 的创建来提升性能。主要结合 v-for 一起使用。

```js
//当valueA,变化时才会更新div以及子节点
<div v-memo="[valueA,valueB]"></div>
```

##### （8）动态指令

如 `:<attributeName>` 和 `@<eventName>`

```js
<a  :[attributeName]="url" />
<a  @[event]="doSomething" />
```

##### （9）`v-slot`

指定插槽名称。简写“#[slotname]”

## 二、组件

### 1. 生命周期

- `beforeCreate`：实例初始化之后，数据观测和 event/watcher 事件配置之前。无法获取 data 中定义的数据（需通过 this.$options.data 获取）
- `created`：完成初始化工作。可执行一些组件初始化工作，定义变量，发送请求等
- `beforeMount`：渲染前要执行的程序逻辑
- `mounted`：界面渲染完成，可以操作 dom 节点。要确保所有子组件渲染完成在执行操作可以在 mounted 里使用 this.$nextTick
- `beforeUpdate`：数据发生改变时触发
- `updated`：数据更新，界面重新渲染完成后触发
- `beforeUnmount`：组件卸载前触发，还能使用组件实例
- `unmounted`：组件卸载后触发
- `activated`：在 vue-router 的页面被打开时触发
- `deactivated`：在 vue-router 的页面被关闭时触发
- `renderTriggered`：在一个响应式依赖被组件触发了重新渲染后调用。只在开发环境有用
- `renderTracked`：在一个响应式依赖被组件的渲染作用追踪后调用。只在开发环境有用
- `errorCaptured`：捕获当前子孙组件的错误（当前组件报错不触发）。某个子孙组件的 errorCaptured 返回 false 时，不上报错误

### 2. 组件通信

#### 2.1 父组件向子组件通信

（1）`props`

- 父组件向子组件传值
- 单向下行绑定，单向数据流
- 子组件通过 props 接收父组件的值

（2）`$refs`：父组件通过拿到子组件的实例调用子组件方法

#### 2.2 子组件向父组件通信

（1）`$emit`：子组件调用父组件的方法。子组件通过调用 this.$emit 触发父组件的自定义事件，并向该方法传值到父组件。推荐使用这个。

（2）`$parent`：子组件通过$this.parent 获取父组件的实例，调用父组件的方法。

#### 2.3 父子组件双向数据绑定

（1）`v-model`：父组件通过 v-model 传递给子组件

（2）`this.$emit('update:info','newInfo')`：子组件调用次方法触发更，固定写法

#### 2.4 非父子关系组件通信

（1）`兄弟组件`：以父组件为桥梁通信，在子组件使用$emit或$parent 修改父组件的数据

（2）`事件总线EventBus`：

- 定义一个空实例赋值给 Vue.prototype.$EventBus
- this.$EventBus.$on 监听
- this.$EventBus.$emit 触发
- Vue3 已取消这种写法

（3）`mitt`:
第三方总线库，使用起来与 EventBus 类似

```js
const emitter = mitt();
emitter.on("eventBusEvent", (data) => {});
emitter.emit("eventBusEvent", "");
```

#### 2.5 嵌套层级很深的父子组件

（1）provide 提供

（2）inject 注入

### 3. 组件插槽

`<slot>`，组件的一块 HTML 模版

#### 3.1 默认插槽

占坑

```js
<slot></slot>
```

#### 3.2 具名插槽

指定名字

```js
<slot name='one'></slot>
<template v-slot:one>One slot</template>
```

#### 3.3 动态插槽名

动态设置插槽名

```js
<template #[slotname]></template>
```

#### 3.4 插槽后备

设置默认内容，没有提供内容时默认显示

```js
<p>
  <slot>default content</slot>
</p>
```

#### 3.5 作用域插槽

带数据的插槽。把子组件的数据带到父组件使用。

#### 3.6 解构插槽 props

### 4. 动态组件

使用内置组件`<component>`动态挂载不同组件。可以使用内置组件`<keep-alive>`保留各组件状态。

```js
	<component :is="name"></component>
```

### 5. 异步组件

需要时再加载。通过`Vue.defineAsyncComponent({})`，定义异步组件。

`<suspense>`：优化异步加载的载入过程，loading。有两个插槽：

- #default 优先显示，里面内容全部解析完成时显示
- #fallback 加载过程中显示

### 6.teleport 组件

Vue3 新引入的内置组件。主要功能是可以自由定制组件内容将要渲染在页面 DOM 中的位置。

```js
<teleport to="body">...</teleport>//表示渲染都作为body的子级
<teleport to="#some-id">...</teleport>//表示渲染都作为id为some-id的元素的子级
```

两个属性：

- to：将要渲染的节点选择器
- disabled：禁用 teleport 功能

### 7. Mixin 对象

抽离公共组件的逻辑（vue3 有更有方案，组合式 api）。

#### 7.1Mixin 合并

（1）`data函数属性合并`：组件自身的数据优先，覆盖 Mixin

（2）`生命周期钩子合并`：同名时，依次调用，先 mixin，后组件

（3）`methods、components、directive 等值的对象合并`：

- 键名不一样，合并为一个对象
- 键名一样，去组件自身的值

（4）`自定义选项的合并`：默认策略为覆盖已有值。可采用 optionMergeStrategies 配置自定义属性的合并方案

#### 7.2 全局 Mixin

`app.mixin({})`，影响每一个子组件

## 三、组合式 API

逻辑更集中，更原子化，提升代码的可维护性。

### 1. setup(props, context)

组合式 API 的核心方法。组合式 API 的代码逻辑都写在 setup 方法里。返回一个对象，对象中的属性能被 template 访问到。执行时机：在 beforeCreate 之前执行，组件还没实例化。Vue 提供了 getCurrentInstance 方法来访问组件实例的上下文，只能在 setup 或生命周期钩子中调用。

- `props`：响应式父组件传递的数据。是响应式的，不能使用 es6 结构，会破坏 props 的响应式的。可使用`Vue.toRefs(props)`来做结构
- `context`：一个普通的 js 对象，包含`attrs`, `slots`, `emit`等信息。

### 2. 响应式类方法

#### 2.1 Vue.ref()

- 为数据（基本/复杂数据）添加响应式状态
- 获取数据值是需要加.value
- 本质是原始数据的复制，改变简单类型数据的值不会同时改变原始数据
- 推荐定义基本类型
- 递归嵌套监听，监听数据的每一层

#### 2.2 Vue.reactive()

- 为复杂数据添加响应式状态，只支持对象/数组，否则不具有响应式
- 获取数据值不需要加.value
- 本质是原始数据的复制
- ref(obj)等价于 reactive({value: obj})
- 推荐定义复杂类型
- 递归嵌套监听，监听数据的每一层

#### 2.3 Vue.toRef(obj,'')

- 针对单个属性，为原响应式对象上的属性新建单个响应式 ref
- 接收两个参数，愿响应式对象和属性名
- 获取数据值是需要加.value
- 不是原数据的复制，而是引用，会影响原数据
- 原始普通数据单个 ref 改变时，数据会更新，界面不会主动更新

#### 2.4 Vue.toRefs()

- 针对完整对象，将原响应式对象转换为普通对象（可解构，但不丢失响应式）
- 获取数据值是需要加.value
- 直接对 reactive 返回的数据解构会丢失响应，采用 toRefs 包装可避免此问题
- 只接受响应式对象，不接收普通对象，否则会警告

#### 2.5 Vue.shallowRef()

非递归监听，只监听第一层

#### 2.6 Vue.shallowReactive()

非递归监听，只监听第一层

#### 2.7 Vue.triggerRef()

当 shallowRef 深层数据变化不触发更新时，可使用此方法强制更新

#### 2.8 Vue.readonly()

将响应式对象标识成只读，修改时会抛出警告

#### 2.9 Vue.shallowReadonly()

设置第一层只读

#### 2.10 Vue.isReadonly()

判断是否为只读对象

#### 2.11 isRef()

判断是否是 ref 方法返回的对象

#### 2.12 isReactive()

判断是否是 reactive 方法返回的对象

#### 2.13 isProxy()

判断是否是 reactive 方法或 ref 返回的对象

#### 2.14 toRaw()

返回一个响应式对象的原始对象

#### 2.15 makeRaw()

标记并返回一个对象，使其永远不会成为响应式对象

### 3. 监听类方法

#### 3.1 computed()

- 计算属性，与配置式 API 一致。
- 可以接收一个方法或一个对象（对象包含 get 和 set 方法）。

#### 3.2 watchEffect(()=>{})

- 监听响应式对象的改变，参数是一个函数
- 不需要指定监听属性，会自动收集依赖

#### 3.3 watch(state,(newState,prevState)=>{})

- 监听器，对响应式对象的变化进行监听，与配置式 API 一致
- 需要监听特定的数据源，并执行对应的回调函数
- 惰性，监听源发生变化才执行回调
- 可以访问监听状态变化前后的新旧值
- 可监听多个数据源，即第一个参数可以是多个响应式对象的数组
- 第三个参数对象配置 deep:true，完全深度监听

### 4. 生命周期类方法

这些生命周期钩子只能过在 setup 方法内同步使用。

- beforeCreate：使用 setup 方法代替
- created：使用 setup 方法代替
- beforeMount：onBeforeMount
- mounted：onMounted
- beforeUpdate：onBeforeUpdate
- updated：onUpdated
- beforeUnmount：onBeforeUnmount
- unmounted：onUnmounted
- activated：OnActivated
- deactivated：onDeactivated
- renderTriggered：onRenderTriggered
- renderTracked：onRenderTracked
- errorCaptured：onErrorCaptured

### 5. methods 方法

- 可把原本在 methods 定义的在 setup 定义并返回，供模版使用
- 当和 setup 返回的方法同名时，优先使用 setup 里的

### 6. provide/inject

- 可以在 setup 方法中使用，实现跨层级组件通信
- 在组合式 API 中，可在使用 provide 时调用 ref 或 reactive 增加 provide 和 inject 的响应性

### 7.单文件组件`<script setup>`

- 表示使用组合式 API
- 更少的样板内容，更简洁的代码
- 能使用纯 ts 声明 props 和抛出事件
- 更好的运行时性能
- 更好的 IDE 类型推断性能
- `<script setup>`中的代码会被编译成组件 setup 方法中的内容
- 顶层声明的变量，函数，import 的方法组件能在模版中直接使用，相当于自动 return
- 可以使用 defineExpose 明确要暴露的属性
- defineProps：接收父组件传递的数据
- defineEmits：接收父组件传递的 emit
- useSlots：插槽
- useAttrs：属性

## 四、`<transition name="v">`动画组件

### 1. 属性

- enter-from-class：v-enter-from，定义进入过渡的开始状态
- enter-active-class：v-enter-active，定义进入过渡生效时的状态
- enter-to-class：v-enter-to，定义进入过渡的结束状态
- leave-from-class：v-leave-from，定义离开过渡的开始状态
- leave-active-class：v-leave-active，定义离开过渡生效时的状态
- leave-to-class：v-leave-to，定义离开过渡的结束状态
- type 属性：animation 或 transition，设置监听的类型
- :duration：过渡/动画持续时间（毫秒），`:durattion="{enter:500,leave:800}"`

### 2. 钩子函数

- @before-enter
- @enter
- @after-enter
- @before-leave
- @leave
- @after-leave
- @leave-canceled

### 3. 原生支持事件

- transitionend
- animationend

### 4. mode 过渡模式

- in-out：新元素先进行过渡，完成后当前元素过渡离开
- out-in：当前元素先进行过渡，完成后新元素过渡进入

### 5. 多元素/组件过渡

- 设置 key，解决动画不生效问题
- 给 transition 组件设置 mode 过渡模式，解决过渡时元素重叠问题

### 6. 列表数据过渡

- `<transition-group>`：相当于每一项包裹了`<transition>`组件
