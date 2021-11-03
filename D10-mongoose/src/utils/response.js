const sendResponse = (data, res) => {
  return res.status(200).json({
    success: true,
    data
  })
}

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken()

  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXP * 24 * 60 * 60 * 1000),
    httpOnly: true
  }

  return res
    .status(statusCode)
    .cookie('token', token, cookieOptions)
    .json({
      success: true,
      token,
      user
    })
}

module.exports = {
  sendResponse,
  sendTokenResponse,
}