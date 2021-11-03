const {
  connectStrings,
  sumOfArgs,
  sortArrayDesc,
  printCharsDuplication,
  getObjAttr,
  treeifyJson,
  readJsonFromFile,
  writeJsonToFile,
  getPropJSON,
} = require("./functions")

const main = async () => {
  // 3.1
  console.log("\n# 3.1")
  const str1 = "Hello", str2 = "world"
  const connectedStr = connectStrings(str1, str2)
  console.log("Connected strings:", connectedStr)

  // 3.2
  console.log("\n# 3.2")
  const sum = sumOfArgs(1, 2, 3, 4, 5, 6, 7, 8, 9, 9.5)
  console.log("Sum of args: ", sum)

  // 3.3
  console.log("\n# 3.3")
  const arr = [10, 2, 5, 3, 9, 20, 8];
  const sortedArr = sortArrayDesc(arr)
  console.log("Array sorted descendingly: ", sortedArr)

  // 3.4
  console.log("\n# 3.4")
  const string = "aaaabbbdddccccchhgt"
  printCharsDuplication(string)

  // 3.5
  console.log("\n# 3.5")
  const product = {
    name: 'Dell precision 5540',
    model: 'DELL',
    year: 2021,
    price: {
      unitPrice: 350,
      tax: 25,
      discount: 10,
      total: 365
    }
  }
  getObjAttr(product, "keys")
  getObjAttr(product, "values")
  getObjAttr(product, "keyValuePairs")

  // 3.6
  console.log("\n# 3.6")
  
  // test data is stored in ./data
  const testData = await readJsonFromFile("./data/test_json.input.json")

  // execute json to tree
  const tree = treeifyJson(testData)
  console.log(JSON.stringify(tree, null, 2))

  // // write output to .jon file
  await writeJsonToFile("./data/test_json.output.json", tree),

  // 3.7
  console.log("\n# 3.7")
  const kvPairs = getPropJSON(tree)
  console.log("Key-value pairs of JSON tree:", kvPairs)
}

main()
