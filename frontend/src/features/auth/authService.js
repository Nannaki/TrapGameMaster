import axios from "axios";

const API_URL = 'http://localhost:5000/api/users/';

//Get users
const getUsers = async () => {
    const response = await axios.get( API_URL + 'show');
    return response.data;
}

//Register user
const register = async (userData) => {
    const response = await axios.post(API_URL + 'registerGm', userData);
    return response.data;

};

//Delete user
const deleteUser = async (userId) => {
    const response = await axios.delete( API_URL + "delete" +userId);
    return response.data
}


//Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData);

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data;
};

//Logout
const logout = () => {
    localStorage.removeItem('user');
}

const authService = {
    getUsers,
    deleteUser,
    register,
    logout,
    login,
}

export default authService;