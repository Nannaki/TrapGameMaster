const express = require('express');
const router = express.Router();
const { getUsers, setUsers, updateUsers, deleteUsers } = require('../controllers/usersController');

router.route('/').get(getUsers).post(setUsers);
router.route('/:id').delete(deleteUsers).put(updateUsers);

module.exports = router;