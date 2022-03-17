import axios from 'axios';

const API_URL = 'http://localhost:5000/api/schedule/';

//GetActualsMonths
const getActualsMonths = async () => {
    const response = await axios.get(API_URL + 'actualsMonths');
    return response.data;
};

//GetAllDaysInMonth
const getAllDaysInMonth = async (dateData) => {
    const response = await axios.post( API_URL + 'alldaysinmonth', dateData);
    return response.data;
}


const scheduleService = {
    getActualsMonths,
    getAllDaysInMonth,
}

export default scheduleService