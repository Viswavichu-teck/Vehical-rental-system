import axios from "axios";
import { message } from 'antd';

export const userLogin = (reqObj) => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });

    try {
        const response = await axios.post('https://vehical-rental-system.onrender.com/api/users/login', reqObj, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        localStorage.setItem('user', JSON.stringify(response.data));
        message.success('Login successful');
        dispatch({ type: 'LOADING', payload: false });

        setTimeout(() => {
            window.location.href = '/';
        }, 500);
    } catch (error) {
        console.error('Login error:', error); // Enhanced error logging
        const errorMessage = error.response?.data?.message || 'Something went wrong';
        message.error(errorMessage);
        dispatch({ type: 'LOADING', payload: false });
    }
};

export const userRegister = (reqObj) => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });

    try {
        await axios.post('https://vehical-rental-system.onrender.com/api/users/register', reqObj, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        message.success('Registration successful');
        dispatch({ type: 'LOADING', payload: false });

        setTimeout(() => {
            window.location.href = '/login';
        }, 500);
    } catch (error) {
        console.error('Registration error:', error); // Enhanced error logging
        const errorMessage = error.response?.data?.message || 'Something went wrong';
        message.error(errorMessage);
        dispatch({ type: 'LOADING', payload: false });
    }
};
