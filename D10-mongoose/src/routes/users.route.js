const express = require('express')
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  setActive,
} = require('../controllers/users.controller')
const { requireAuth } = require('../middlewares/auth.middleware')

const router = express.Router()

router.use(requireAuth)

router.route('/')
  .get(getUsers)
  .post(createUser)

router.route('/:id')
  .get(getUser)
  .put(updateUser)

router.route('/:id/active')
  .patch(setActive(1))

router.route('/:id/inactive')
  .patch(setActive(0))

module.exports = router