import axios from "axios";
import { message } from 'antd';

// Get All Cars Action
export const getAllCars = () => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });

    try {
        const response = await axios.get('https://vehical-rental-system.onrender.com/api/cars/getallcars');
        dispatch({ type: 'GET_ALL_CARS', payload: response.data });
        dispatch({ type: 'LOADING', payload: false });
    } catch (error) {
        console.error('Get All Cars error:', error);
        message.error('Failed to fetch cars.');
        dispatch({ type: 'LOADING', payload: false });
    }
};

// Add Car Action
export const addCar = (reqObj) => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });

    try {
        await axios.post('https://vehical-rental-system.onrender.com/api/cars/addcar', reqObj);
        message.success('New car added successfully');
        dispatch({ type: 'LOADING', payload: false });

        setTimeout(() => {
            window.location.href = '/admin';
        }, 500);
    } catch (error) {
        console.error('Add Car error:', error);
        message.error('Failed to add the car.');
        dispatch({ type: 'LOADING', payload: false });
    }
};

// Edit Car Action
export const editCar = (reqObj) => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });

    try {
        await axios.post('https://vehical-rental-system.onrender.com/api/cars/editcar', reqObj);
        message.success('Car details updated successfully');
        dispatch({ type: 'LOADING', payload: false });

        setTimeout(() => {
            window.location.href = '/admin';
        }, 500);
    } catch (error) {
        console.error('Edit Car error:', error);
        message.error('Failed to update car details.');
        dispatch({ type: 'LOADING', payload: false });
    }
};

// Delete Car Action
export const deleteCar = (reqObj) => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });

    try {
        await axios.post('https://vehical-rental-system.onrender.com/api/cars/deletecar', reqObj);
        message.success('Car deleted successfully');
        dispatch({ type: 'LOADING', payload: false });

        setTimeout(() => {
            window.location.reload();
        }, 500);
    } catch (error) {
        console.error('Delete Car error:', error);
        message.error('Failed to delete the car.');
        dispatch({ type: 'LOADING', payload: false });
    }
};
