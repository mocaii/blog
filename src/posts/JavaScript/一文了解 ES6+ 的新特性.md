---
title: 一文了解 ES6+ 的新特性
date: '2024-04-15T11:31:25.477Z'
lastModified: '2024-04-15T11:31:25.477Z'
---
# 一文了解 ES6+ 的新特性

随着 JavaScript 语言的持续发展和完善，ECMAScript 标准也在不断迭代更新，极大地提升了开发者的编程体验和工作效率。下面就让我们一起来了解一下 ES6+ 的新特性吧。（持续记录）

[点击跳转到“我的锚点”](#ES7)

## 一、ES6

JavaScript ES6（ECMAScript 2015）是一个重要的版本，它引入了许多新特性，使得 JavaScript 语言更加强大和易于使用。

### 1.let、const 关键字与块级作用域

#### let

用于块级作用域的变量声明，解决了 JavaScript 长久以来的变量提升问题。

```js
console.log(a); // undefined
var a;

console.log(b); // Uncaught ReferenceError: b is not defined
let b;
```

#### const

- 用于块级作用域的常量声明，一旦被赋值后就不能再改变（对象属性可变）。
- 声明时必须初始化。
- 声明限制只适用于它指向的变量的引用，可修改对象的属性

```js
const a; // Uncaught SyntaxError: Missing initializer in const declaration

const b = 1;
b = 2; // Uncaught TypeError: Assignment to constant variable.

const obj = { name: 'mora' };
obj = {}; // Uncaught TypeError: Assignment to constant variable.
obj.name ='mora2';
console.log(obj); // { name:'mora2' }

```

#### 块级作用域

使用 let 和 const 声明的变量，只在定义它们的代码块内有效。

```js
if (true) {
  let a = 1;
  const b = 2;
  var c = 3;
}
console.log(a); // Uncaught ReferenceError: b is not defined
console.log(b); // Uncaught ReferenceError: b is not defined
console.log(c); // 3
```

### 2.模版字符串

模板字符串使用反引号（`）包围，允许在字符串中插入表达式。

```js
let name = "Mora";
console.log(`Hello, ${name}!`);
```

### 3.解构赋值

解构赋值允许我们将数组或对象的属性分配给多个变量。

```js
let [a, b, ...c] = [1, 2, 3, 4, 5];
console.log(a, b, c); // 1 2 [3, 4, 5]

let { a, b, ...c } = { a: 1, b: 2, c: 3, d: 4, e: 5 };
console.log(a, b, c); // 1 2 { c: 3, d: 4, e: 5 }
```

### 4.箭头函数

箭头函数是一种简洁的函数表示方法，它使用 => 符号来定义函数。

- 箭头函数没有自己的 this 值，它继承自外部作用域的 this 值，this 指向不可变。
- 箭头函数内部的 this 对象就是定义时所在的对象，普通函数的 this 对象指向使用时所在的对象。
- 不是构造函数，没有 prototype 属性，不能 new。
- 不可以使用 arguments 对象，该对象在函数体内不存在

```js
// 使用 ES5 语法定义函数
function foo() {
  cconso.log(arguments); //Arguments [callee: ƒ, Symbol(Symbol.iterator): ƒ]
  return this;
}
// 使用箭头函数定义函数
const foo1 = () => {
  console.log(arguments); // Uncaught ReferenceError: arguments is not defined
  return this;
};

let obj = {
  foo,
  foo1,
};
console.log(obj.foo()); //当前对象 obj
console.log(obj.foo1()); //定义所在对象 （全局对象window）

foo.prototype; // { foo: [Function: foo] }
foo1.prototype; // undefined
let f = new foo();
let f1 = new foo1(); // Uncaught TypeError: foo1 is not a constructor
```

### 5.类 Class

类语法支持面向对象编程，提供更清晰的构造函数、继承等模式。

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayName() {
    console.log(this.name);
  }
}

class Student extends Person {
  sayAge() {
    console.log(this.age);
  }
}
const student = new Student("mora", 18);
student.sayName(); //mora
student.sayAge(); //18
```

### 6.增强的对象字面量

- 对象属性简写
- 简化对象定义，允许方法简写

```js
const name = "mora";
const person = {
  name,
  sayName() {
    console.log(this.name);
  },
};
```

### 7.模块化

ES Module，官方标准化了模块系统，支持 import 和 export 语句来实现模块间的导入导出。

```js
// module.js
export const message = "你好";

// main.js
import { message } from "./module.js";
console.log(message);
```

### 8.新增集合类型

引入了新的集合类型 Set 、Map、WeakSet、WeakMap。

#### Set

Set 是一种值的集合，其中值可以是任意类型的数据。Set 中的值是唯一的，不能重复。Set 提供了一些方法来操作值，例如添加、删除、检查值是否存在等。
![set](https://blog.mocaii.cn/set.png)

- `new Set()`：创建一个新的空 Set。
- `add(value)`：将值添加到 Set 中。如果值已经存在，则不会重复添加。
- `delete(value)`：从 Set 中删除值。
- `has(value)`：检查值是否存在于 Set 中。
- `clear()`：清空 Set。
- `size`：返回 Set 中值的数量。

```js
const set = new Set();
let a = {};
set.add("mora");
set.add(a);
console.log(set.has(a)); //true
set.delete("mora");
console.log(set.size); //1
```

#### WeakSet

WeakSet 是一种值的集合，其中值必须是对象。WeakSet 中的值是弱引用，这意味着如果值对象没有其他强引用，它将被垃圾回收。WeakSet 的一个常见用途是在不影响垃圾回收的情况下，存储一组对象。
![weakset.png](https://blog.mocaii.cn/weakset.png)

- `new WeakSet()`：创建一个新的空 WeakSet。
- `add(value)`：将值添加到 WeakSet 中。如果值已经存在，则不会重复添加。
- `delete(value)`：从 WeakSet 中删除值。
- `has(value)`：检查值是否存在于 WeakSet 中。

```js
const weakset = new WeakSet();
let a = {};
weakset.add(a);
console.log(weakset.has(a)); //true
weakset.add(1); //Uncaught TypeError: Invalid value used in weak set
```

#### Map

Map 是一种键值对的集合，其中键和值可以是任意类型的数据。Map 中的键是唯一的，但值可以重复。Map 提供了一些方法来操作键值对，例如设置、获取、删除、检查键是否存在等。
![map](https://blog.mocaii.cn/map.png)

- `new Map()`：创建一个新的空 Map。
- `set(key, value)`：将键值对添加到 Map 中。如果键已经存在，则更新该键的值。
- `get(key)`：获取键对应的值。如果键不存在，则返回 undefined。
- `has(key)`：检查键是否存在于 Map 中。
- `delete(key)`：从 Map 中删除键值对。
- `clear()`：清空 Map。
- `size`：返回 Map 中键值对的数量。

```js
const map = new Map();
map.set("name", "mora");
map.set("age", 18);
console.log(map.get("name")); //'mora'
console.log(map.has("age")); //true
map.delete("name");
console.log(map.size); //1
```

#### WeakMap

WeakMap 是一种键值对的集合，其中键必须是对象，值可以是任意类型的数据。WeakMap 中的键是弱引用，这意味着如果键对象没有其他强引用，它将被垃圾回收。WeakMap 的一个常见用途是在不影响垃圾回收的情况下，将数据与对象关联起来。
![weakmap](https://blog.mocaii.cn/weakmap.png)

- `new WeakMap()`：创建一个新的空 WeakMap。
- `set(key, value)`：将键值对添加到 WeakMap 中。如果键已经存在，则更新该键的值。
- `get(key)`：获取键对应的值。如果键不存在，则返回 undefined。
- `has(key)`：检查键是否存在于 WeakMap 中。
- `delete(key)`：从 WeakMap 中删除键值对。

```js
const weakmap = new WeakMap();
let a = {};
weakmap.set(a, "mora");
console.log(weakmap.get(a)); //'mora'
console.log(weakmap.has(a)); //true
weakmap.set("age", 20); //Uncaught TypeError: Invalid value used as weak map key
```

### 8.迭代器（Iterator）

- 提供了一种遍历可迭代对象的标准方式
- 通过 `Symbol.iterator` 属性和 `next()`方法实现
- 数组 Array、字符串 String、Map、Set、Generator 等都实现了迭代器接口

#### 可迭代对象（Iterable）

- 任何能够使用迭代器遍历的类型都必须实现 `Symbol.iterator` 内部方法。当调用这个属性时，它会返回一个迭代器对象。

- 迭代器对象具有一个 next()方法，每次调用都会返回一个包含两个属性的对象` { value: any, done: boolean }`
- 可使用 for...of 循环自动处理迭代过程

```js
let array = ["apple", "banana", "cherry"];
let iterator = array[Symbol.iterator]();
iterator.next(); //{value: 'apple', done: false}
iterator.next(); //{value: 'banana', done: false}
for (let a of array) {
  console.log(a); // cherry
}
```

#### 对象实现可迭代接口

```js
const obj = {
  name: "mora",
  city: "gz",
  [Symbol.iterator]() {
    let index = 0;
    let values = Object.values(this);
    return {
      next() {
        if (index < values.length) {
          return { value: values[index++], done: false };
        }
        return { value: undefined, done: true };
      },
    };
  },
};

const o = obj[Symbol.iterator]();
o.next(); //{value:'mora', done: false}
o.next(); //{value:'gz', done: false}
o.next(); //{value:undefined, done: true}
```

class 封装

```js
class MyIteratorObject {
  constructor(obj) {
    this.obj = obj;
  }

  [Symbol.iterator]() {
    let index = 0;
    const obj = this.obj;
    return {
      next() {
        if (index < Object.keys(obj).length) {
          return { value: obj[Object.keys(obj)[index++]], done: false };
        }
        return { value: undefined, done: true };
      },
    };
  }
}
const obj = new MyIteratorObject({ name: "mora", city: "gz" });
for (let a of obj) {
  console.log(a); // mora gz undefined
}
```

### 9.生成器（Generator）

- 是一种特殊的迭代器，它允许函数在执行过程中保存状态并在之后恢复执行。
- 生成器由 `Generator` 函数定义，这种函数使用 `function*` 语法，并通过 `yield` 关键字来产出值。

```js
function* foo() {
  yield "hello";
  yield "world";
}
const f = foo();
f.next(); //{value: 'hello', done: false}
f.next(); //{value: 'world', done: false}
f.next(); // {value: undefined, done: true}
```

### 10.Function 函数参数

- 参数默认值：函数支持设置默认值
- 剩余参数：可以收集不定数量的参数到一个数组中

```js
function foo(age = 20) {}
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b);
}
sum(1, 2, 3, 4); //10
```

### 11.扩展操作符（...）

```js
//将字符串转换为数组
let a = [..."hello world"];
console.log(a); // ['h', 'e', 'l', 'l', 'o','', 'w', 'o', 'r', 'l', 'd']
//对象合并
let obj = { name: "mora" };
let obj1 = { city: "gz" };
let newObj = { ...obj, ...obj1 };
console.log(newObj); // { name:'mora', city: 'gz' }
```

### 12.Symbol 类型

新增一种原始数据类型，用来创建唯一的标识符。作为第七种原始数据类型，Symbol 用来生成独一无二的标识符，可用作对象的属性键，避免键名冲突。

```js
const symbol1 = Symbol("key1");
const symbol2 = Symbol("key2");

console.log(symbol1 === symbol2); // false
```

### 13.Math 对象扩展

- `Math.pow(x,y)`: 返回 x 的 y 次幂。
- `Math.hypot([x[, y[, …]]])`: 返回其所有参数平方和的平方根。
- `Math.trunc(x)`: 返回一个数的整数部分，直接去除其小数点及之后的部分。

```js
Math.pow(2, 3); //8
Math.trunc(1.29); //1
```

### 14.Number 对象和数值类型的新特性

- 提供了 `Number.isNaN()`, `Number.isFinite()`, `Number.parseInt()`, `Number.parseFloat()`等更精确判断数值的方法。

```js
Number.isNaN(NaN); //true
Number.isFinite(1); //true
Number.parseInt(11.1); //11
Number.parseFloat("314e-2"); //3.14
```

- 新增了二进制、八进制和十六进制表示数字的方式：`0b...` (二进制),`0o...`(八进制),` 0x...` (十六进制)。

```js
console.log(0b1101110); // 110
console.log(0o156); // 110
console.log(0x6e); // 110
```

### 15.Array 对象增强

- `Array.from()`: 将类数组对象或可迭代对象转换为真正的数组。
- `Array.of()`: 创建一个具有可变数量参数的新数组实例。
- `find()`: 查找满足条件的第一个元素。
- `findIndex()`: 查找满足条件的第一个元素的索引。
- `fill()`: 填充数组元素到数组内的另一个位置
- `copyWithin()`: 复制部分元素到数组内的另一个位置。
- `entries()`: 返回迭代器，遍历数组的键值对。
- `keys()`: 返回迭代器，遍历数组的键。
- `values()`: 返回迭代器，遍历数组的值。

```js
let arr = Array.from("abcde"); // ['a', 'b', 'c', 'd', 'e']
arr = Array.from({ length: 5 }, (v, k) => {
  return { key: k };
});
let targe = arr.find((i) => i.key === 2); //{key: 2}
let index = arr.findIndex((i) => i.key === 2); //2
arr = Array.of("apple", "orange", "banana"); //['apple', 'orange', 'banana']
arr.fill("mora", 1, 3); //['apple', 'mora', 'mora']
arr.copyWithin(1, 2, 4); //
```

### 16.String 字符串对象的新方法

- `startsWith()`: 用于检查字符串是否以某个子串开始
- `endsWith()`: 用于检查字符串是否以某个子串结束
- `includes()`: 用于检查字符串是否包含子串。
- `repeat(count)`: 重复字符串指定次数。
- `codePointAt()`: 返回字符的码点。

```js
let str = "hello world";
console.log(str.startsWith("hello")); //true
console.log(str.endsWith("world")); //true
console.log(str.includes("world")); //true
console.log(str.repeat(2)); //'hello worldhello world'
console.log(str.codePointAt(0)); //104
```

### 17.Object 对象的新方法

- `Object.assign()`: 将源对象的属性拷贝到目标对象上。
- `Object.is()`: 提供了严格相等比较的功能，考虑到了 NaN 和-0 的情况。

```js
let a = { name: "mora" };
let b = { name: "mora" };
console.log(Object.is(NaN, NaN)); //true
consoe.log(Object.is(a, b)); //false
let c = { age: 20 };
Obejct.assign(a, c);
console.log(a); //{name: 'mora', age: 20}
```

### 18.Promise

Promise 对象表示异步操作最终的完成（或失败）以及其结果值。

#### 解决的问题

- 回调地狱
- 可读性，链式调用
- 信任问题

#### Promsie 并发

- `Promise.all`: 所有成功才返回成功，一个失败就返回失败
- `Promise.any`: promise 执行所有失败才会返回失败，一个成功就返回成功的那个
- `Promise.race`: 返回成功或失败都依赖于第一个执行完毕的 promise 返回成功则成功，失败则返回失败
- `Promise.allsettled`: 当所有的 promise 执行完毕，返回一个数组中存放每一个 promise 的结果

#### Promise.prototype.finally()

无论 Promise 状态如何变化，都能执行最后的清理工作。

### 19.Proxy

Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。Proxy 是一个用于定义自定义行为的对象，它可以拦截对目标对象的访问、修改、删除等操作。Proxy 可以用于实现诸如数据验证、日志记录、权限控制等功能。

```js
let p = new Proxy(target, handler);
```

`target` 是要拦截的目标对象，`handler` 是一个对象，用于定义拦截的行为。handler 对象可以包含以下属性：

- get：拦截对目标对象属性的读取操作。
- set：拦截对目标对象属性的写入操作。
- has：拦截 in 操作符。
- deleteProperty：拦截 delete 操作符。
- ownKeys：拦截 Object.keys() 方法。
- apply：拦截函数的调用。
- construct：拦截 new 操作符。

```js
const target = {
  name: "mo",
  age: 20,
};
const handler = {
  set(target, key, value) {
    if (key === "age" && value < 0) {
      throw new Error("年龄不能为负数");
    }
    target[key] = value;
  },
};
const proxy = new Proxy(target, handler);
proxy.age = -1;
```

### 20.Reflect

Reflect 提供了一组操作对象的反射 API，并与 Proxy 配合使用。Reflect 是一个内置对象，它提供了一组与 Proxy 拦截器相对应的方法。这些方法的名称和参数与相应的 Proxy 拦截器相同，但它们不会执行拦截操作，而是直接执行目标对象的操作。Reflect 的主要用途是在 Proxy 拦截器中使用，以便在执行拦截操作时保持目标对象的原始行为。

```js
// 一个简单的日志记录功能
const target = {
  name: "mo",
  age: 20,
};
const handler = {
  get(target, key) {
    console.log(`Getting ${key}`);
    return Reflect.get(target, key);
  },
  set(target, key, value) {
    console.log(`Setting ${key} to ${value}`);
    return Reflect.set(target, key, value);
  },
};
const proxy = new Proxy(target, handler);
proxy.name;
proxy.age = 30;
```

# 二、ES7

### 1.Array 增强

Array.prototype.includes()
提供了一个方法来检查数组中是否包含给定的值，返回布尔值。

```js
let arr = [1, 2, 3, 4, 5];
arr.includes(3); //true
```

### 2.指数操作符

新增了 ** 运算符用于进行幂运算，例如 2 ** 3 等价于 Math.pow(2, 3)。

```js
Math.pow(2, 3); //8
```

## 三、ES8

### 1.async/await

正式标准化了 async 和 await 关键字，使得处理 Promise 更加简洁和易于理解。异步函数返回一个 Promise，并允许在函数内部使用 await 来等待 Promise 的结果。
原理：自动执行 generator 函数

```js
async function fetchUser() {
  const response = await fetch("https://api.example.com/user");
  const user = await response.json();
  return user;
}
```

### 2.Object.values/Object.entries

- `Object.values(obj)` 返回一个包含对象所有自身可枚举属性值的数组。
- `Object.entries(obj)` 返回一个由对象所有自身可枚举属性键值对组成的二维数组。

```js
let obj = { a: 1, b: 2 };
console.log(Object.values(obj)); // [1, 2]
console.log(Object.entries(obj)); // [['a', 1], ['b', 2]]
```

### 3.String.prototype.padStart/padEnd：

```js
let str = "hello";
str.padStart(10, " "); // "     hello"
str.padEnd(10, "-"); // "hello-----"
```

### 4.函数参数列表结尾允许逗号

### 5.Object.getOwnPropertyDescriptors()

获取一个对象的所有自身属性的描述符,如果没有任何自身属性，则返回空对象。返回一个对象的所有自身属性描述符组成的对象。

```js
let obj = { a: 1 };
console.log(Object.getOwnPropertyDescriptors(obj));
// 输出：{ a: { value: 1, writable: true, enumerable: true, configurable: true } }
```

### 6.共享内存和原子操作

提供了一组新的全局对象 Atomics 以及 SharedArrayBuffer，用于多线程编程中的同步访问共享内存区域。

- `SharedArrayBuffer`对象：用来表示一个通用的，固定长度的原始二进制数据缓冲区
- `Atomics`对象：提供了一组静态方法用来对 SharedArrayBuffer 对象进行原子操作

## 四、ES9

### 1.异步迭代器

引入了 for await...of 结构用于异步遍历可迭代的异步生成器对象。
await 可以和 for...of 循环一起使用，以串行的方式运行异步操作

```js
async function processIterable(asyncIterable) {
  for await (let item of asyncIterable) {
    console.log(item);
  }
}
let arr = [
  new Promise((resolve) => resolve(1)),
  new Promise((resolve) => resolve(2)),
  new Promise((resolve) => resolve(3)),
];
processIterable(arr); // 1, 2, 3
```

### 2.Promise.finally()

Promise 对象新增了一个.finally()方法，无论 Promise 最后的状态如何，都会执行指定的操作。

```js
fetch("https://api.example.com")
  .then((response) => response.json())
  .catch((error) => console.error(error))
  .finally(() => console.log("Finished!"));
```

### 3.Rest/Spread 属性

对象字面量中可以使用剩余运算符（...）来合并对象属性。

```js
let obj1 = { a: 1, b: 2 };
let obj2 = { c: 3, ...obj1 }; // { c: 3, a: 1, b: 2 }
```

### 4.正则表达式

#### 4.1 正则表达式命名捕获组

在正则表达式中可以通过(?<name>...)语法为捕获组命名，方便在后续代码中引用。

```js
const regex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const match = "2022-01-31".match(regex);
console.log(match.groups); // { year: "2022", month: "01", day: "31" }
```

#### 4.2 正则表达式反向断言

`(?<=pattern)`，pattern 是一个正则表达式，用于匹配字符串前面的内容。如果 pattern 匹配成功，则反向断言也匹配成功，但 pattern 本身不会包含在匹配结果中。用于匹配不被特定模式包围的文本。反向断言是通过在正则表达式中使用括号和"?"修饰符来定义的。"pattern"是您想要排除的模式。

```js
//使用反向断言来排除以"apple"结尾的单词
const regex = /\b(?!apple\b)\w+/;
const match = "banana".match(regex);
console.log(match); // 输出：['banana']
```

#### 4.3 正则表达式 dotAll 模式

正则表达式中点.匹配除回车外的任何单字符，标记 s 改变这种行为，允许行终止符的出现

```js

```

### 5.模板文字插值中的尾逗号

模板字符串中的占位符后面现在允许有一个逗号，增强了代码的可读性和易于修改性。

```js
let user = { name: "Alice", age: 25 };
console.log(`User: ${user.name}, Age: ${user.age}, `); // User: Alice, Age: 25,
```

虽然这些特性是在 ES2018 中标准化的，但在标准发布之前，部分现代 JavaScript 引擎可能已经实现了其中的一些功能。

## 五、ES10

### 1.Array 增强

Array.prototype.flat()和 Array.prototype.flatMap()

- flat()方法用于将嵌套数组展平为一个单一的平面数组。
- flatMap()方法则在映射每个元素到新的数组后对其进行扁平化处理。

```js
let arr = [1, [2, [3, 4]]];
console.log(arr.flat(Infinity)); // [1, 2, 3, 4]

let mappedAndFlattened = [1, 2, 3].flatMap((x) => [x * 2]);
console.log(mappedAndFlattened); // [2, 4, 6]
```

### 2.Object 对象的扩展

- Object.fromEntries()：返回一个给定对象自身可枚举属性的键值对数组。该方法从键值对数组创建一个新的对象。

```js
let entries = [
  ["name", "John"],
  ["age", 30],
];
let obj = Object.fromEntries(entries);
console.log(obj); // { name: 'John', age: 30 }

// 通过 Object.fromEntries， 可以将 Map 转化为 Object:
const map = new Map([
  ["foo", "bar"],
  ["baz", 42],
]);
console.log(Object.fromEntries(map)); // { foo: "bar", baz: 42 }
// 可选 Catch
```

### 3.String 对象的扩展

#### String.trimStart()/String.trimEnd()

这两个方法分别去除字符串开始和结束处的空白字符。去除字符串首尾空白字符

```js
let str = "   Hello, World!   ";
console.log(str.trimStart()); // "Hello, World!   "
console.log(str.trimEnd()); // "   Hello, World!"
```

#### String.prototype.matchAll

matchAll（）为所有匹配的匹配对象返回一个迭代器

### 4.Optional Chaining (?.)

链式调用时，如果链中的某个属性或方法不存在，则不再抛出错误，而是返回 undefined。(可选链)

```js
let user = {};
console.log(user?.address?.street); // undefined
```

### 5.Nullish Coalescing Operator (??)

当左侧表达式的值为 null 或 undefined 时，才使用右侧表达式的值。(空值处理)
?.检测不确定的中间节点

```js
let u2 = user.u2 ?? "用户 2";
let defaultName = "Guest";
let userName = null;
console.log(userName ?? defaultName); // "Guest"
```

### 6.Symbol.prototype.description

Symbol 对象现在有一个内置的.description 属性，它返回符号创建时提供的描述字符串。
只读属性，返回 Symbol 对象的可选描述的字符串

```js
Symbol("description").description; // 'description'
let sym = Symbol("description");
console.log(sym.description); // "description"
```

## 六、ES11

### 1.动态导入（Dynamic Import）

import()，按需导入。虽然在一些环境中之前已被支持，但直到 ES2020 才正式成为标准。允许异步导入模块，常用于按需加载代码。

```js
import("/modules/my-module.js").then((module) => {
  // 使用导入的模块
});
```

### 2.数据类型 BigInt

任意精度的整数。BigInt 是一种内置对象，可以表示任意大小的整数，解决了 JavaScript 原生 Number 类型对于大整数表示的限制问题。

```js
let bigIntValue = BigInt("123456789012345678901234567890");
```

### 3.Promise.allSettled

返回一个在所有给定的 promise 已被决议或被拒绝后决议的 promise，并带有一个对象数组，每个对象表示对应的 promise 结果
返回一个 Promise，该 Promise 在所有给定的 Promise 都已结束（无论是 fulfilled 还是 rejected）时解析，并返回每个 Promise 的结果状态。

```js
Promise.allSettled([
  fetch("https://api.example.com/ok"),
  fetch("https://api.example.com/error"),
]).then((results) => {
  results.forEach((promiseResult) => {
    if (promiseResult.status === "fulfilled") {
      console.log(promiseResult.value);
    } else {
      console.error(promiseResult.reason);
    }
  });
});
```

### 4.globalThis

提供了一个全局对象的引用，无论是在浏览器、Node.js 环境还是其他实现中，都可以通过它访问到全局作用域。

- 浏览器：window
- worker：self
- node：global

### 5.字符串方法 trimStart()和 trimEnd()的新别名：stripStart()和 stripEnd()：

这两个方法分别去除字符串开始和结束处的空白字符，与 ES2019 中的 trimStart()和 trimEnd()功能相同，只是提供了新的别名。

### 6.Optional Chaining with the Nullish Coalescing Operator

此特性在 ES2020 中进一步扩展，允许在赋值表达式中使用可选链和空值合并操作符。

```js
let obj = { nested: { value: 42 } };
let val = obj?.nested?.value ?? "default";
console.log(val); // 输出: 42
```

## 七、ES12

### 1.String.prototype.replaceAll()：

replaceAll 返回一个全新的字符串，所有符合匹配规则的字符都将被替换掉。替换字符串中所有匹配的子串。

```js
let str = "Hello, world! Hello again!";
let newStr = str.replaceAll("Hello", "Hi");
console.log(newStr); // 输出: "Hi, world! Hi again!"
```

### 2.WeakRefs

使用 WeakRefs 的 Class 类创建对对象的弱引用(对对象的弱引用是指当该对象应该被 GC 回收时不会阻止 GC 的回收行为)
引入了 WeakRef 对象，它提供了一种对垃圾回收友好的方式来引用对象，当对象没有其他引用时，GC 可以自动回收该对象。

```js
let obj = { name: "John" };
let weakRef = new WeakRef(obj);
obj = null; // 移除强引用
gc(); // 触发垃圾回收
console.log(weakRef.deref()); // 可能输出：null 或 { name: 'John' }，取决于是否已被回收
```

### 3.Promise.any

Promise.any() 接收一个 Promise 可迭代对象，只要其中的一个 promise 成功，就返回那个已经成功的 promise 。如果可迭代对象中没有一个 promise 成功（即所有的 promises 都失败/拒绝），就返回一个失败的 promise。
返回一个 Promise，只要传入的 Promise 中有任意一个变为 fulfilled 状态，那么这个 Promise 就会以那个 fulfilled 的 Promise 的结果作为其结果而解析。如果所有 Promise 都 reject，则返回的 Promise 会以 AggregateError 作为原因 reject。

```js
let promises = [fetch("https://api.example.com/ok"), fetch("https://api.example.com/error")];
Promise.any(promises)
  .then((result) => {
    console.log(result); // 输出第一个成功的请求结果
  })
  .catch((error) => {
    if (error instanceof AggregateError) {
      console.error("所有请求都失败了");
    }
  });
```

### 4.Logical Assignment Operators

逻辑运算符/赋值表达式。新增逻辑赋值运算符，结合赋值和逻辑运算，如&&=、||=和??=。

```js
let x = null;
x ||= "default"; // 等价于 x = x || 'default';
console.log(x); // 输出: "default"

let y = 0;
y &&= 42; // 等价于 y && (y = 42);
console.log(y); // 输出: 0 （因为0为假，所以不会执行赋值操作）

let z = null;
z ??= "fallback"; // 等价于 z = z ?? 'fallback';
console.log(z); // 输出: "fallback"
```

### 5.Numeric Separators 数字分隔符：

在数字字面量中添加下划线作为分隔符，提高代码可读性。
数字分隔符，可以在数字之间创建可视化分隔符，通过\_下划线来分割数字，使数字更具可读性

```js
let largeNumber = 1_000_000;
console.log(largeNumber); // 输出: 1000000
```

## 八、ES13

### 1.Class Field Declarations

类的实例字段声明允许在类内部定义并初始化属性。此特性之前已在一些实现中通过 Stage 4 提案先行支持。

```js
class MyClass {
  #privateField = "Private";
  publicField = "Public";

  constructor() {
    console.log(this.#privateField); // 输出: "Private"
    console.log(this.publicField); // 输出: "Public"
  }
}
```

### 2.Top-Level await：

在模块顶层代码中使用 await 关键字等待 Promise 的结果，使得异步初始化变得更加简单。

```js
// 在模块顶层
let response = await fetch("https://api.example.com/data");
export const data = await response.json();
```

### 3.Temporal API：

提案阶段，未包含在 ES2022 标准中，但在逐步推进过程中。Temporal API 提供了一组新的内置对象和函数来处理日期、时间、时区等复杂场景，以替代现有的 Date 对象。

### 4.String.prototype.replaceAll with a RegExp searchValue：

将字符串 replaceAll 方法的 searchValue 参数扩展为接受正则表达式。

```js
let str = "Hello, world! Hello again!";
let newStr = str.replaceAll(/Hello/gi, "Hi");
console.log(newStr); // 输出: "Hi, world! Hi again!"
```
