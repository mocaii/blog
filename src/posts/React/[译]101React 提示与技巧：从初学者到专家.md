# [译]101React 提示与技巧：从初学者到专家

原文：[101 React Tips & Tricks For Beginners To Experts](https://dev.to/_ndeyefatoudiop/101-react-tips-tricks-for-beginners-to-experts-4m11)

注意：

- 本指南假定您对 React 有基本了解，并了解 props、state、context 等术语。
- 我尝试在大多数示例中使用 Vanilla JS 以保持简单。如果您使用的是 TypeScript，则可以轻松调整代码。
- 该代码尚未准备好投入生产。请自行决定使用。

## 分类 一、组件组织 🧹

### 1.使用自闭合标签来保持代码紧凑

```tsx
// ❌ Bad: too verbose 太冗长
<MyComponent></MyComponent>

// ✅ Good
<MyComponent/>
```

### 2.优先使用`fragments`而非 DOM 节点（如 div、span 等）来组合元素

在 React 中，每个组件都必须返回一个单一元素。为了避免在<div>或<span>中包装多个元素，可以使用<Fragment>来保持你的 DOM 整洁有序。

❌ Bad：使用<div>会使你的 DOM 变得杂乱无章，并可能需要更多的 CSS 代码。

```tsx
function Dashboard() {
  return (
    <div>
      <Header />
      <Main />
    </div>
  );
}
```

✅ Good: <Fragment> 包裹元素而不影响 DOM 结构。

```tsx
function Dashboard() {
  return (
    <Fragment>
      <Header />
      <Main />
    </Fragment>
  );
}
```

### 3.使用 React fragment 简写`<></>`（除非你需要设置一个 key）

❌ Bad：下面的代码过于冗长。

```tsx
<Fragment>
  <FirstChild />
  <SecondChild />
</Fragment>
```

✅ Good：除非你需要一个 key，否则<>更简洁。

```tsx
<>
  <FirstChild />
  <SecondChild />
</>;

// Using a `Fragment` here is required because of the key.当需要设置key时才使用Fragment
function List({ users }) {
  return (
    <div>
      {users.map((user) => (
        <Fragment key={user.id}>
          <span>{user.name}</span>
          <span>{user.occupation}</span>
        </Fragment>
      ))}
    </div>
  );
}
```

### 4.倾向于传递属性而不是单独访问每一个

❌ Bad：下面的代码更难阅读（尤其是规模较大时）。

```tsx
// We do `props…` all over the code. 我们总是直接使用props
function TodoList(props) {
  return (
    <div>
      {props.todos.map((todo) => (
        <div key={todo}>
          <button
            onClick={() => props.onSelectTodo(todo)}
            style={{
              backgroundColor: todo === props.selectedTodo ? "gold" : undefined,
            }}
          >
            <span>{todo}</span>
          </button>
        </div>
      ))}
    </div>
  );
}
```

✅ Good：下面的代码更简洁。

```tsx
function TodoList({ todos, selectedTodo, onSelectTodo }) {
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo}>
          <button
            onClick={() => onSelectTodo(todo)}
            style={{
              backgroundColor: todo === selectedTodo ? "gold" : undefined,
            }}
          >
            <span>{todo}</span>
          </button>
        </div>
      ))}
    </div>
  );
}
```

### 5.在为属性（props）设置默认值时，请在解构它们的同时进行

❌ Bad：您可能需要在多个地方定义默认值，并引入新的变量。

```tsx
function Button({ onClick, text, small, colorScheme }) {
  let scheme = colorScheme || "light";
  let isSmall = small || false;
  return (
    <button
      onClick={onClick}
      style={{
        color: scheme === "dark" ? "white" : "black",
        fontSize: isSmall ? "12px" : "16px",
      }}
    >
      {text ?? "Click here"}
    </button>
  );
}
```

✅ Good: 您可以在顶部的一个地方设置所有默认值。这使得其他人很容易找到它们。

```tsx
function Button({ onClick, text = "Click here", small = false, colorScheme = "light" }) {
  return (
    <button
      onClick={onClick}
      style={{
        color: colorScheme === "dark" ? "white" : "black",
        fontSize: small ? "12px" : "16px",
      }}
    >
      {text}
    </button>
  );
}
```

### 6.在传递字符串类型属性时省略花括号。

```tsx
// ❌ Bad: curly braces are not needed 不需要花括号
<Button text={"Click me"} colorScheme={"dark"} />

// ✅ Good
<Button text="Click me" colorScheme="dark" />
```

### 7.在使用 `value && <Component {...props}/>` 之前，请确保 value 是一个布尔值，以防止在屏幕上显示意外的值。

❌ Bad：当列表为空时，屏幕上将打印出 0。

```tsx
export function ListWrapper({ items, selectedItem, setSelectedItem }) {
  return (
    <div className="list">
      {items.length && ( // `0` if the list is empty
        <List items={items} onSelectItem={setSelectedItem} selectedItem={selectedItem} />
      )}
    </div>
  );
}
```

✅ Good: 当没有项目时，屏幕上不会打印任何内容。

```tsx
export function ListWrapper({ items, selectedItem, setSelectedItem }) {
  return (
    <div className="list">
      {items.length > 0 && ( //或 !!items.length
        <List items={items} onSelectItem={setSelectedItem} selectedItem={selectedItem} />
      )}
    </div>
  );
}
```

### 8.使用函数（无论是否为内联函数）来避免使用中间变量污染作用域

❌ Bad：变量 `gradeSum` 和 `gradeCount` 正在使组件的作用域变得杂乱无章

```tsx
function Grade({ grades }) {
  if (grades.length === 0) {
    return <>No grades available.</>;
  }

  let gradeSum = 0;
  let gradeCount = 0;

  grades.forEach((grade) => {
    gradeCount++;
    gradeSum += grade;
  });

  const averageGrade = gradeSum / gradeCount;

  return <>Average Grade: {averageGrade}</>;
}
```

✅ Good: 变量 `gradeSum` 和 `gradeCount` 的作用域在 `computeAverageGrade` 函数内部。

```tsx
function Grade({ grades }) {
  if (grades.length === 0) {
    return <>No grades available.</>;
  }

  const computeAverageGrade = () => {
    let gradeSum = 0;
    let gradeCount = 0;
    grades.forEach((grade) => {
      gradeCount++;
      gradeSum += grade;
    });
    return gradeSum / gradeCount;
  };

  return <>Average Grade: {computeAverageGrade()}</>;
}
```

💡 注意：你也可以在组件外部定义一个 `computeAverageGrade` 函数，并在组件内部调用它。

### 9.使用柯里化函数来复用逻辑（并适当缓存回调函数）

❌ Bad：更新字段的逻辑非常重复。

```tsx
function Form() {
  const [{ name, email }, setFormState] = useState({
    name: "",
    email: "",
  });

  return (
    <>
      <h1>Class Registration Form</h1>
      <form>
        <label>
          Name:{" "}
          <input
            type="text"
            value={name}
            onChange={(evt) =>
              setFormState((formState) => ({
                ...formState,
                name: evt.target.value,
              }))
            }
          />
        </label>
        <label>
          Email:{" "}
          <input
            type="email"
            value={email}
            onChange={(evt) =>
              setFormState((formState) => ({
                ...formState,
                email: evt.target.value,
              }))
            }
          />
        </label>
      </form>
    </>
  );
}
```

✅ Good：引入 `createFormValueChangeHandler`，为每个字段返回正确的处理程序。

注意：如果你开启了 ESLint 规则 [jsx-no-bind](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)，这个技巧尤其有用。你只需将柯里化函数包裹在 useCallback 中，然后“Voilà!”（法语，意为“瞧！”）就完成了。

```tsx
function Form() {
  const [{ name, email }, setFormState] = useState({
    name: "",
    email: "",
  });

  const createFormValueChangeHandler = (field) => {
    return (event) => {
      setFormState((formState) => ({
        ...formState,
        [field]: event.target.value,
      }));
    };
  };

  return (
    <>
      <h1>Class Registration Form</h1>
      <form>
        <label>
          Name: <input type="text" value={name} onChange={createFormValueChangeHandler("name")} />
        </label>
        <label>
          Email:{" "}
          <input type="email" value={email} onChange={createFormValueChangeHandler("email")} />
        </label>
      </form>
    </>
  );
}
```

### 10.将不依赖于组件的 props/state 的数据移出组件外部，以获得更整洁（和更高效）的代码

❌ Bad：`OPTIONS` 和 `renderOption` 不需要放在组件内部，因为它们不依赖于任何 props 或 state。

此外，将它们保留在组件内部意味着每次组件渲染时我们都会获得新的对象引用。如果我们将 `renderOption` 传递给被 `memo` 包裹的子组件，它会破坏 memo 化。

```tsx
function CoursesSelector() {
  const OPTIONS = ["Maths", "Literature", "History"];
  const renderOption = (option: string) => {
    return <option>{option}</option>;
  };

  return (
    <select>
      {OPTIONS.map((opt) => (
        <Fragment key={opt}>{renderOption(opt)}</Fragment>
      ))}
    </select>
  );
}
```

✅ Good：将它们移出组件以保持组件的清洁和引用的稳定性。

```tsx
const OPTIONS = ["Maths", "Literature", "History"];
const renderOption = (option: string) => {
  return <option>{option}</option>;
};

function CoursesSelector() {
  return (
    <select>
      {OPTIONS.map((opt) => (
        <Fragment key={opt}>{renderOption(opt)}</Fragment>
      ))}
    </select>
  );
}
```

💡 注意：在此示例中，您可以通过使用内联 option 元素进一步简化。

```tsx
const OPTIONS = ["Maths", "Literature", "History"];

function CoursesSelector() {
  return (
    <select>
      {OPTIONS.map((opt) => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
  );
}
```

### 11.当从列表中存储选定项时，存储项 ID 而不是整个项

❌ Bad：如果选定了一个项，但随后该项发生变化（即，我们收到相同 ID 的完全不同的对象引用），或者如果该项不再存在于列表中，则 selectedItem 将保留过时的值或变得不正确。

```tsx
function ListWrapper({ items }) {
  // We are referencing the entire item 引用了整个item
  const [selectedItem, setSelectedItem] = useState<Item | undefined>();

  return (
    <>
      {selectedItem != null && <div>{selectedItem.name}</div>}
      <List items={items} selectedItem={selectedItem} onSelectItem={setSelectedItem} />
    </>
  );
}
```

✅ Good：我们通过其 ID（应该是稳定的）来存储选定的项目。这确保了即使项目从列表中删除或其属性之一发生更改，用户界面也应该是正确的。

```tsx
function ListWrapper({ items }) {
  const [selectedItemId, setSelectedItemId] = useState<number | undefined>();
  // We derive the selected item from the list
  const selectedItem = items.find((item) => item.id === selectedItemId);

  return (
    <>
      {selectedItem != null && <div>{selectedItem.name}</div>}
      <List items={items} selectedItemId={selectedItemId} onSelectItem={setSelectedItemId} />
    </>
  );
}
```

### 12.如果你在做某事之前经常检查一个属性的值，请引入一个新的组件

❌ Bad：由于所有的 `user == null` 检查，代码显得杂乱无章。
在这里，由于[hooks 的规则](https://react.dev/warnings/invalid-hook-call-warning)，我们不能提前返回。

```tsx
function Posts({ user }) {
  // Due to the rules of hooks, `posts` and `handlePostSelect` must be declared before the `if` statement.
  // 因为hooks的规则，`posts`和`handlePostSelect`必须在if语句之前声明。
  const posts = useMemo(() => {
    if (user == null) {
      return [];
    }
    return getUserPosts(user.id);
  }, [user]);

  const handlePostSelect = useCallback(
    (postId) => {
      if (user == null) {
        return;
      }
      // TODO: Do something
    },
    [user]
  );

  if (user == null) {
    return null;
  }

  return (
    <div>
      {posts.map((post) => (
        <button key={post.id} onClick={() => handlePostSelect(post.id)}>
          {post.title}
        </button>
      ))}
    </div>
  );
}
```

✅ Good：我们通过引入一个新的组件`UserPosts`，它针对特定用户，并且更加简洁。

```tsx
function Posts({ user }) {
  if (user == null) {
    return null;
  }

  return <UserPosts user={user} />;
}

function UserPosts({ user }) {
  const posts = useMemo(() => getUserPosts(user.id), [user.id]);

  const handlePostSelect = useCallback(
    (postId) => {
      // TODO: Do something
    },
    [user]
  );

  return (
    <div>
      {posts.map((post) => (
        <button key={post.id} onClick={() => handlePostSelect(post.id)}>
          {post.title}
        </button>
      ))}
    </div>
  );
}
```

### 13.使用 CSS 的`:empty` 伪类来隐藏没有子元素的元素

在下面的例子中 👇，一个包装器接收子元素并在它们周围添加一个红色边框。

```tsx
function PostWrapper({ children }) {
  return <div className="posts-wrapper">{children}</div>;
}
```

```css
.posts-wrapper {
  border: solid 1px red;
}
```

❌ 问题：即使子元素为空（即等于 null、undefined 等），边框仍然显示在屏幕上。
![13](https://media.dev.to/cdn-cgi/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fyq53ai7xzx200bxreer2.png)

✅ 解决方案：使用:empty CSS 伪类来确保当包装器为空时不显示它。

```css
.posts-wrapper:empty {
  display: none;
}
```

### 14.在组件的顶部收集所有状态 state 和上下文 context

当所有 state 和 context 都位于顶部时，很容易发现哪些可以触发组件重新渲染。

❌ Bad：状态和上下文分散，难以追踪。

```tsx
function App() {
  const [email, setEmail] = useState("");
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const [password, setPassword] = useState("");
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const theme = useContext(ThemeContext);

  return (
    <div className={`App ${theme}`}>
      <h1>Welcome</h1>
      <p>
        Email: <input type="email" value={email} onChange={onEmailChange} />
      </p>
      <p>
        Password: <input type="password" value={password} onChange={onPasswordChange} />
      </p>
    </div>
  );
}
```

✅ Good：所有的状态和上下文都集中在顶部，易于识别。

```tsx
function App() {
  const theme = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className={`App ${theme}`}>
      <h1>Welcome</h1>
      <p>
        Email: <input type="email" value={email} onChange={onEmailChange} />
      </p>
      <p>
        Password: <input type="password" value={password} onChange={onPasswordChange} />
      </p>
    </div>
  );
}
```

## 分类 二、有效的设计模式与技术 🛠️

### 15.利用 `children` 属性进行更清晰的代码编写（并提升性能）

使用 children 属性有几个好处：

- 好处 #1：您可以通过直接将属性传递给子组件，而非通过父组件进行路由传递，从而避免属性穿透问题。
- 好处 #2：您的代码更加可扩展，因为您可以轻松地修改子组件而无需更改父组件。
- 好处 #3：您可以使用此技巧来避免重新渲染“慢速”组件（请参阅下面的示例 👇）。

❌ Bad：每当`Dashboard`渲染时，`MyVerySlowComponent` 都会渲染，而 `Dashboard` 每次更新时间时都会渲染。您可以在下一张图片中看到，我使用了 [React Developer Tool's profiler](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)。

```tsx
function App() {
  // Some other logic…
  return <Dashboard />;
}

function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1_000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <h1>{currentTime.toTimeString()}</h1>
      <MyVerySlowComponent /> {/* Renders whenever `Dashboard` renders */}
    </>
  );
}
```

每当 `Dashboard` 渲染时，`MyVerySlowComponent` 都会重新渲染：

![15](https://media.dev.to/cdn-cgi/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fptrvtuiuhptr2adq9ica.gif)

✅ Good：当 `Dashboard` `渲染时，MyVerySlowComponent` 不会渲染。

```tsx
function App() {
  return (
    <Dashboard>
      <MyVerySlowComponent />
    </Dashboard>
  );
}

function Dashboard({ children }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1_000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <h1>{currentTime.toTimeString()}</h1>
      {children}
    </>
  );
}
```

`MyVerySlowComponent` 不再重新渲染：
![15-2](https://media.dev.to/cdn-cgi/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F480znnhi87gws2u9qmuf.gif)

### 16.使用`compound components`复合组件构建可组合代码

将复合组件视为乐高积木。
您可以将它们组合在一起以创建自定义的 UI。这些组件在创建库时效果特别好，从而生成既有表现力又可高度扩展的代码。
您可以在此处进一步探索此模式 👉 [复合模式](https://www.patterns.dev/react/compound-pattern/)
[reach.ui](https://reach.tech/menu-button/) 中的示例（菜单、菜单按钮、菜单列表、菜单链接是复合组件）

```tsx
<Menu>
  <MenuButton>
    Actions <span aria-hidden>▾</span>
  </MenuButton>
  <MenuList>
    <MenuItem onSelect={() => alert("Download")}>Download</MenuItem>
    <MenuItem onSelect={() => alert("Copy")}>Create a Copy</MenuItem>
    <MenuLink as="a" href="https://reacttraining.com/workshops/">
      Attend a Workshop
    </MenuLink>
  </MenuList>
</Menu>
```

### 17.使用`render functions`渲染函数或`component functions`组件函数属性使您的代码更具可扩展性

假设我们想显示各种列表，如消息、个人资料或帖子，并且每个列表都应该是可排序的。

为了实现这一点，我们引入了一个可重用的 `List` 组件。我们可以通过以下两种方式来实现：
s
❌ Bad：方式 1
`List`处理每个项目的渲染以及它们的排序方式。这有问题，因为它违反了开放封闭原则[Open Closed Principle](https://www.freecodecamp.org/news/open-closed-principle-solid-architecture-concept-explained/#whatistheopenclosedprinciple)。每当添加新的项目类型时，此代码都将被修改。

✅ 很好：方式 2
`List`接受渲染函数或组件函数，只在需要时调用它们。

您可以在下面的 sandbox 中找到一个示例 👇：[🏖 Sandbox](https://codesandbox.io/p/sandbox/nice-feistel-7yd768?file=%2Fsrc%2FList.tsx%3A15%2C3-15%2C15&from-embed=)

### 18.处理不同案例时，使用 `value === case && <Component />`来避免保留旧状态

❌ 问题：在下面的 sandbox 示例中，在`Posts` 和 `Snippets`之间切换时，计数器不会重置。这是因为当渲染相同组件时，其状态在类型更改时保持不变。
[🏖 Sandbox](https://codesandbox.io/p/sandbox/counter-zrl9pf?file=%2Fsrc%2FNavbar.tsx&from-embed=)

✅ 解决方案：根据 `selectedType` 渲染组件，或者使用 key 在类型更改时强制重置。

```tsx
function App() {
  const [selectedType, setSelectedType] = useState<ResourceType>("posts");
  return (
    <>
      <Navbar selectedType={selectedType} onSelectType={setSelectedType} />
      {selectedType === "posts" && <Resource type="posts" />}
      {selectedType === "snippets" && <Resource type="snippets" />}
    </>
  );
}

// We use the `selectedType` as a key
function App() {
  const [selectedType, setSelectedType] = useState<ResourceType>("posts");
  return (
    <>
      <Navbar selectedType={selectedType} onSelectType={setSelectedType} />
      <Resource type={selectedType} key={selectedType} />
    </>
  );
}
```

### 19.总是使用错误边界 error boundaries

默认情况下，如果应用程序在渲染过程中遇到错误，整个用户界面会崩溃 💥。

为了防止这种情况，请使用[错误边界](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)来：

- 即使发生错误，也能保持应用程序的部分功能。
- 显示用户友好的错误消息，并可选地跟踪错误。

💡 提示：您可以使用 [react-error-boundary](https://www.npmjs.com/package/react-error-boundary) 库。

## 分类 三、Keys 与 Refs 🗝️

### 20.使用 `crypto.randomUUID` 或 `Math.random` 生成 keys

`map() `调用中的 JSX 元素总是需要 key。

假设你的元素还没有 key。在这种情况下，您可以使用 `crypto.randomUUID`、`Math.random` 或 [uuid](https://www.npmjs.com/package/uuid) 库生成唯一 ID。

> 注意：`crypto.randomUUID` 在旧版浏览器中未定义。

### 21.确保您的列表项 ID 稳定（即它们每次渲染不会更改）

keys/ID 应尽可能稳定。
否则，React 可能会无用地重新渲染一些组件，或者选择将不再有效，就像下面的例子一样。
❌ Bad:`electedQuoteId` 每当 `App` 渲染时都会更改，因此永远不会有有效的选择。

```tsx
function App() {
  const [quotes, setQuotes] = useState([]);
  const [selectedQuoteId, setSelectedQuoteId] = useState(undefined);

  // Fetch quotes
  useEffect(() => {
    const loadQuotes = () =>
      fetchQuotes().then((result) => {
        setQuotes(result);
      });
    loadQuotes();
  }, []);

  // Add ids: this is bad!!! electedQuoteId will change every time the App renders
  const quotesWithIds = quotes.map((quote) => ({
    value: quote,
    id: crypto.randomUUID(),
  }));

  return (
    <List
      items={quotesWithIds}
      selectedItemId={selectedQuoteId}
      onSelectItem={setSelectedQuoteId}
    />
  );
}
```

✅ Good:当我们获取 Quotes 时，将添加 IDs。

```tsx
function App() {
  const [quotes, setQuotes] = useState([]);
  const [selectedQuoteId, setSelectedQuoteId] = useState(undefined);

  // Fetch quotes and save with ID
  useEffect(() => {
    const loadQuotes = () =>
      fetchQuotes().then((result) => {
        // We add the `ids` as soon as we get the results
        setQuotes(
          result.map((quote) => ({
            value: quote,
            id: crypto.randomUUID(),
          }))
        );
      });
    loadQuotes();
  }, []);

  return <List items={quotes} selectedItemId={selectedQuoteId} onSelectItem={setSelectedQuoteId} />;
}
```

### 22.策略性地使用 key 属性来触发组件重新渲染

想要强制组件从头开始重新渲染？只需更改其 key。
在下面的示例中，我们使用此技巧在切换到新选项卡时重置错误边界。
[🏖 Sandbox](https://stackblitz.com/edit/using-key-react?file=src%2FApp.tsx)

### 23.将 `ref callback function` 用于监控大小变化和管理多个节点元素等任务。

您知道可以将函数传递给 `ref` 属性而不是 ref 对象吗？
以下是它的工作原理：

- 当 DOM 节点被添加到屏幕时，React 会以 DOM 节点作为参数调用该函数。
- 当 DOM 节点被删除时，React 会使用 `null` 调用该函数。

在下面的示例中，我们使用此提示跳过 `useEffect`

❌ Before: 使用 useEffect 聚焦输入

```tsx
function App() {
  const ref = useCallback((inputNode) => {
    inputNode?.focus();
  }, []);

  return <input ref={ref} type="text" />;
}
```

✅ After: 一旦输入可用，我们就会立即关注它。

```tsx
function App() {
  const ref = useCallback((inputNode) => {
    inputNode?.focus();
  }, []);

  return <input ref={ref} type="text" />;
}
```

## 分类 四、组织 React 代码 🧩

### 24.将 React 组件与其资产（例如样式、图像等）放在一起

始终保持每个 React 组件包含相关资源，例如样式和图像。

- 这样可以在不再需要组件时更轻松地删除它们。
- 它还简化了代码导航，因为您需要的一切都在一个地方。
  ![image](https://media.dev.to/cdn-cgi/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Faqi13ygqu2hw2myf0u1h.png)

### 25.限制组件文件大小

包含大量组件和导出的大文件可能会令人困惑。
此外，随着添加更多内容，它们往往会变得更大。
因此，请以合理的文件大小为目标，并在合理时将组件拆分为单独的文件。

### 26.限制函数组件文件中的 return 语句数量

函数式组件中的多个 `return` 语句使得很难看到组件返回的内容。
对于我们可以搜索 `render` 词的 class 类组件来说，这不是问题。

一个方便的技巧是尽可能使用不带大括号的箭头函数（VSCode 有一个 action for this 😀）。

❌ Bad: 更难发现组件 return 语句

```tsx
function Dashboard({ posts, searchTerm, onPostSelect }) {
  const filteredPosts = posts.filter((post) => {
    return post.title.includes(searchTerm);
  });
  const createPostSelectHandler = (post) => {
    return () => {
      onPostSelect(post.id);
    };
  };
  return (
    <>
      <h1>Posts</h1>
      <ul>
        {filteredPosts.map((post) => {
          return (
            <li key={post.id} onClick={createPostSelectHandler(post)}>
              {post.title}
            </li>
          );
        })}
      </ul>
    </>
  );
}
```

✅ Good：组件只有一个 return 语句

```tsx
function Dashboard({ posts, searchTerm, onPostSelect, selectedPostId }) {
  //使用不带大括号的箭头函数
  const filteredPosts = posts.filter((post) => post.title.includes(searchTerm));
  const createPostSelectHandler = (post) => () => {
    onPostSelect(post.id);
  };
  return (
    <>
      <h1>Posts</h1>
      <ul>
        {filteredPosts.map((post) => (
          <li
            key={post.id}
            onClick={createPostSelectHandler(post)}
            style={{ color: post.id === selectedPostId ? "red" : "black" }}
          >
            {post.title}
          </li>
        ))}
      </ul>
    </>
  );
}
```

### 27.首选命名导出而不是默认导出

我到处都能看到默认导出，这让我很难过 🥲。
让我们比较一下这两种方法：

```tsx
/// `Dashboard` is exported as the default component
export function Dashboard(props) {
  /// TODO
}

/// `Dashboard` export is named
export function Dashboard(props) {
  /// TODO
}
```

我们现在像这样导入组件：

```tsx
/// Default export
import Dashboard from "/path/to/Dashboard";

/// Named export
import { Dashboard } from "/path/to/Dashboard";
```

以下是默认导出的问题：

- 如果组件已重命名，IDE 不会自动重命名导出。

例如，如果 `Dashboard` 重命名为 `Console` ，我们将有以下内容：

```tsx
/// In the default export case, the name is not changed
import Dashboard from "/path/to/Console";

/// In the named export case, the name is changed
import { Console } from "/path/to/Console";
```

- 很难查看从具有默认导出的文件中导出的内容。

例如，在命名导入的情况下，一旦我从 `import { } from "/path/to/file"`，当我将光标放在括号内时，我会得到自动补全。

- 默认导出更难重新导出。

例如，如果我想从 `index` 文件重新导出 `Dashboard` 组件，则必须执行以下操作：

```tsx
export { default as Dashboard } from "/path/to/Dashboard";
```

对于命名导出，解决方案更直接。

```tsx
export { Dashboard } from "/path/to/Dashboard";
```

因此，请默认为 named exports 🙏 。

> 💡 注意：即使你使用的是 React [lazy](https://react.dev/reference/react/lazy)，你仍然可以使用命名导出。请在此处[查看示例](https://dev.to/iamandrewluca/react-lazy-without-default-export-4b65)。

## 分类 五、高效的状态管理 🚦
