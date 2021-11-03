const fs = require('fs')

/*
  3.1
  I: 2 strings
  O: return string là 2 strings input nốt với nhau
*/
const connectStrings = (str1, str2) => `${str1} ${str2}`

/*
  3.2
  I: 2 (hoặc hơn) float numbers
  O: return tổng của các số đó
*/
const sumOfArgs = (...args) => {
  if (args.length < 2)
    return "number of args must be >= 2"
  
  return args.reduce((a, b) => a + b)
}

/*
  3.3
  I: array of numbers
  O: return array sắp xếp theo thứ tự giảm dần
*/
const sortArrayDesc = (arr) => {
  let iMin

  // selection sort
  for (let i = 0; i < arr.length; i++) {
    iMin = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] > arr[iMin]) {
        iMin = j
      }
    }
    [arr[i], arr[iMin]] = [arr[iMin], arr[i]]
  }

  return arr
}

/*
  3.4
  I: 1 string
  O: print string số lượng các chữ số liên tiếp giống nhau
*/
const printCharsDuplication = (string) => {
  let result = ""
  let char = string.charAt(0)
  let countChar = 1

  for (let i = 1; i < string.length; i++) {
    if (char === string.charAt(i)) {
      countChar += 1;
    } else {
      result += `${char}${countChar}`
      char = string.charAt(i)
      countChar = 1
    }
    if (i === string.length - 1)
      result += `${char}${countChar}`
  }

  console.log("Print chars duplication:", result)
}

/*
  3.5
  I: 1 object, loại attribute
  O: print các attribute của object
*/
const getObjAttr = (obj, att) => {
  const attributes = att === "keys"
    ? Object.keys(obj)
    : att === "values"
      ? Object.values(obj)
      : att === "keyValuePairs"
        ? Object.entries(obj).map(pair => {
          return {
            key: pair[0],
            value: pair[1]
          }
        })
        : null
  console.log(`${att}: `, attributes)
}

/*
  3.6
  I: JSON data
  O: JSON data in Tree structure
*/
const treeifyJson = (jsonData) => {
  try {
    //  return empty arr if JSON object is null
    if (Object.keys(jsonData).length === 0)
      return []

    //  return JSON object if its type is not Array
    if (jsonData.constructor !== Array)
      return jsonData

    //  return empty array if JSON array is empty
    if (jsonData.length === 0)
      return jsonData
    
    let hashTable = Object.create({})

    //  create hashtable of nodes - key = id of node
    jsonData.forEach(data => hashTable[data.id] = {
      ...data,
      children: []
    })

    const tree = []

    //  if node has parentId, add node to its parent's children list
    jsonData.forEach(data => {
      data.parentId 
        ? hashTable[data.parentId].children.push(hashTable[data.id])
        : tree.push(hashTable[data.id])
    })
    
    return tree
  } catch (e) {
    return e
  }
}

/*
  3.7
  I: JSON in Tree structure (from 3.6)
  O: All key-value pairs of input data
*/
const getPropJSON = jsonData => {
  const result = []
  const recursiveGetPropJSON = (obj) => {
    Object.keys(obj).forEach(key => {
      //  add key value pair to result
      result.push({
        key,
        value: obj[key]
      })

      //  if the value is 'object' type, find more key-value in it
      if (typeof obj[key] === 'object' && obj && obj[key])
        recursiveGetPropJSON(obj[key])
    })
  }
  recursiveGetPropJSON(jsonData)
  return result
}

const readJsonFromFile = async (file) => {
  const data = await fs.readFileSync(file, { encoding:'utf8', flag:'r' })
  try {
    return JSON.parse(data)
  } catch(e) {
    return null
  }
}

const writeJsonToFile = async (file, data) => {
  if (!data)
    console.error("Write JSON to file failed.")
  
  try {
    const jsonData = JSON.stringify(data, null, 2)
    await fs.writeFileSync(file, jsonData, { flag:'w' })
    console.log(`Done. Check output at ${file}`)
  } catch(e) {
    throw e
  }
}

module.exports = {
  connectStrings,
  sumOfArgs,
  sortArrayDesc,
  printCharsDuplication,
  getObjAttr,
  treeifyJson,
  readJsonFromFile,
  writeJsonToFile,
  getPropJSON
}