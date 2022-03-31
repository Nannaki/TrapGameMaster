//Import
import axios from 'axios';

//Adresse des rooms dans l'api
const API_URL = 'http://localhost:5000/api/rooms/';

//Fonction qui retourne le salles, appel en BDD
const getRooms = async () => {
    const response = await axios.get(API_URL + 'show', {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token
        },
    })
    return response.data;
};

//Fonction qui retourne une salle selon son ID, appel en BDD
const getRoomById = async (roomId) => {
    const response = await axios.get( API_URL + 'getOne' +roomId, {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token
        },
    })
    return response.data
}

//Fonction qui enregistre une salle, appel en BDD
const addRoom = async (roomData) => {
    const response = await axios.post(API_URL + 'addroom', roomData,{
        headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token
        },
    })
    return response.data;
};

//Fonction qui modifie une salle, appel en BDD
const updateRoom = async (roomData) => {
    const response = await axios.put( API_URL + 'updateroom' +roomData.id, roomData, {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token
        },
    })
    return response.data;
}

//Fonction qui supprime une salle, appel en BDD
const deleteRoom = async (roomId) => {
    const response = await axios.delete(API_URL + "delete" +roomId, {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token
        },
    })
    return response.data;
}

//Déclaration des fonctions du service
const roomsService = {
    getRooms,
    getRoomById,
    addRoom,
    updateRoom,
    deleteRoom,
}

export default roomsService