//Import
import axios from 'axios';

//Adresse du schedule dans l'api
const API_URL = 'http://localhost:5000/api/schedule/';

//Fonction qui retourne le mois en cours, appel en BDD
const getActualsMonths = async () => {
    const response = await axios.get(API_URL + 'actualsMonths', {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token
        },
    })
    return response.data;
};

//Fonction qui retourne les jours du mois en cours, appel en BDD
const getAllDaysInMonth = async (dateData) => {
    const response = await axios.post( API_URL + 'alldaysinmonth', dateData, {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token
        },
    })
    return response.data;
}

//Fonction qui enregistre les disponibilités des utilisateurs, appel en BDD
const registerUserAvailblity = async (availblityData) => {
    const response = await axios.post( API_URL + 'registerUserAvailblity', availblityData, {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token
        },
    })
    return response.data;
}

////Fonction qui charge les disponibilités des utilisateurs, appel en BDD
const getUsersAvailblity = async (dateData) => {
    const response = await axios.post( API_URL + 'getUserAvailblity', dateData, {
        headers: {
            Authorization: JSON.parse(localStorage.getItem("user")).token
        },
    })
    return response.data;
}

//Déclaration des fonctions du service
const scheduleService = {
    getActualsMonths,
    getAllDaysInMonth,
    getUsersAvailblity,
    registerUserAvailblity,
}

export default scheduleService