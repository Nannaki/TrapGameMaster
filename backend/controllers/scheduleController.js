//Déclaration constantes et requis
const asyncHandler = require('express-async-handler');
const AvailblitySchedule = require('../models/availablityScheduleModel');
const DataScheduler = require('../models/dataSchedulerModel');


// @desc    Charger le mois actuel
// @route   GET /api/schedule/getActualsMonths
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

// @desc    Charger tous les jours d'un mois
// @route   Post /api/schedule/getAllDaysInMonth
const getAllDaysInMonth = asyncHandler( async (req, res) => {
    const month = parseInt(req.body.month);
    const year = parseInt(req.body.year);
    let daysInYear = [];
    let allDaysInMount = [];
    let daysUnchanged = [];

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
        daysUnchanged.push(tmp[0]);
    }

    if(allDaysInMount.length === 0) {
        res.status(400);
        throw new Error('Données invalides')
    }
    res.status(201).json(
        {
            local: allDaysInMount,
            unchanged: daysUnchanged
        }
    )
})

// @desc    Charger les disponibilités d'un utilisateur
// @route   Post /api/schedule/getUserAvailblity
const getUsersAvailblity = asyncHandler( async (req, res) => {
    const availblitys = await AvailblitySchedule.find({month:req.body.month.toString(), year:req.body.year.toString()});
    res.status(201).json(availblitys)
})

// @desc    Charger les évènements pour le Scheduler
// @route   Post /api/schedule/getEventsSchedule
const getEventsFromSchedule = asyncHandler( async (req, res) => {
    const events = await DataScheduler.find()

    if(!events) {
        res.status(400).json({message: "Aucun évènements trouvés"})
    }
    else {
        res.status(201).json(events)
    }
})

// @desc    Enregistrer les disponibilités d'un utilisateur
// @route   Post /api/schedule/registerUserAvailblity
const registerUserAvailblity = asyncHandler(async (req, res) => {
    const {name, availblity} = req.body
    const month = req.body.choosedMonth
    const exists = await AvailblitySchedule.findOne({month})

    if(exists) {
        res.status(400)
        throw new Error('Vous avez déjà envoyé vos disponibilités pour ce mois')
    }
    const availblityUser = await AvailblitySchedule.create({
        name,
        month: req.body.choosedMonth,
        year: req.body.chooseYear,
        availblity,
    })

    if(availblityUser) {
        res.status(201).json(availblityUser)
    }
    else {
        res.status(400);
        throw new Error('Données invalides');
    }
} )

// @desc    Enregistrer les évènements depuis le scheduler
// @route   Post /api/schedule/addNewEventSchedule
const addNewEventSchedule = asyncHandler( async (req, res) => {
    const newEvent = await DataScheduler.create({
        id: req.body.id,
        start: req.body.start,
        end: req.body.end,
        text: req.body.text,
        resource: req.body.resource,
        backColor: req.body.backColor,
    })
    res.status(201).json(newEvent)
})

// @desc    Supprimer les évènements dans le scheduler
// @route   Delete /api/schedule/deleteEvent
const deleteEvent = asyncHandler( async (req, res) => {
    const eventId = req.params
    const check = DataScheduler.findOne({eventId});

    if(!check) {
        res.status(400)
        throw new Error("Evènement introuvable")
    }
    else {
        await DataScheduler.findOneAndDelete(eventId)
        res.status(201)
    }
})

//Exports des fonctions
module.exports = {
    getActualsMonths,
    getAllDaysInMonth,
    getUsersAvailblity,
    registerUserAvailblity,
    addNewEventSchedule,
    getEventsFromSchedule,
    deleteEvent,
}