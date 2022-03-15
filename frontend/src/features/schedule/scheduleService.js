import axios from 'axios';

const API_URL = 'http://localhost:5000/api/schedule/';

//GetActualsMonths
const getActualsRooms = async () => {
    const response = await axios.get(API_URL + 'actualsMonths');
    return response.data;
};


const scheduleService = {
    getActualsRooms,
}

export default scheduleService