const asyncHandler = require('express-async-handler');
const AvailblitySchedule = require('../models/availablityScheduleModel');


// @desc    Get actual months
// @route   GET /api/schedule/getActualsMonths
// @access  Private
const getActualsMonths = asyncHandler( async (req,res) => {

    function getMounthInYearUTC(){
        let actualDay = new Date(Date.now())
        let months = []

        while (actualDay.getUTCMonth() < 11) {
            months.push(new Date(actualDay))
            actualDay.setUTCMonth(actualDay.getUTCMonth() + 1);
        }

        months.push(new Date(actualDay.setUTCMonth(actualDay.getUTCMonth())))

        return months
    }

    let getTmpMonth = []
    let finalMonth = []

    getTmpMonth.push(getMounthInYearUTC())

    for (let i = 0; i < getTmpMonth[0].length; i++ ) {
        let tmp = []

        tmp.push(getTmpMonth[0][i])
        finalMonth.push( {
                monthNumeric: tmp[0].getMonth(),
                month: tmp[0].toLocaleDateString('fr-ch', {month: 'long'})
            }
        )
    }


    res.status(201).json(finalMonth)
})

// @desc    Post all days in month
// @route   Post /api/schedule/getAllDaysInMonth
// @access  Private
const getAllDaysInMonth = asyncHandler( async (req, res) => {

    console.log(req.body)
    const month = parseInt(req.body.month);
    const year = parseInt(req.body.year);
    let daysInYear = [];
    let allDaysInMount = [];

    function getDaysInMonthUTC(month, year) {
        let date = new Date(Date.UTC(year, month, 1));
        let days = [];
        while (date.getUTCMonth() === month) {
            days.push(new Date(date));
            date.setUTCDate(date.getUTCDate() + 1);
        }
        return days;

    }

    daysInYear.push(getDaysInMonthUTC(month, year));

    for (let i = 0; i < daysInYear[0].length; i++) {
        let tmp = [];

        tmp.push(daysInYear[0][i]);
        allDaysInMount.push(tmp[0].toLocaleDateString('fr-ch', {weekday: 'long'}) + " " + tmp[0].getDate() + " " + tmp[0].toLocaleDateString('fr-ch', {month: 'long'}) + " " + tmp[0].getFullYear());
    }

    if(allDaysInMount.length === 0) {
        res.status(400);
        throw new Error('Données invalides')
    }

    res.status(201).json(allDaysInMount)
})

// @desc    RegisterUserAvailblity
// @route   POST /api/schedule/registerUserAvailblity
// @access  Private

const registerUserAvailblity = asyncHandler(async (req, res) => {
    const { name, month, year, availblity} = req.body

    const availblityUser = await AvailblitySchedule.create({
        name,
        month,
        year,
        availblity,
    })

    if(availblityUser) {
        req.status(201)
    }
    else {
        res.status(400);
        throw new Error('Données invalides');
    }
} )


module.exports = {
    getActualsMonths,
    getAllDaysInMonth,
    registerUserAvailblity,
}