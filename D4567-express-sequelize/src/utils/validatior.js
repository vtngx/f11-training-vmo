const { param, body } = require('express-validator')

const validateParamId = () => {
  return [
    param("id", "id must be UUID type").isUUID()
  ]
}

const validateUser = (type) => {
  const validations = [
    body("username")
      .exists().withMessage("username cannot be blank").bail()
      .notEmpty().withMessage("username cannot be blank").bail()
      .isString().withMessage("username must be a string").bail(),
      body("password")
        .exists().withMessage("password cannot be blank").bail()
        .notEmpty().withMessage("password cannot be blank").bail()
        .isString().withMessage("password must be a string").bail(),
    body("age")
      .exists().withMessage("age cannot be blank").bail()
      .notEmpty().withMessage("age cannot be blank").bail()
      .isNumeric().withMessage("age myst be numeric").bail(),
    body("email")
      .exists().withMessage("email cannot be blank").bail()
      .notEmpty().withMessage("email cannot be blank").bail()
      .isEmail().withMessage("email malformed").bail(),
    body("phone")
      .exists().withMessage("phone cannot be blank").bail()
      .notEmpty().withMessage("phone cannot be blank").bail()
      .isMobilePhone().withMessage("phone number malformed").bail(),
    body("address")
      .exists().withMessage("address cannot be blank").bail()
      .notEmpty().withMessage("address cannot be blank").bail()
      .isString().withMessage("address must be a string").bail(),
    body("isActive")
      .exists().withMessage("isActive cannot be blank").bail()
      .notEmpty().withMessage("isActive cannot be blank").bail()
      .isNumeric().withMessage("isActive must be numeric").bail()
      .isIn([1, 0]).withMessage("isActive must be 0 or 1"),
  ]
  if (type === 'update')
    validations.push(
      body("customer")
        .exists().withMessage("customer is missing").bail(),
      body("customer.isActive")
        .exists().withMessage("customer.isActive cannot be blank").bail()
        .notEmpty().withMessage("customer.isActive cannot be blank").bail()
        .isNumeric().withMessage("customer.isActive must be numeric").bail()
        .isIn([1, 0]).withMessage("customer.isActive must be 0 or 1"),
      body("customer.paymentMethod")
        .exists().withMessage("customer.paymentMethod cannot be blank").bail()
        .optional({ nullable: true }).bail()
        .notEmpty().withMessage("customer.paymentMethod cannot be blank").bail()
        .isNumeric().withMessage("customer.paymentMethod must be numeric").bail()
        .isLength({ max: 10 }).withMessage("customer.paymentMethod maximum length is 10")
    )
  return validations
}

module.exports = {
  validateParamId,
  validateUser,
}