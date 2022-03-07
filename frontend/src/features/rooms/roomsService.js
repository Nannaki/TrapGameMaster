import axios from 'axios';

const API_URL = 'http://localhost:5000/api/rooms/';

//Get rooms
const getRooms = async () => {
    const response = await axios.get(API_URL + 'show');
    return response.data;
};

//Delete room
const deleteRoom = async (roomId) => {
    const response = await axios.delete(API_URL + "delete" +roomId);
    return response.data;
}

const roomsService = {
    getRooms,
    deleteRoom,
}

export default roomsService