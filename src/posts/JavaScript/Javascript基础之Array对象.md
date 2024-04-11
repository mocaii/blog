# Javascript 基础之 Array 对象

Array 对象支持在单个变量名下存储多个元素，并具有执行常见数组操作的成员。[参考文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

## 一、创建数组

### 1.使用数组字面量

```js
let arr = [1, 2, 3, 4, 5];
```

### 2.使用 `Array()` 构造函数

```js
let arr = new Array(5); // [ , , , , ]
let arr = new Array(1, 2, 3, 4, 5); // [1, 2, 3, 4, 5]
```

### 3.使用 `Array.of()` 方法

这个方法创建一个具有可变数量参数的新数组实例。

```javascript
let arr = Array.of(1, 2, 3, 4, 5); // [1, 2, 3, 4, 5]
```

### 4.使用 `Array.from()` 方法

将类数组对象或可迭代对象转换为真正的数组

```javascript
let arr = Array.from([1, 2, 3, 4, 5]); // [1, 2, 3, 4, 5]
let arr = Array.from("12345"); //  ['1', '2', '3', '4', '5']
let arr = Array.from({ length: 5 }); // [ , , , , ]
let arr = Array.from({ length: 5 }, () => 0); // [0, 0, 0, 0, 0]
let arr = Array.from({ length: 5 }, (value, index) => index); // [0, 1, 2, 3, 4]
```

### 5. 使用扩展运算符（spread operator）

将一个数组或可迭代对象展开到单个元素。

```javascript
let arr2 = [..."12345"]; //  ['1', '2', '3', '4', '5']
```

### 6.使用 Array() 构造函数和 apply() 方法

```js
const arr = Array.apply(null, [1, 2, 3]); // [1, 2, 3]
```

## 二、属性与方法

### 1.静态方法

- `Array.from()`: 从数组类对象或可迭代对象创建一个新的 Array 实例
- `Array.of()`: 创建一个新的 Array 实例，具有可变数量的参数，而不管参数的数量或类型。
- `Array.isArray()`: 返回一个布尔值，表示传递的值是否是一个数组。

### 2.实例属性

- `length`: 数组的长度，即元素的个数。
- `constructor`: 创建实例对象的构造函数。对于 Array 实例，初始值是 Array 构造函数。

```js
let arr = new Array();
arr.length; // 0
arr.constructor; // Array
```

### 3.实例方法

#### Array.prototype.at()

返回给定索引处的数组元素。接受从最后一项往回计算的负整数。

```js
let arr = [1, 2, 3, 4, 5];
arr.at(2); // 3
```

#### Array.prototype.concat()

返回一个新的数组，包含两个或多个数组的所有元素。

```js
let arr = [1, 2];
let newArr = arr.concat([3, 4, 5]); //[1,2,3,4,5]
```

#### Array.prototype.copyWithin()

在当前数组中，将指定的元素从一个位置复制到另一个位置。

```js
let arr = [1, 2, 3, 4, 5];
// copyWithin(target, start, end)
//将数组中索引为1到2的元素复制到索引为0的元素中
arr.copyWithin(0, 1, 3); // [2, 3, 3, 4, 5]
```

#### Array.prototype.entries()

返回一个由数组元素的索引和值组成的数组的迭代器对象。

```js
let arr = [1, 2, 3, 4, 5];
let eArr = arr.entries();
for (let [index, value] of eArr) {
  console.log(index, value); // 0 1 , 1 2 , 2 3 , 3 4 , 4 5
}
```

#### Array.prototype.every()

返回一个布尔值，表示是否为数组中的每个元素都满足指定的条件。

```js
let arr = [1, 2, 3, 4, 5];
let result = arr.every((value, index, arr) => value > 0);
console.log(result); // true
```

#### Array.prototype.fill()

用静态值填充当前数组中从开始索引到结束索引的所有元素。

```js
let arr = [1, 2, 3, 4, 5];
arr.fill(0, 1, 3); // [1, 0, 0, 4, 5]
new Array(5).fill(8); // [8, 8, 8, 8, 8]
```

#### Array.prototype.filter()

返回一个由通过测试的数组元素组成的新数组。

```js
let arr = [1, 2, 3, 4, 5];
let newArr = arr.filter((value, index, arr) => value > 2);
console.log(newArr); // [3, 4, 5]
```

#### Array.prototype.find()

返回数组中第一个通过测试的元素的值。如果数组中没有元素通过测试，则返回 undefined。

```js
let arr = [1, 2, 3, 4, 5];
let result = arr.find((value, index, arr) => value > 2);
console.log(result); // 3
```

#### Array.prototype.findIndex()

返回数组中第一个通过测试的元素的索引。如果数组中没有元素通过测试，则返回 -1。

```js
let arr = [1, 2, 3, 4, 5];
let result = arr.findIndex((value, index, arr) => value > 2);
console.log(result); // 2
```

#### Array.prototype.findLast()

返回数组中最后一个通过测试的元素的值。如果数组中没有元素通过测试，则返回 undefined。

```js
let arr = [1, 2, 3, 4, 5];
let result = arr.findLast((value, index, arr) => value > 2);
console.log(result); // 5
```

#### Array.prototype.findLastIndex()

返回数组中最后一个通过测试的元素的索引。如果数组中没有元素通过测试，则返回 -1。

```js
let arr = [1, 2, 3, 4, 5];
let result = arr.findLastIndex((value, index, arr) => value > 2);
console.log(result); // 4
```

#### Array.prototype.flat()

返回一个新数组，所有子数组元素递归地连接到其中，直到指定的深度。

```js
let arr = [1, 2, [3, 4, [5, 6]]];
let newArr1 = arr.flat(); // [1, 2, 3, 4, [5, 6]]
let newArr2 = arr.flat(2); // [1, 2, 3, 4, 5, 6]
let newArr3 = arr.flat(Infinity); // [1, 2, 3, 4, 5, 6]
```

#### Array.prototype.flatMap()

对调用数组的每个元素调用给定的回调函数，然后将结果展平一层，返回一个新数组。

```js
let arr = [1, 2, [3, 4, [5, 6]]];
let newArr = arr.flatMap((value, index, arr) => value);
console.log(newArr); // [1, 2, 3, 4, [5, 6]]
```

#### Array.prototype.forEach()

对调用数组中的每个元素调用给定的函数。

```js
let arr = [1, 2, 3, 4, 5];
arr.forEach((value, index, arr) => console.log(value, index, arr));
```

#### Array.prototype.includes()

返回一个布尔值，表示是否包含给定的值。

```js
let arr = [1, 2, 3, 4, 5];
let result = arr.includes(3);
console.log(result); // true
```

#### Array.prototype.indexOf()

返回给定值在数组中的第一个索引值，如果值不存在返回 -1。

```js
let arr = [1, 2, 3, 4, 5];
let result = arr.indexOf(3);
console.log(result); // 2
```

#### Array.prototype.join()

返回一个字符串，所有数组元素用指定的分隔符连接。

```js
let arr = [1, 2, 3, 4, 5];
let result = arr.join("-");
console.log(result); // 1-2-3-4-5
```

### Array.prototype.keys()

返回一个由数组元素的索引组成的数组的迭代器对象。

```js
let arr = [1, 2, 3, 4, 5];
let eArr = arr.keys();
for (let index of eArr) {
  console.log(index); // 0, 1, 2, 3, 4
}
```

#### Array.prototype.lastIndexOf()

返回给定值在数组中的最后一个索引值，如果值不存在返回 -1。

```js
let arr = [1, 2, 3, 4, 5];
let result = arr.lastIndexOf(3);
console.log(result); // 2
```

#### Array.prototype.map()

返回一个新数组，新数组中的元素为原数组中每个元素调用给定函数的结果。

```js
let arr = [1, 2, 3, 4, 5];
let newArr = arr.map((value, index, arr) => value * 2);
console.log(newArr); // [2, 4, 6, 8, 10]
```

#### Array.prototype.pop()

返回并删除数组的最后一个元素。

```js
let arr = [1, 2, 3, 4, 5];
let result = arr.pop();
console.log(result); // 5
```

#### Array.prototype.push()

向数组末尾添加一个或多个元素，并返回新数组的长度。

```js
let arr = [1, 2, 3, 4, 5];
let result = arr.push(6, 7, 8);
console.log(result); // 8
```

#### Array.prototype.reduce()

对数组的每个元素（从左到右）执行用户提供的“reducer”回调函数，将其简化为单个值。

```js
let arr = [1, 2, 3, 4, 5];
let result = arr.reduce((prev, curr, index, arr) => prev + curr);
console.log(result); // 15
```

#### Array.prototype.reduceRight()

对数组的每个元素（从右到左）执行用户提供的“reducer”回调函数，将其简化为单个值。

```js
let arr = [1, 2, 3, 4, 5];
let result = arr.reduceRight((prev, curr, index, arr) => prev + curr);
console.log(result); // 15
```

#### Array.prototype.reverse()

就地反转数组中元素的顺序。

```js
let arr = [1, 2, 3, 4, 5];
let result = arr.reverse();
console.log(result); // [5, 4, 3, 2, 1]
```

#### Array.prototype.shift()

将数组的第一个元素从数组中移除，并返回该元素。

```js
let arr = [1, 2, 3, 4, 5];
let result = arr.shift();
console.log(result); // 1
```

#### Array.prototype.slice()

返回一个新数组，该数组由原数组中从 start（包含）到 end（不包含）的元素组成。

```js
let arr = [1, 2, 3, 4, 5];
let newArr = arr.slice(1, 3);
console.log(newArr); // [2, 3]
```

#### Array.prototype.some()

如果数组中至少有一个元素通过测试，则返回 true，否则返回 false。

```js
let arr = [1, 2, 3, 4, 5];
let result = arr.some((value, index, arr) => value > 2);
console.log(result); // true
```

#### Array.prototype.sort()

在原地对数组进行排序。

```js
let arr = [1, 2, 3, 4, 5];
let result = arr.sort((a, b) => b - a);
console.log(result); // [5, 4, 3, 2, 1]
```

#### Array.prototype.splice()

在数组中删除或替换元素，然后返回删除的元素。

```js
let arr = [1, 2, 3, 4, 5];
let newArr = arr.splice(1, 2);
let newArr2 = arr.splice(0, 2, 10, 20);
console.log(newArr); // [2, 3]
console.log(arr); // [10, 20, 3,4,5]
```

#### Array.prototype.toLocaleString()

返回一个表示调用数组及其元素的本地化字符串，使用当前语言和区域设置。重写` Object.prototype.toLocaleString()`方法。

```js
let arr = [1, 2, 3, 4, 5];
let result = arr.toLocaleString();
console.log(result); // "1,2,3,4,5"
```

#### Array.prototype.toReversed()

返回一个新数组，该数组的元素顺序被反转，但不改变原始数组。

```js
let arr = [1, 2, 3, 4, 5];
let result = arr.toReversed();
console.log(arr); // [1, 2, 3, 4, 5]
console.log(result); // [5, 4, 3, 2, 1]
```

#### Array.prototype.toSorted()

返回一个新数组，该数组的元素按升序排列，但不改变原始数组。

```js
let arr = [5, 2, 1, 3, 4];
let result = arr.toSorted();
console.log(result); // [1, 2, 3, 4, 5]
```

#### Array.prototype.toSpliced()

返回一个新数组，该数组的元素按给定的索引位置插入元素，但不改变原始数组。

```js
let arr = [1, 2, 3, 4, 5];
let result = arr.toSpliced(0, 2, 10, 20);
console.log(result); // [10, 20, 3, 4, 5]
```

#### Array.prototype.toString()

返回一个字符串，表示调用数组及其元素的字符串值。重写`Object.prototype.toString()`方法。

```js
let arr = [1, 2, 3, 4, 5];
let result = arr.toString();
console.log(result); // "1,2,3,4,5"
```

#### Array.prototype.unshift()

将一个或多个元素添加到数组的开头，并返回数组的新长度。

```js
let arr = [1, 2, 3, 4, 5];
let result = arr.unshift(0);
console.log(result); // 6
console.log(arr); // [0, 1, 2, 3, 4, 5]
```

#### Array.prototype.values()

返回一个由数组元素值组成的数组的迭代器对象。

```js
let arr = [1, 2, 3, 4, 5];
let eArr = arr.values();
for (let value of eArr) {
  console.log(value); // 1, 2, 3, 4, 5
}
```

#### Array.prototype.with()

返回一个新数组，其中给定索引处的元素替换为给定值，而不改变原始数组。

```js
let arr = [1, 2, 3, 4, 5];
let result = arr.with(2, 10);
console.log(result); // [1, 2, 10, 4, 5]
```

#### Array.prototype[Symbol.iterator]

Array.prototype[Symbol.iterator] 是一个内置的符号方法，它返回一个迭代器对象，用于遍历数组中的元素。这个方法可以被用于遍历数组中的元素，例如使用 for...of 循环。默认情况下，该方法为`values()`方法的别名。
