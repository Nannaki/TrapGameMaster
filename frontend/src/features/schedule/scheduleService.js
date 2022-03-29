import axios from 'axios';

const API_URL = 'http://localhost:5000/api/schedule/';

//GetActualsMonths
const getActualsMonths = async () => {
    const response = await axios.get(API_URL + 'actualsMonths', {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token
        },
    })
    return response.data;
};

//GetAllDaysInMonth
const getAllDaysInMonth = async (dateData) => {
    const response = await axios.post( API_URL + 'alldaysinmonth', dateData, {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token
        },
    })
    return response.data;
}

//RegisterUserAvailblity
const registerUserAvailblity = async (availblityData) => {
    const response = await axios.post( API_URL + 'registerUserAvailblity', availblityData, {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token
        },
    })
    return response.data;
}

//GetUsersAvailblity
const getUsersAvailblity = async (dateData) => {
    const response = await axios.post( API_URL + 'getUserAvailblity', dateData, {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token
        },
    })
    return response.data;
}


const scheduleService = {
    getActualsMonths,
    getAllDaysInMonth,
    getUsersAvailblity,
    registerUserAvailblity,
}

export default scheduleService