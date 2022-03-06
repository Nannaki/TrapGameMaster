import axios from 'axios';

const API_URL = 'http://localhost:5000/api/rooms/';

//Get rooms
const getRooms = async () => {
    const response = await axios.get(API_URL + 'show');
    return response.data;
};

const roomsService = {
    getRooms,
}

export default roomsService