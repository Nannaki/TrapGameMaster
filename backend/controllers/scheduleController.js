const asyncHandler = require('express-async-handler');
const actualsMonths = require('../utils/getActualsMonth');

// @desc    Get actual months
// @route   GET /api/schedule/getActualsMonths
// @access  Private
const getActualsMonths = () => {
    const months = actualsMonths;

    return months
}



module.exports = {
    getActualsMonths,
}