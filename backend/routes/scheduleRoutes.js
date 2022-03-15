const express = require('express');
const router = express.Router();
const {getActualsMonths} = require('../controllers/scheduleController');
const { protect } = require('../middleware/authMiddleware');

router.get('/actualsMonths', getActualsMonths)


module.exports = router
