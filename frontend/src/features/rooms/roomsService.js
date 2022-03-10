import axios from 'axios';

const API_URL = 'http://localhost:5000/api/rooms/';

//Get rooms
const getRooms = async () => {
    const response = await axios.get(API_URL + 'show');
    return response.data;
};

//Get roomById
const getRoomById = async (roomId) => {
    const response = await axios.get( API_URL + 'getOne' +roomId);
    return response.data
}

//Add room
const addRoom = async (roomData) => {
    const response = await axios.post(API_URL + 'addroom', roomData);
    return response.data;
};

//Update Room
const updateRoom = async (roomData) => {
    const response = await axios.put( API_URL + 'updateroom' +roomData.id, roomData);
    return response.data;
}

//Delete room
const deleteRoom = async (roomId) => {
    const response = await axios.delete(API_URL + "delete" +roomId);
    return response.data;
}

const roomsService = {
    getRooms,
    getRoomById,
    addRoom,
    updateRoom,
    deleteRoom,
}

export default roomsService