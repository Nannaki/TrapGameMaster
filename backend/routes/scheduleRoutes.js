const express = require('express');
const router = express.Router();
const {getActualsMonths, getAllDaysInMonth} = require('../controllers/scheduleController');
const { protect } = require('../middleware/authMiddleware');

router.get('/actualsMonths', getActualsMonths)
router.get('/alldaysinmonth', getAllDaysInMonth)

module.exports = router
