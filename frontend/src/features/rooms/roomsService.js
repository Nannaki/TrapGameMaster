import axios from 'axios';

const API_URL = 'http://localhost:5000/api/rooms/';

//Get rooms
const getRooms = async () => {
    const response = await axios.get(API_URL + 'show', {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token
        },
    })
    return response.data;
};

//Get roomById
const getRoomById = async (roomId) => {
    const response = await axios.get( API_URL + 'getOne' +roomId, {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token
        },
    })
    return response.data
}

//Add room
const addRoom = async (roomData) => {
    const response = await axios.post(API_URL + 'addroom', roomData,{
        headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token
        },
    })
    return response.data;
};

//Update Room
const updateRoom = async (roomData) => {
    const response = await axios.put( API_URL + 'updateroom' +roomData.id, roomData, {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token
        },
    })
    return response.data;
}

//Delete room
const deleteRoom = async (roomId) => {
    const response = await axios.delete(API_URL + "delete" +roomId, {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token
        },
    })
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