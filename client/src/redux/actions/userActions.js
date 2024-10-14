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
<<<<<<< HEAD
=======
        
>>>>>>> d410ffa (Changed)
        localStorage.setItem('user', JSON.stringify(response.data));
        message.success('Login successful');
        dispatch({ type: 'LOADING', payload: false });

<<<<<<< HEAD
=======
        // Redirect to the homepage after a successful login
>>>>>>> d410ffa (Changed)
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

<<<<<<< HEAD
    try {
        await axios.post('https://vehical-rental-system.onrender.com/api/users/register', reqObj, {
=======
    // Ensure the role is set to "user" by default before sending to backend
    const userData = {
        ...reqObj,
        role: 'user', // Set default role
    };

    try {
        await axios.post('https://vehical-rental-system.onrender.com/api/users/register', userData, {
>>>>>>> d410ffa (Changed)
            headers: {
                'Content-Type': 'application/json',
            },
        });
<<<<<<< HEAD
        message.success('Registration successful');
        dispatch({ type: 'LOADING', payload: false });

=======
        
        message.success('Registration successful');
        dispatch({ type: 'LOADING', payload: false });

        // Redirect to login page after successful registration
>>>>>>> d410ffa (Changed)
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
