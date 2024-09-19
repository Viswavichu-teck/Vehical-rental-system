import axios from "axios";
import { message } from 'antd';

export const userLogin = (reqObj) => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });

    try {
        const response = await axios.post('https://online-vehicle-rental-1.onrender.com/api/users/login', reqObj);
        localStorage.setItem('user', JSON.stringify(response.data));
        message.success('Login successful');
        dispatch({ type: 'LOADING', payload: false });

        setTimeout(() => {
            window.location.href = '/';
        }, 500);
    } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.message || 'Something went wrong';
        message.error(errorMessage);
        dispatch({ type: 'LOADING', payload: false });
    }
};

export const userRegister = (reqObj) => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });

    try {
        await axios.post('/api/users/register', reqObj);
        message.success('Registration successful');
        dispatch({ type: 'LOADING', payload: false });

        setTimeout(() => {
            window.location.href = '/login';
        }, 500);
    } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.message || 'Something went wrong';
        message.error(errorMessage);
        dispatch({ type: 'LOADING', payload: false });
    }
};
