const {
  getUsers,
  createFile,
  deleteFile,
  getAbsolutePath,
} = require('./functions')
const {
  handleError,
  baseResponse,
} = require('./utils')
const url = require('url') 

//  GET routes handler
const handleGET = async (req, res) => {
  const routes = [
    "/api/users",
    "/api/files",
  ]

  const { pathname } = url.parse(req.url)
  if (!routes.includes(pathname))
    return handleError(res, 404)

  if (pathname === "/api/users") {    //  3.1
    const data = await getUsers()
    
    if(!data)
      return handleError(res, 503) 

    return baseResponse(res, data)
  } else if (pathname === "/api/files") {   //  3.4
    const data = {
      data: getAbsolutePath()
    }
    
    return baseResponse(res, JSON.stringify(data))
  }
}

//  POST routes handler
const handlePOST = async (req, res) => {
  const routes = [
    "/api/files",
  ]

  const { pathname } = url.parse(req.url)
  if (!routes.includes(pathname))
    return handleError(res, 404)

  if (pathname === "/api/files") {    //  3.3
    const data = await createFile() 
      ? { status: "Success" }
      : { status: "Fail" }
    return baseResponse(res, JSON.stringify(data))
  }
}

//  DELETE routes handler
const handleDELETE = async (req, res) => {
  const routes = [
    "/api/files",
  ]

  const { pathname } = url.parse(req.url)
  if (!routes.includes(pathname))
    return handleError(res, 404)

  if (pathname === "/api/files") {
    const data = await deleteFile() 
      ? { status: "Success" }
      : { status: "Fail" }
    return baseResponse(res, JSON.stringify(data))
  }
}

module.exports = {
  handleGET,
  handlePOST,
  handleDELETE,
}