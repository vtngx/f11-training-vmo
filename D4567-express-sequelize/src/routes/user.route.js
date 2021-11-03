const {
  getUsers,
  createUser,
  deleteUser,
  activeUser,
  updateUser,
  inactiveUser,
  getSingleUser,
} = require('../controllers/user.controller')
const {
  validateUser,
  validateParamId,
} = require('../utils/validatior')
const { requireAuth } = require('../middlewares/auth.middleware')

const express = require('express')

const router = express.Router()

router.use(requireAuth)

router.route('/')
  .get(getUsers)
  .post(validateUser(), createUser)

router.route('/:id')
  .get(validateParamId(), getSingleUser)
  .put(validateParamId(), validateUser('update'), updateUser)
  .delete(validateParamId(), deleteUser)

router.route('/:id/active')
  .patch(validateParamId(), activeUser)

router.route('/:id/inactive')
  .patch(validateParamId(), inactiveUser)

module.exports = router