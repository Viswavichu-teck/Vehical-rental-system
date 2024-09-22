import axios from "axios";
import { message } from "antd";

// Book Car Action
export const bookCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post('https://vehical-rental-system.onrender.com/api/bookings/bookcar', reqObj);
    
    dispatch({ type: "LOADING", payload: false });
    message.success("Your car has been booked successfully");

    setTimeout(() => {
      window.location.href = '/userbookings';
    }, 500);
  } catch (error) {
    console.error("Error booking car:", error.response ? error.response.data : error.message);
    dispatch({ type: "LOADING", payload: false });
    message.error("Something went wrong, please try again later");
  }
};

// Get All Bookings Action
export const getAllBookings = () => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    const response = await axios.get('https://vehical-rental-system.onrender.com/api/bookings/getallbookings');
    dispatch({ type: 'GET_ALL_BOOKINGS', payload: response.data });
    dispatch({ type: 'LOADING', payload: false });
  } catch (error) {
    console.error("Error fetching bookings:", error.response ? error.response.data : error.message);
    dispatch({ type: 'LOADING', payload: false });
    message.error("Failed to fetch bookings.");
  }
};
