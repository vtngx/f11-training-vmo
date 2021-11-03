# **JS BASICS**
*20210904 | Day 1 Topics | Nguyen Hoang Viet*

## **Table of Contents**
* [Variables, scope](#variables)
* [Syntax & Statements](#syntax)
* [Comments](#comments)
* [Operators](#operators)
  * [Assignment Operators](#assignment)
  * [Comparison Operators](#comparison)
  * [Tempary Operators](#tempary)
  * [Arithmetic Operators](#arithmetic)
  * [Logical Operators](#logical)
  * [Bitwise Operators](#bitwise)
  * [String Operators](#string)
  * [Type Operators](#type)
* [Data Types](#data-types)
  * [Functions](#functions)
  * [Objects](#objects)
  * [Strings](#strings)
  * [Numbers](#numbers)
  * [Math](#math)
  * [Arrays](#arrays)
  * [Date](#date)
  * [Booleans](#booleans)
  * [Null, Undefined, NaN](#null)
* [Type Conversion](#type-conversion)
  * [Strings to Numbers](#str-num)
  * [Numbers to Strings](#num-str)
  * [Dates to Numbers](#date-num)
  * [Dates to Strings](#str-str)
  * [Booleans to Numbers](#bool-num)
  * [Numbers to Booleans](#num-bool)
  * [Other cases](#other)
* [Conditional Statements](#conditional)
  * [`if/else`](#ifelse)
  * [`switch`](#switch)
* [Loop](#loop)
  * [`for` loop](#for)
  * [`for/in` loop](#forin)
  * [`Array.forEach()`](#foreach)
  * [`while` loop](#while)
  * [`do/while` loop](#dowhile)
* [Errors](#errors)
* [Use Strict](#strict)
* [Arrow Function](#arrow)
* [Classes](#classes)
* [JSON](#json)
* [ES6, ES7](#es67)
  * [Destructuring](#destructuring)
  * [Default values](#defvalues)
  * [Swap variables](#swap)
  * [Spread operator](#spread)
* [References](#ref)

<div id='variables'/>

## **Variables, scope**

|         | Scope        | Can redeclare | Can update | Hoisting |
| ------- | ------------ | ------------- | ---------- | -------- |
| **var**   | Global/Local | Yes           | Yes        | Hoisted to the top & initialized as `undefined` |
| **const** | Block        | No            | Yes        | Hoisted to the top & not initialized |
| **let**   | Block        | No            | No         | Hoisted to the top & not initialized |

**Problems:**
* `var`:

  ```js
  var str = "one";
  var num = 1;

  if (num == 2)
    var str = "two"; 

  console.log(str) // "two"
  ```

* `const`: Must be initialized when declare

<div id='syntax'/>

## **Syntax & Statements**
  - Statements are composed of: **Values**, **Operators**, **Expressions**, **Comments**
  - Semicolons (;):
    - Used to break statements
    - Can be ignored if separate statements with line breaks

<div id='comments'/>

## **Comments**
  - Single-line comments: `//`
    ```js
    // comment
    ```
  - Multi-line comments: `/**/`
    ```js
    /*
      comment 1
      comment 2
    */
    ```

<div id='operators'/>

## **Operators**
  
  <div id='assignment'/>
  
  1. Assignment operators: 
  ```js
  =, +=, -=, *=, /=, %=, **=
  ```
  
  <div id='comparison'/>

  2. Comparison operators:
  ```js
  ==, ===, !=, !==, >, <, >=, <=
  ```

  <div id='tempary'/>

  3. Tempary operator:
  ```js
  const n = 1;
  let str = '';
  
  //  using if/else
  if (n == 1)
    str = 'one'
  else
    str = 'not one'

  //  using tempary
  str = n == 1 ? 'one' : 'not one'
  ```

  <div id='arithmetic'/>

  4. Arithmetic operators:
  ```js
  +, -, *, **, /, %, ++, --
  ```

  <div id='logical'/>

  5. Logical operators:
  ```js
  &&, ||, !
  ```

  <div id='bitwise'/>

  6. Bitwise operators:
  ```js
  &, |, ~, ^, <<, >>
  ```

  <div id='string'/>

  7. String operators: 
  ```js
  +, +=
  ```

  <div id='type'/>

  8. Type operators:
  ```js
  typeof, instanceof
  ```

<div id='data-types'/>

## **Data Types**

  <div id='functions'/>

  1. **Functions**
  ```js
  function functionName (param1, param2) {
    //  code to be executed
  }
  ```

  <div id='objects'/>

  2. **Objects**
  - A variable that contains many values
    ```js
    const object = {
      property1: "propertyValue 1",
      property2: "propertyValue 2",
      ...
    }
    ```

  - Properties can be accessed by:
    ```js
    object.property1  // propertyValue 1
    //  or
    object[property2] // propertyValue 2
    ```

  <div id='strings'/>

  3. **Strings**
  - Can be initialized with either `''` or `""`
  - `length, +, +=, indexOf(), substring(), charAt()`
  - Character access:
    ```js
    string.charAt(index)
    //  or
    string[index]
    ```
  - String primitives & String object
    ```js
    let str_prim = '1+1'
    let str_obj = new String('1+1')

    typeof s_prim  // "string"
    typeof s_obj   // "object"

    eval(str_prim) // returns the number 4
    eval(str_obj)  // returns the string "2 + 2"

    eval(str_obj.valueOf())  // returns the number 4
      ```

  <div id='numbers'/>

  4. **Numbers**
  - Constants
    ```js
    Number.MAX_VALUE          //  1.7976931348623157e+308
    Number.MIN_VALUE          //  5e-324
    Number.POSITIVE_INFINITY  //  1 / 0
    Number.NEGATIVE_INFINITY  //  -1 / 0
    Number.NaN                //  123 / "abc"
    ```
  - Methods:
    ```js
    let n = 1.5678
    n.toString()        //  "1.5678"
    n.toExponential(2)  //  1.56e+0
    n.toFixed(0)        //  1
    n.toPrecision(2)    //  1.57
    n.valueOf()         //  1.5678

    parseInt("123")     //  123
    parseInt("  123 ")  //  123
    parseInt("123.5")   //  123.5
    parseInt("abc")     //  NaN

    parseFloat("123")   //  123.0
    parseFloat("123.5") //  123.5
    parseFloat("abc")   //  NaN

    Number(true)        //  1
    Number(false)       //  0
    Number("10")        //  10
    Number("  10 ")     //  10
    Number("10.33")     //  10.33
    Number("10,33")     //  NaN
    Number("10 33")     //  NaN
    Number("Jabc")      //  NaN
    ```

  <div id='math'/>

  5. **Math**
  - Constants
    ```js
    Math.PI     //  PI number - 3.141592653589793
    Math.E      //  Euler numer - 2.718281828459045
    Math.SQRT2  //  square root of 2
    ```
  - Methods
    ```js
    const n = 1.234

    //  common methods
    Math.round(n)   //  1
    Math.ceil(n)    //  2
    Math.floor(n)   //  1
    Math.trunc(n)   //  1
    Math.pow(3, 2)  //  9
    Math.sqrt(8, 2) //  3
    Math.abs(-5)    //  5
    Math.sin()
    Math.cos()
    Math.min(1, 0, 5, -7) //  -7
    Math.max(1, 0, 5, -7) //  5
    Math.random() //  random number
    Math.log(1)  //  0

    ...
    ```

  <div id='arrays'/>

  6. **Arrays**
  - Arrays
    ```js
    const array1 = []
    const array2 = ["item 1", "item 2", "item 3"]
    const array3 = new Array("item 1", "item 2", "item 3")
    ```
  - Array Const
    - An array declared with `const` cannot be reassigned BUT an array is not constant, we can change its elements
      ```js
      const bikes = ["Honda", "Kawasaki", "KTM"];

      //  reassign the array
      bikes = ["Yamaha", "Suzuki"];   // ERROR
      
      //  reassign the elements
      bikes[0] = "Brixton"
      bikes.push("Brixton")
      bikes.pop(0)
      ```
    - An array declared with `const` must be assign with value when it's declared
      ```js
      // OK
      const bikes = []

      // NOT OK
      const bikes;
      bikes = ["Honda", "Kawasaki", "KTM"];
      ```
  - Array Methods
    ```js
    const arr = []
    arr.length      //  length of array
    arr.sort()      //  sort array and replace original arr
    arr.push("ab")  //  add element to the end of array
    arr.pop(0)      //  remove last element in array
    arr.shift()     //  remove first element in array
    arr.unshift()   //  add element to the beginning of array
    arr[6] = "ab"   //  add element to custom index in array
    ```

  <div id='date'/>

  7. **Date**
  - ***Create date***
    ```js
    new Date()                        //  current datetime
    new Date(y, m, d, h, min, s, mil) //  date obj with specific datetime
    new Date(mil)                     //  date obj as millisecs from 1/1/1970
    new Date(dateString)              //  date obj from dateString
    ```
  - ***Methods***: 
    Date methods allow you to get and set the year, month, day, hour, minute, second, and millisecond of date objects, using either local time or UTC (universal, or GMT) time.

  <div id='booleans'/>

  8. **Booleans**
  - Comparisons & conditions: 
    ```js
    ==, >, <
    ```
  - Values -> true
    ```js
    Boolean(1)        // true
    Boolean(-1)       // true
    Boolean(1.5)      // true
    Boolean(1+2)      // true
    Boolean("false")  // true
    ```
  - No value -> false
    ```js
    Boolean(0)          // false
    Boolean(-0)         // false
    Boolean("")         // false
    Boolean(null)       // false
    Boolean(undefined)  // false
    Boolean(NaN)        // false
    ```

  <div id='null'/>

  9. **Null, Undefined, NaN**
  ```js
  undefined === undefined //  true
  undefined == undefined  //  true

  null === null           //  true
  null == null            //  true

  undefined == null       //  true
  undefined === null      //  false

  NaN === undefined       //  false
  NaN == undefined        //  false
  NaN === null            //  false
  NaN == null             //  false
  NaN === NaN             //  false
  NaN == NaN              //  false
  ```

<div id='type-conversion'/>

## **Type Conversion**

  <div id='str-num'/>

  1. Strings to Numbers
    ```js
    //  string contains number converts to number
    Number("10")  //  10
    Number("9  ") //  9
    
    //  empty string converts to 0
    Number(" ")   //  0
    Number("")    //  0
    
    //  other strings converts to NaN
    Number("123abc")  //  NaN
    Number("12  3")   //  NaN
    ```

  <div id='num-str'/>

  2. Numbers to Strings
    ```js
    let n = 3
    //  use String()
    String(n)
    String(10)
    String(9 + 1)

    //  use toString()
    n.toString()
    (10).toString()
    (9 + 1).toString()
    ```

  <div id='date-num'/>

  3. Dates to Numbers
    ```js
    d = new Date()
    //  use Number()
    Number(d)     // 1630809495567

    //  use getTime()
    d.getTime()   // 1630809495567
    ```

  <div id='date-str'/>

  4. Dates to Strings
    ```js
    d = new Date()
    //  use String()
    String(d)     // "Sun Sep 05 2021 09:38:15 GMT+0700 (Indochina Time)"

    //  use toString()
    d.toString()  // "Sun Sep 05 2021 09:38:15 GMT+0700 (Indochina Time)"
    ```

  <div id='bool-num'/>

  5. Booleans to Numbers
    ```js
    Number(false)   // 0
    Number(true)    // 1
    ```

  <div id='num-bool'/>

  6. Numbers to Booleans
    ```js
    false.toString()  // "false"
    true.toString()   // "true"
    ```

  <div id='other'/>

  7. Other cases
    ```js
    10 + null         // 10
    "10" + null       // "10null"
    10 + undefined    // NaN
    "10" + undefined  // "10undefined"
    10 + NaN          // NaN
    "10" + NaN        // "10NaN"
    "10" + 2          // "102"
    "10" - 2          // 8
    "10" * "2"        // 20
    "10" * 2          // 20
    "10" / "2"        // 5
    "10" / 2          // 5
    ```

<div id='conditional'/>

## **Conditional statements**

  <div id='ifelse'/>

  1. `if/else`
    ```js
    if (condition1) {
      //  code
    } else if (condition2) {
      //  code
    } else {
      //  code
    }
    ```

  <div id='switch'/>

  2. `switch`
    ```js
    switch(expression) {
      case value1:
        //  code
        break
      case value2:
        //  code
        break
      default:
        //  code
    }
    ```

<div id='loop'/>

## **Loop**

  <div id='for'/>

  1. `for` loop
    ```js
    for (statement 1; statement 2; statement 3) {
      // code
    }
    //  statement 1: executed 1 time before the code
    //  statement 2: define condition for executing the code
    //  statement 3: executed everytime after the code
    ```

  <div id='forin'/>

  2. `for/in` loop
    ```js
    //  for/in loops through properties of object
    for (key in object) {
      // code
    }

    //  for/in loops through indexes of array
    for (index in array) {
      // code
    }
    ```

  <div id='foreach'/>

  3. `Array.forEach()`
    ```js
    array.forEach(function(value) => {
      //  code
    })
    ```

  <div id='while'/>

  4. `while` loop
    ```js
    //  check condition before executing code
    while (condition) {
      // code
    }
    ```

  <div id='dowhile'/>

  5. `do/while` loop
    ```js
    //  execute code before checking condition
    do {
      // code
    }
    while (condition);
    ```

<div id='errors'/>

## **Errors**
  - `try` - test a block of code
  - `catch` - handle an error
  - `throw` - create custom error, code after `throw` would not be executed
  - `finally` - execute after try/catch, regardless of result
  ```js
  //  try/catch
  try {
    // code to try
  } catch(err) {
    // code to catch errors
  } finally {
    //  code executed finally
  }

  //  throw
  function f(n) {
    if(n == 1)
      throw "Error"   // return error as string

    if(n == 0)
      throw 0   // return error as number
  }
  ```

<div id='strict'/>

## **Use Strict**
  - `"use strict"` is used to run code in "strict mode"
    ```js
    //  global
    "use strict"
    n = 1   // ERROR

    //  local
    n = 1   // no error
    function f() {
      "use strict"
      m = 2   // ERROR
    }
    ```
  - `"use strict"` does not allow:
    - Undeclared variable
      ```js
      "use strict"
      a = 1   // ERROR
      ```
    - Deleting a variable/function/undeletable property
      ```js
      "use strict"
      let n = 3.14;
      delete n      // ERROR

      function f(p1, p2) {};
      delete f      // ERROR

      delete Object.prototype   // ERROR
      ```
    - Duplicating param name
      ```js
      "use strict"
      function f(p1, p1) {}   // ERROR
      ```
    - Octal numeric
      ```js
      "use strict"
      let x = 010     // ERROR
      let x = "\010"  // ERROR
      ```
    - Writing to a **read-only/get-only** property
      ```js
      "use strict"
      const obj = {}
      Object.defineProperty(obj, "x", {
        value:0,
        writable:false
      })
      obj.x = 10    // ERROR

      const obj = { get x() { return 0 } }
      obj.x = 10    // ERROR
      ```
    - Use work `eval`/`arguments` as variable
      ```js
      "use strict"
      let eval = 10       // ERROR
      let arguments = 10  // ERROR
      ```

<div id='arrow'/>

## **Arrow Function**
  - Was introduced in JS ES6
    ```js
    //  Before
    function f(name) {
      return `my name is ${name}`
    }

    //  Arrow Function
    const f = (name) => {
      return `my name is ${name}`
    }

    //  Shorter syntax
    const f = name => `my name is ${name}`
    ```
  - `this` represents the owner of the function

<div id='classes'/>

## **Classes**
  ```js
  class className {
    constructor(prop1, prop2) {
      this.prop1 = prop1
      this.prop2 = prop2
    }
    
    method_1() {}
    method_2() {}
  }
  ```

<div id='json'/>

## **JSON - Json Object Notation**
  ```js
  "jsonObject": {
    "prop": "value",
    "propObject": {
      "prop1": "value",
      "prop2": "value",
    },
    "propArray": [
      { "item1": "value" },
      { "item2": "value" }
    ]
  }
  ```

<div id='es67'/>

## **ES6/ES7**

  <div id='destructuring'/>

  1. Destructuring
  - An elegant way to access ***object properties/array elements***
  ```js
  //  destructuring object
  const bike = {
    name: "Honda CB1000R",
    manufacturer: "Honda",
    colors: ["red", "white", "black"],
    origin: {
      country: "Thailand",
      year: "2020"
    }
  }

  const { name, colors, origin: { country } } = bike
  console.log(name)     // "Honda CB1000R"
  console.log(colors)   // ["red", "white", "black"]
  console.log(origin)   // ERROR: country is not defined
  console.log(country)  // Thailand
  

  //  destructuring array
  const numbers = [1, 2, 3, 4, 5]

  const [item1, item2] = numbers
  console.log(item1)  // 1
  console.log(item2)  // 2

  const [item1, , item3, , item5] = numbers
  console.log(item1)  // 1
  console.log(item3)  // 3
  console.log(item5)  // 5

  ```

  <div id='defvalues'/>

  2. Default values
  ```js
  /*
    in default, function params are undefined
  */
  function add(a, b) {
    return a + b
  }
  add(5)    // NaN

  /*
    in ES6, function params can be set with a default value
  */
  function add(a, b = 1) {
    return a + b
  }
  add(5)   // 5

  //  null, underfind, empty string
  function f(num = 1) {
    console.log(num)
  }
  f()     // 1
  f("")   // ""
  f(null) // null
  f(undefined) // 1

  //  also applies to functions
  function print(thing = log()) {
    return thing
  }
  function log() {
    console.log("something")
  }
  print()   // "something"
  //  earlier params available to later default params
  function getName(first, last, full = `${first} ${last}`) {
    return [first, last, full]
  }
  getName('Viet', 'Nguyen')   //  [ 'Viet', 'Nguyen', 'Viet Nguyen' ]

  //  destructuring param with default value
  function f([x, y] = [1, 2], {z} = {z: 3}) {
    return x + y + z
  }
  f()   // 6
  ```

  <div id='swap'/>

  3. Swap variables
  ```js
  //  use destructuring to swap variables
  let a = "a", b = "b"
  [a,b] = [b,a]   // a = "b", b = "a"
  ```
  
  <div id='spread'/>

  4. Spread operator & Rest parameter
  - Rest param `...` - a way to handle function params, it represents an infinite number of arguments passed in a function
    ```js
    //  no rest param
    function f(a, b) {
      return a + b
    }
    console.log(f(1, 2))        // 3
    console.log(f(1, 2, 3, 4))  // 3 -> all arguments are passed in funtion, but we can only use the first 2
    
    //  rest param
    //  rest param stores the arguemtns as an array
    function f(...input) {
      return input.reduce((a,b) => a + b)
    }
    f(1,2,3,4,5)   // 15 -> we can use all arguments passed in the function
    ```
  - Spread operator `...` - used to expands an iterable object into a list of args
    ```js
    let arr = [1,2,3]
    console.log(...[1,2,3])   // 1 2 3 -> split array arr in to list of items of arr

    //  split array into list of args
    let max = Math.max(arr)     // NaN
    let max = Math.max(...arr)  // 3

    //  copy array / add item(s) to array
    let arrCopyWithEquals = arr
    let arrCopyWithSpread = [...arr, 4, 5]
    console.log(arrCopyWithEquals)   // [ 1, 2, 3, 4, 5 ]
    console.log(arrCopyWithSpread)   // [ 1, 2, 3, 4, 5 ]
    //  --> array copied with = or with ... are both equals to original arr
    //  --> BUT if arr changes, array copied with = would also change while array copied with spread would not

    //  connect objects / add property
    const man = { man: "👨" }
    const woman = { woman: "👩" }

    const human = {
      ...man,
      ...woman,
      laugh: () => {console.log("😂".repeat(5))}
    }

    console.log(human)  // { man: '👨', woman: '👩', laugh: [Function: laugh] }
    ```

<div id='ref'/>

## **References**
* w3schools.com/js
* developer.mozilla.org/en-US/docs/Web/JavaScript/