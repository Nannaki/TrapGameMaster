const express = require('express');
const router = express.Router();
const {getActualsMonths, getAllDaysInMonth, registerUserAvailblity, getUsersAvailblity, addNewEventSchedule,
    getEventsFromSchedule, deleteEvent
} = require('../controllers/scheduleController');
const { protect, authMiddleware} = require('../middleware/authMiddleware');

router.get('/actualsMonths',authMiddleware, getActualsMonths);
router.get('/getEvents',authMiddleware, getEventsFromSchedule);
router.post('/getUserAvailblity',authMiddleware, getUsersAvailblity)
router.post('/alldaysinmonth',authMiddleware, getAllDaysInMonth);
router.post('/registerUserAvailblity',authMiddleware, registerUserAvailblity);
router.post('/addNewEventSchedule',authMiddleware, addNewEventSchedule);
router.delete('/deleteEvent:id',authMiddleware, deleteEvent)

module.exports = router
