# 一文掌握 React Hooks

Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。原理是：闭包+链表

## 一、动机

### 1.1 在组件之间复用状态逻辑很难

可以使用 Hook 从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用。Hook 使你在无需修改组件结构的情况下复用状态逻辑。

### 1.2 复杂组件变得难以理解

Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据），而并非强制按照生命周期划分，还可以使用 reducer 来管理组件的内部状态，使其更加可预测。

### 1.3 难以理解的 class

class 不能很好的压缩，并且会使热重载出现不稳定的情况，Hook 使你在非 class 的情况下可以使用更多的 React 特性

## 二、特性与规则

### 2.1 特性

- Hook 使用了 JavaScript 的闭包机制
- state 存在函数作用域
- hook 本质是 javascript 函数

### 2.2 规则

- 只在最顶层使用 Hook：不要在循环，条件或嵌套函数中调用 Hook，能确保 Hook 在每一次渲染中都按照同样的顺序被调用
- 只在 React 函数中调用 Hook：react 组件函数、自定义 hook

## 三、分类

### 3.1 状态(State Hooks)

- useState：useState Hook 用于在函数组件内部添加状态。它接受一个初始值作为参数，并返回一个包含当前状态和更新状态的函数的数组。
- useReducer：useReducer Hook 提供了一种管理和处理复杂状态的方式，通过创建一个 reducer 函数来处理状态的变化。

### 3.2 上下文(Context Hooks)

- useContext：useContext Hook 允许我们消费 React 上下文，无需通过 Consumer 组件层层传递。

### 3.3 引用(Ref Hooks)

- useRef：可用于获取一个可变的、持久化的对象引用，常用于存储和访问 DOM 节点、跟踪组件内部的状态，而不触发额外的渲染。
- useImperativeHandle：自定义由 ref 暴露出来的句柄。

### 3.4 副作用（Effect Hooks）

- useEffect：处理副作用。
- useLayoutEffect：处理副作用，发生在浏览器重绘前。
- useInsertionEffect：发生更新 dom 节点前（插入静态样式）

### 3.5 性能（Performance Hooks）

- useMemo：缓存结果
- useCallback：缓存一个方法
- useTransition：更新状态但不阻塞 UI
- useDeferredValue：推迟更新不重要的 UI，优先更新其它部分

useTransition 与 useDeferredValue 是与 render 顺序相关的 hooks

### 3.6 其他 hooks

- useDebugValue
- useId
- useSyncExternalStore

## 四、原理

- fiber 节点中，与 hook 有较大关联的是 memoizedState 和 updateQueue 属性
- 函数组件会将内部用到的所有 hook 通过“单向链表”的形式，保存在组件对应的 fiber 节点的 memoizedState 属性上。
- updateQueue 是 useEffect 产生的 effect 连接成的环状单向链表。

### 4.1 hook 数据结构

```js
const hook: Hook = {
  memoizedState: null, // 当前需要保存的值
  baseState: null,
  baseQueue: null, // 由于之前某些高优先级任务导致更新中断，baseQueue 记录的就是尚未处理的最后一个 update
  queue: null, // 内部存储调用 setValue 产生的 update 更新信息，是个环状单向链表
  ...
  next: null, // 下一个hook
};
```

不同类型 hook 的 memoizedState 保存不同类型数据：

1. `useState`：对于 const [state, updateState] = useState(initialState)，memoizedState 保存 state 的值

2. `useEffect`：memoizedState 保存包含 useEffect 回调函数、依赖项等的链表数据结构 effect。effect 链表同时会保存在 fiber.updateQueue 中
3. `useRef`：对于 useRef(1)，memoizedState 保存{current: 1}。
4. `useMemo`：对于 useMemo(callback, [depA])，memoizedState 保存[callback(), depA]
5. `useCallback`：对于 useCallback(callback, [depA])，memoizedState 保存[callback, depA]。
   - 与 useMemo 的区别是，hook 的 memoizedState 存的是当前 hook 自己的值。
   - useCallback 保存的是 callback 函数本身，而 useMemo 保存的是 callback 函数的执行结果。

### 4.2 Hooks 链表创建过程

每个 useXxx 的 hooks 都有 `mountXxx` 和 `updateXxx` 两个阶段。链表只创建一次，在 mountXxx 当中，后面都是 update。

## 五、Hooks 详解

### 5.1 useState

useState Hook 用于在函数组件内部添加状态。它接受一个初始值作为参数，并返回一个包含当前状态和更新状态的函数的数组。

```js
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

返回一个 state，以及更新 state 的函数

- useState 不会自动合并更新对象
- 当调用 state 更新函数，react 将跳过子组件的渲染及 effect 的执行（[Object.is 比较算法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description) ）

**`hooks 链表创建过程：mountState、updateState`**

> （1）mount 时：将初始值存放在 memoizedState 中，queue.pending 用来存调用 setValue（即 dispath）时创建的最后一个 update ，是个环状链表，最终返回一个数组，包含初始值和一个由 dispatchState 创建的函数。

> （2）update 时：可以看到，其实调用的是 updateReducer，只是 reducer 是固定好的，作用就是用来直接执行 setValue（即 dispath） 函数传进来的 action，即 useState 其实是对 useReducer 的一个封装，只是 reducer 函数是预置好的。

**`为什么要是环状链表？`**

> （1）在获取头部或者插入尾部的时候避免不必要的遍历操作(fiber.updateQueue 、 useEffect 创建的 hook 对象中的 memoizedState 存的 effect 环状链表，以及 useState 的 queue.pending 上的 update 对象的环状链表，都是这个原因)

> （2）方便定位到链表的第一个元素。updateQueue 指向它的最后一个 update，updateQueue.next 指向它的第一个 update。

> （3）若不使用环状链表，updateQueue 指向最后一个元素，需要遍历才能获取链表首部。即使将 updateQueue 指向第一个元素，那么新增 update 时仍然要遍历到尾部才能将新增的接入链表。

**`updateReducer 主要工作`**

> （1）将 baseQueue 和 pendingQueue 首尾合并形成新的链表

> (2) baseQueue 为之前因为某些原因导致更新中断从而剩下的 update 链表，pendingQueue 则是本次产生的 update 链表。会把 baseQueue 接在 pendingQueue 前面。

> （3）从 baseQueue.next 开始遍历整个链表执行 update，每次循环产生的 newState，作为下一次的参数，直到遍历完整个链表。即整个合并的链表是先执行上一次更新后再执行新的更新，以此保证更新的先后顺序。

> （4）最后更新 hook 上的参数，返回 state 和 dispatch

**`dispath 调用时做了什么事情？`**

> 主要是执行 dispatchSetState 函数，创建本次更新的 update 对象，计算本地更新后的新值，存储到 update.eagerState 中，并把该 update 和之前该 hook 已经产生的 update 连成环状链表。

### 5.2 useEffect

useEffect Hook 处理副作用，例如订阅数据源、手动更改 DOM、设置定时器等。它接受两个参数：一个执行副作用的回调函数和一个依赖数组。当依赖项发生变化时，或者在组件首次渲染后，该回调函数会被执行。

```jsx
import React, { useState, useEffect } from "react";

function FetchData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://api.example.com/data");
      const json = await response.json();
      setData(json);
    }
    fetchData();
  }, []); // 空数组意味着仅在初次渲染时执行fetch操作

  if (data === null) {
    return <p>Loading...</p>;
  } else {
    return <div>{/* Render data here */}</div>;
  }
}
```

- componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合
- 在 effect 返回一个函数清除副作用
- react 组件可以写多个 effect，但不能写多个类似 componentDidMount 的生命函数
- 赋值给 useEffect 的函数会在组件渲染到屏幕之后执行
- 执行下一个 effect 之前，上一个 effect 会被清除

**`hooks 链表创建过程：mountEffectImpl、updateEffectImpl`**

> （1）useLayoutEffect 在 mount 和 update 这块和 useEffect 差不多

> （2）mount 时和 update 时涉及的主要方法都是 pushEffect，update 时判断依赖是否变化的原理和 useCallback 一致。memoizedState 存的是创建的 effect 对象的环状链表

> （3）pushEffect 的作用：是创建 effect 对象，并将组件内的 effect 对象串成环状单向链表，放到 fiber.updateQueue 上面。即 effect 除了保存在 fiber.memoizedState 对应的 hook 中，还会保存在 fiber 的 updateQueue 中

> （4）updateQueue 的 effect 链表会作为最终被执行的主体，带到 commit 阶段处理。即 fiber.updateQueue 会在本次更新的 commit 阶段中被处理
> （5）useEffect 是异步调度的，而 useLayoutEffect 的 effect 会在 commit 的 layout 阶段同步处理

> （6）useEffect 是异步调度，等页面渲染完成后再去执行，不会阻塞页面渲染

> （7）uselayoutEffect 是在 commit 阶段新的 DOM 准备完成，但还未渲染到屏幕前，同步执行

### 5.3 useContext

useContext Hook 允许我们消费 React 上下文，无需通过 Consumer 组件层层传递。 useContex 读取和订阅 context,向上查找最近的 context provider。接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。

```js
const themes = {
  light: {
    backgroundColor: "#eee",
    color: "#000",
  },
  dark: {
    backgroundColor: "#000",
    color: "#fff",
  },
};

const ThemeContext = React.createContext(themes.dark);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Count />
    </ThemeContext.Provider>
  );
}
function Count(props) {
  const theme = useContext(ThemeContext);
  return (
    <div style={{ backgroundColor: theme.backgroundColor }} className="count">
      <p style={{ color: theme.color }}>You clicked {num}
    </div>
  );
}
```

### 5.4 useReducer

useReducer Hook 提供了一种管理和处理复杂状态的方式，通过创建一个 reducer 函数来处理状态的变化。useState 的替代方案。它接收一个形如 (state, action) => newState 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法。

```jsx
function Demo() {
  function reducer(state, action) {
    switch (action.type) {
      case "incremented_age":
        return {
          age: state.age + 1,
        };
      case "change_name":
        return {
          ...state,
          name: action.name,
        };

      default:
        throw Error("Unknown action:" + action.type);
        break;
    }
  }

  const [state, dispatch] = useReducer(reducer, { age: 20, name: "mo" });

  return (
    <div
      onClick={() => {
        dispatch({ type: "incremented_age" });
      }}
    >
      increment age
    </div>
  );
}
```

### 5.5 useCallback

useCallback 用于缓存 memoized 回调函数，确保给定相同的输入时总是返回同一个引用，有助于避免不必要的子组件重新渲染。返回一个 memoized 回调函数，该回调函数仅在某个依赖项改变时才会更新。

- useCallback(fn, deps) 相当于 useMemo(() => fn, deps)

```js
import React, { useCallback } from "react";

function ParentComponent() {
  const handleItemClick = useCallback((id) => {
    console.log("Item with id:", id);
  }, []); // 空数组表示依赖项为空，只有在父组件第一次渲染时计算handleItemClick

  return <ChildComponent onItemClick={handleItemClick} />;
}
```

**`hooks 链表创建过程：mountCallback、updateCallback`**

> （1）mount 时：在 memorizedState 上放了一个数组，第一个元素是传入的回调函数，第二个是传入的 deps

> （2）update 时：更新的时候把之前的那个 memorizedState 取出来，和新传入的 deps 做下对比，如果没变，那就返回之前的回调函数，否则返回新传入的函数

> （3）比对是依赖项是否一致的时候，用的是 Object.is：Object.is() 与 === 不相同。差别是它们对待有符号的零和 NaN 不同，例如，=== 运算符（也包括 == 运算符）将数字 -0 和 +0 视为相等，而将 Number.NaN

> （4）Object.is(-0,+0);//false -0===+0;//true

> （5）Object.is(NaN,NaN);//true NaN === NaN;//false

### 5.6 useMome

useMemo 则是用于缓存计算结果，当依赖项没有变化时返回之前的计算结果，提高性能。
返回一个 memoized 值，它仅会在某个依赖项改变时才重新计算 memoized 值

- 如果在渲染期间执行了高开销的计算，则可以使用 useMemo 来进行优化

```js
import React, { useMemo } from "react";

function List({ items }) {
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.value - b.value);
  }, [items]); // 当items数组变化时才重新排序

  return (
    <ul>
      {sortedItems.map((item) => (
        <li key={item.id}>{item.value}</li>
      ))}
    </ul>
  );
}
```

- 可以减少不必要的循环和不必要的渲染
- 可以减少子组件的渲染次数
- 通过特地的依赖进行更新，可以避免很多不必要的开销，但要注意，有时候在配合 useState 拿不到最新的值，这种情况可以考虑使用 useRef 解决
- useMemo 返回的是函数运行的结果，而 useCallback 返回的是函数

**`_hooks 链表创建过程：mountMemo、updateMemo_`**

> （1）mount 时：在 memorizedState 上放了个数组，第一个元素是传入函数的执行结果，第二个元素是 deps

> （2）update 时：取出之前的 memorizedState，和新传入的 deps 做下对比，如果没变，就返回之前的值。如果变了，创建一个新的数组放在 memorizedState，第一个元素是新传入函数的执行结果，第二个元素是 deps

### 5.7 useRef

（1）useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内持续存在。

- 可以保存任何可变值
- 创建的是一个普通 Javascript 对象
- useRef 会在每次渲染时返回同一个 ref 对象
- 变更 .current 属性不会引发组件重新渲染

```ts
const refContainer = useRef(initialValue);
```

（2）它能让你引用一个不需要渲染的值，返回一个对象，current 属性表示当前值，修改 ref.current 改变值，在后续的渲染中，useReft 将返回同一个对象，当你改变 ref.current 属性时，React 不会重新渲染你的组件。React 不知道你何时改变它，因为 ref 是一个普通的 JavaScript 对象。除了 初始化 外不要在渲染期间写入 或者读取 ref.current。这会使你的组件的行为不可预测。

```js
//引用一个值
const intervalRef = useRef(0);
//引用Dom
const inputRef = useRef(null);
//改变 ref 不会触发重新渲染。
intervalRef.current = 1;
```

（3）hooks 链表创建过程：mountRef、updateRef

- mount 时：把传进来的 value 包装成一个含有 current 属性的对象，然后放在 memorizedState 属性上。
- update 时：直接返回，没做特殊处理

### 5.8 useImperativeHandle

- 自定义由 ref 暴露出来的句柄。
- 使用方法：向父组件暴露一个自定义的 ref 句柄；暴露你自己的命令式方法。 在组件顶层通过调用 useImperativeHandle 来自定义 ref 暴露出来的句柄：
- 在使用 ref 时自定义暴露给父组件的实例值；useImperativeHandle 应当与 forwardRef

```ts
function FancInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));
  return <input ref={inputRef} />;
}
FancyInput = forwardRef(FancyInput);
```

### 5.9 useLayoutEffect

在所有的 DOM 变更之后同步调用 effect，可以使用它来读取 DOM 布局并同步触发重渲染，在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新

useLayoutEffect 与 componentDidMount、componentDidUpdate 的调用阶段是一样的

### 5.10 useDebugValue

可用于在 React 开发者工具中显示自定义 hook 的标签

```ts
useDebugValue(date, (date) => date.toDateString());
```

### 5.11 useDeferedValue

> useDeferredValue is a React Hook that lets you defer updating a part of the UI.

```js
const deferredValue = useDeferredValue(value);
```

- useDeferredValue 的作用是将某个值的更新推迟到未来的某个时间片内执行，从而避免不必要的重复渲染和性能开销。
- useDeferredValue 是一个用于控制组件更新优先级的 Hook。它可以让我们将某个值的更新推迟到更合适的时机，从而避免在高优先级任务执行期间进行不必要的渲染。相当于节流？
- useDeferredValue 的实现首先是判断当前更新的优先级，如果是一个紧急更新则直接返回 prevValue，并且在当前 fiber 中标记一个 transition 更新。当非紧急更新发生时，直接返回最新的值。

**`使用场景`**

1. 用户输入：在处理实时搜索、自动完成等与用户输入相关的功能时，我们可以使用 useDeferredValue 来确保输入框在用户输入过程中保持流畅，同时在合适的时机更新相关组件。

2. 列表和大型数据集：当需要处理大量数据时，useDeferredValue 可以帮助我们控制渲染的优先级，从而避免阻塞用户界面。例如，在分页加载数据的情况下，我们可以使用 useDeferredValue 在高优先级任务完成后再更新数据列表。

### 5.12 useTransition

> useTransition is a React Hook that lets you update the state without blocking the UI.

- useTransition，它可以将多个版本的更新打包到一起，在未来的某一帧空闲时间内执行，从而优化应用的性能和响应时间。
- useTransition 是一个用于处理渲染过程中的状态转换的 Hook。它可以让我们在组件更新时添加一个延迟，以便在完成数据加载之前保持用户界面的稳定性。在数据加载完成后，React 会将组件更新为最新状态。
  相当于 loading?
- useTransition 的核心其实就是通过 useState 维护了一个 pending，然后将 setPending 作为参数传递给 startTransition。

```js
function TabContainer() {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState("about");

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }
  // ...
}
```

### 5.13 useId

useId 是一个新的 hook，用于在客户端和服务器上生成唯一 ID，同时避免 hydration mismatches。

### 5.14 useSyncExternalStore

- useSyncExternalStore 是由 useMutableSource 改变而来，主要用来解决外部数据 tear（撕裂）问题。
- useSyncExternalStore 旨在供库使用，而不是应用程序代码。

### 5.15 useInsertionEffect

useInsertionEffect 是一个新的钩子，它允许 CSS-in-JS 库解决在渲染中注入样式的性能问题。 这个 Hooks 执行时机在 DOM 生成之后，useLayoutEffect 之前，它的工作原理大致和 useLayoutEffect 相同，只是此时无法访问 DOM 节点的引用，一般用于提前注入 <style> 脚本。

**`使用场景`**

数据加载：在数据加载过程中，我们可以使用 useTransition 在更新 UI 之前显示一个加载指示器，从而优化用户体验。 2.动画和过渡效果：在组件状态更新时，useTransition 可以让我们更好地控制动画和过渡效果的触发时机。

## 六、Q&A

### 1.effect 中如何获取最新的值？

> 每次我们重新渲染，都会生成新的 effect，替换掉之前的；effect 更像是渲染结果的一部分 —— 每个 effect “属于”一次特定的渲染; React 会在执行当前 effect 之前对上一个 effect 进行清除

### 2.为什么要在 effect 中返回一个函数？

> 这是 effect 可选的清除机制。每个 effect 都可以返回一个清除函数

### 3.React 何时清除 effect？

> React 会在组件卸载的时候执行清除操作。

### 4.在两个组件中使用相同的 Hook 会共享 state 吗？

> 不会。自定义 Hook 是一种重用状态逻辑的机制(例如设置为订阅并存储当前值)，所以每次使用自定义 Hook 时，其中的所有 state 和副作用都是完全隔离的。

### 5.Hook 能否覆盖 class 的所有使用场景？

> 目前暂时还没有对应不常用的 getSnapshotBeforeUpdate，getDerivedStateFromError 和 componentDidCatch 生命周期的 Hook 等价写法

### 6.为什么不能在循环、条件或嵌套函数中调用 Hooks？

> (1)各个 hook 在 mount 时会以链表的形式挂到 fiber.memoizedState 上
> (2)update 时会进入到 HooksDispatcherOnUpdateInDEV，执行不同 hook 的 updateXxx 方法
> (3)通过 updateWorkInProgressHook 方法获取当前 hook 的对象，获取方式就是从当前 fiber.memoizedState 上依次获取，遍历的是 mount 阶段创建的链表，故不能改变 hook 的执行顺序，否则会拿错。（updateWorkInProgressHook 也是个通用方法，updateXXX 都是走到这个地方）

### 7.对于设置了 ref 的节点，什么时候 ref 值会更新？

> 组件在 commit 阶段的 mutation 阶段执行 DOM 操作，所以对应 ref 的更新也是发生在 mutation 阶段

### 8.为什么如果不把依赖放到 deps，useEffect 回调执行的时候拿的会是旧值？

> 从 updateEffectImpl 的逻辑可以看出来，effect 对象只有在 deps 变化的时候才会重新生成，也就保证了，如果不把依赖的数据放到 deps 里面，用的 effect.create 还是上次更新时的回调，函数内部用到的依赖自然就还是上次更新时的。即不是 useEffect 特意将回调函数内部用到的依赖存下来，而是因为，用的回调函数就是上一次的，自然也是从上一次的上下文中取依赖值，除非把依赖加到 deps 中，重新获取回调函数。
> 依照这个处理方式也就能了解到：对于拿对象里面的值的情况，如果对象放在组件外部，或者是通过 useRef 存储，即使没有把对象放到 deps 当中，也能拿到最新的值，因为 effect.create 拿的只是对象的引用，只要对象的引用本身没变就行。

### 9.useDeferredValue 与 useTransition 的区别

```js
import { useTransition, useDeferredValue } from "react";
const [isPending, startTransition] = useTransition();
const deferredValue = useDeferredValue(value);
return isPending && <Spin />;
```

- 相同：useDeferredValue 本质上和内部实现与 useTransition 一样都是标记成了非紧急更新任务。
- 不同：useTransition 是把更新任务变成了延迟更新任务，而 useDeferredValue 是产生一个新的值，这个值作为延时状态。

`同 debounce 的区别：`

debounce 即 setTimeout 总是会有一个固定的延迟，而 useDeferredValue 的值只会在渲染耗费的时间下滞后，在性能好的机器上，延迟会变少，反之则变长。

### 10.useEffect 拿到最新 state 的方法

- 在第二个参数添加 state 的依赖监听
- setState 中写成回调函数形式，可以取到最新的 state, 回调函数中 return 的返回值即最新的 state 值
- useRef 保存值。直接写在组件内部的对象，组件每次渲染都会生成一个和之前不一样的对象，useRef 对象，可以确保组件每次渲染取到的都是同一个对象

## 七、文档

- [React Hooks API Reference](https://zh-hans.react.dev/reference/react/hooks)
- [ahooks](https://ahooks.js.org/zh-CN)
