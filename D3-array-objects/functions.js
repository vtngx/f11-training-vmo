/*
  5.1.1
  Use map() update User's properties
    age -> +1
    email -> "*****@vmodev.com"
    status -> "active"
*/
const mapUsers = users => {
  return users.map(u => {
    return {
      ...u,
      age: u["age"] + 1,
      email: formatEmail(u.email),
      status: "active"
    }
  })
}

const formatEmail = email => {
  const acc = email.replace("@vmodev.com", "")
  return new Array(acc.length).fill("*").join("") + "@vmodev.com"
}

/*
  5.1.2
  Use filter() find Users
    1. age < 28
    2. status = "active"
    3. age < 25 && status = "inactive"
*/
const filterUsers1 = users => users.filter(u => u.age < 28)
const filterUsers2 = users => users.filter(u => u.status === "active")
const filterUsers3 = users => users.filter(u => u.age < 25 && u.status === "inactive")

/*
  5.1.3
  Use forEach() print key-value pairs
*/
const getUserEntries = users => {
  const entries = []
  users.forEach(u => 
    Object.entries(u).forEach(entry => 
      entries.push({
        key: entry[0],
        value: entry[1]
      })
    )
  )
  return entries
}

/*
  5.2
  from an url string:
    - use split() get params value
    - replace 'name' with 'fullname'
    - replace ' ' with '%20'
*/
const getQueryUrl = url => {
  const query = url.split('?')[1]
  const validQuery = /^[?#]/.test(query)
    ? query.slice(1)
    : query

  return validQuery.split('&').reduce((params, param) => {
    let [k, v] = param.split('=')
    params[k] = v 
      ? decodeURIComponent(v.replace(/\+/, ' ')) 
      : '';
    return params
  }, {})
}

const replaceStrUrl = (url, oldStr, newStr) => url.replace(oldStr, newStr)

const replaceAllStrUrl = (url, oldStr, newStr) => url.replace(oldStr, newStr)

/*
  5.3
  merge json objects
*/
const mergeObjects = (...objs) =>
  objs.reduce((combined, obj) => {
    return {
      ...combined,
      ... obj
    }
  }, {})

/*
  5.4
  merge arrays
*/
const mergeArrays = (...arrays) => 
  arrays.reduce((merged, arr) => 
    [
      ...merged,
      ... arr
    ], []
  )

module.exports = {
  mapUsers,
  filterUsers1,
  filterUsers2,
  filterUsers3,
  getUserEntries,
  getQueryUrl,
  replaceStrUrl,
  replaceAllStrUrl,
  mergeObjects,
  mergeArrays,
}