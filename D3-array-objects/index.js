const {
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
} = require('./functions')

const main = () => {
  const users = [
    {
      username: 'test1',
      email: 'test1@vmodev.com',
      age: 20,
      status: 'inactive'
    },
    {
      username: 'test2',
      email: 'test2@vmodev.com',
      age: 25,
      status: 'inactive'
    },
    {
      username: 'test3',
      email: 'test3@vmodev.com',
      age: 26,
      status: 'inactive'
    }
  ]

  //  5.1.1
  console.log('\n# 5.1.1')
  console.log(mapUsers(users))

  //  5.1.2
  console.log('\n# 5.1.2')
  console.log(filterUsers1(users))
  console.log(filterUsers2(users))
  console.log(filterUsers3(users))

  //  5.1.3
  console.log('\n# 5.1.3')
  console.log(getUserEntries(users))

  const url = 'https://localhost:8080?name=Nguyen Van A&age=20'

  //  5.2
  console.log('\n# 5.2')
  console.log(getQueryUrl(url))
  console.log(replaceStrUrl(url, 'name', 'fullname'))
  console.log(replaceAllStrUrl(url, / /g, '%20'))

  //  5.3
  console.log('\n# 5.3')
  const obj1 = { username: 'test1', email: 'test1@vmodev.com', age: 20 }
  const obj2 = { status: 'inactive' }
  const obj3 = { company: 'VMO' }

  console.log(mergeObjects(obj1, obj2, obj3))

  //  5.4
  console.log('\n# 5.4')
  const users1 = [
    { username: 'test1', email: 'test1@vmodev.com', age: 20, status: 'inactive' },
    { username: 'test2', email: 'test2@vmodev.com', age: 25, status: 'inactive' }
  ]
  const users2 = [
    { username: 'test2_1', email: 'test2_1@vmodev.com' }
  ]
  const users3 = [
    { username: 'test3_1', status: 'inactive' },
    { username: 'test3_2', status: 'inactive' }
  ]

  console.log(mergeArrays(users1, users2, users3))
}

main()