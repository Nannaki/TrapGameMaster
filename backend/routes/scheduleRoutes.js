const express = require('express');
const router = express.Router();
const {getActualsMonths, getAllDaysInMonth, registerUserAvailblity} = require('../controllers/scheduleController');
const { protect } = require('../middleware/authMiddleware');

router.get('/actualsMonths', getActualsMonths);
router.post('/alldaysinmonth', getAllDaysInMonth);
router.post('/registerUserAvailblity', registerUserAvailblity);

module.exports = router
