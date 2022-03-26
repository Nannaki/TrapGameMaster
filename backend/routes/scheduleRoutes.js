const express = require('express');
const router = express.Router();
const {getActualsMonths, getAllDaysInMonth, registerUserAvailblity, getUsersAvailblity, addNewEventSchedule,
    getEventsFromSchedule, deleteEvent
} = require('../controllers/scheduleController');
const { protect } = require('../middleware/authMiddleware');

router.get('/actualsMonths', getActualsMonths);
router.get('/getEvents', getEventsFromSchedule);
router.post('/getUserAvailblity', getUsersAvailblity)
router.post('/alldaysinmonth', getAllDaysInMonth);
router.post('/registerUserAvailblity', registerUserAvailblity);
router.post('/addNewEventSchedule',addNewEventSchedule);
router.delete('/deleteEvent:id', deleteEvent)

module.exports = router
