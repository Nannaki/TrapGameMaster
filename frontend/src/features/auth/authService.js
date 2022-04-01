//Import
import axios from "axios";

//Adresse des rooms dans l'api
const API_URL = 'http://localhost:5000/api/users/';

//Fonction qui retourne les utilisateurs, appel en BDD
const getUsers = async () => {
    const response = await axios.get( API_URL + 'show',{
        headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token
        },
    });
    return response.data;
}

//Fonction qui retourne un utilisateur selon son ID, appel en BDD
const getUserById = async (userId) => {
    const response = await axios.get( API_URL + 'getOne' +userId, {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token
        },
    });
    return response.data;
}

//Fonction qui retourne les salles non masterisés d'un utilisateur, appel en BDD
const getUnmasterizedRoomFromUser = async (userId) => {
    const response = await axios.get( API_URL +'getunmasterizedroomsfromuser' +userId, {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token
        },
    })
    return response.data;
}

//Fonction qui enregistre un nouvel utilisateur, appel en BDD
const register = async (userData) => {
    const response = await axios.post(API_URL + 'registerGm', userData, {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token
        },
    });
    return response.data;
};

//Fonction qui modifie un utilisateur, appel en BDD
const updateUser = async (userData) => {
    const response = await axios.put( API_URL + 'updateuser' +userData.id, userData, {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token
        },
    });
    return response.data
}

//Fonction qui ajoute une nouvelle salle à un utilisateur, appel en BDD
const addRoomToUser = async (userData) => {
    const response = await axios.put( API_URL + 'addroomtouser' +userData.id, userData, {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token
        },
    })
    return response.data
}

//Fonction qui supprime une salle à un utilisateur, appel en BDD
const deleteRoomOfUser = async (userData) => {
    const response = await axios.put( API_URL + 'deleteuserroom' +userData.id, userData, {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token
        },
    })
    return response.data
}

//Fonction qui supprime un utilisateur, appel en BDD
const deleteUser = async (userId) => {
    const response = await axios.delete( API_URL + "delete" +userId, {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token
        },
    });
    return response.data
}

//Fonction qui charge les messages (socket.io) d'un utilisateur, appel en BDD
const getMessages = async (userId) => {
    const response = await axios.post( API_URL + "messages" , userId, {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token
        },
    });
    return response.data
}

//Fonction qui connecte un utilisateur, appel en BDD
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData);

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data;
};

//Fonction qui déconnecte un utilisateur, appel en BDD
const logout = () => {
    localStorage.removeItem('user');
}

//Déclaration des fonctions du service
const authService = {
    getUsers,
    getUserById,
    getUnmasterizedRoomFromUser,
    getMessages,
    updateUser,
    deleteUser,
    addRoomToUser,
    deleteRoomOfUser,
    register,
    logout,
    login,
}

export default authService;