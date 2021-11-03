/*
  1.
  Kiểm tra 2 string có giống nhau và bị thay đổi vị trí của các ký tự
*/
const isInversionText = (str1, str2) => {
  let result = false

  str1 = str1.replace(/ /g,'')
  str2 = str2.replace(/ /g,'')

  result = str1.split('').sort().join('') === str2.split('').sort().join('')

  return result;
}

/*
  2.
  Tìm 2 số liên tiếp trong array có tổng bằng với kết quả cho trước
*/
const getTwoNumbersConsecutive = (arr, resultExpect) => {
  let result = null

  let minDiff = resultExpect
  for (let i = 0; i < arr.length; i++) {
    const secondNum = resultExpect - arr[i]
    if (arr.includes(secondNum, i)) {      
      const diff = Math.abs(arr[i] - secondNum)

      if (diff < minDiff) {
        minDiff = diff
        result = { index: [i, arr.indexOf(secondNum, i)] }
        break
      }
    }
  }
  
  return result
}

/*
  3.
  Tìm index của các phần tử bằng nhau trong 2 array
*/
const getIndexsSameFromTwoArrays = (arr1, arr2) => {
  let result = null

  for (let i = 0; i < arr1.length; i++) {
    if (arr2.includes(arr1[i])) {
      if (!result)
        result = { index: [] }
      
      result.index = [
        ...result.index,
        ...arr2.reduce((a, e, index) => {
          if (e === arr1[i])
            a.push(`${i} - ${index}`)
          
          return a
        }, []) 
      ]
    }
  }
  
  return result
}

/*
  main
*/
const main = () => {
  //  1
  console.log("# 1.")
  const str1 = 'records'
  const str2 = 'rescord'
  console.log(isInversionText(str1, str2))
  
  const str3 = 'number of records'
  const str4 = 'nubermrecoofrds'
  console.log(isInversionText(str3, str4))

  const str5 = 'number of records1'
  const str6 = 'nubermrecoofrds'
  console.log(isInversionText(str5, str6))

  //  2
  console.log("\n# 2.")
  const arr = [ 10, 2, 3, 5, 6, 8, 5, 7, 7 ]

  console.log(getTwoNumbersConsecutive(arr, 15))
  console.log(getTwoNumbersConsecutive(arr, 14))
  console.log(getTwoNumbersConsecutive(arr, 5))
  console.log(getTwoNumbersConsecutive(arr, 9))

  //  3
  console.log("\n# 3.")
  const arr1 = [ 10, 2, 3, 5, 6, 9, 5, 4 ];
  const arr2 = [ 4, 3, 9 ];

console.log(getIndexsSameFromTwoArrays(arr1, arr2))
}

main()