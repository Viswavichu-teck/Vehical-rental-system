import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCar } from '../redux/actions/carsActions'; // Adjust import as necessary
import '../App'

const AddCar = () => {
    const dispatch = useDispatch();
    const [carDetails, setCarDetails] = useState({
        name: '',
        image: '',
        capacity: 1,
        fuelType: 'petrol',
        rentPerHour: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarDetails({ ...carDetails, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addCar(carDetails)); // Dispatch action to add car
    };

    return (
        <div className="add-car-container">
            <h2>Add New Car</h2>
            <form onSubmit={handleSubmit} className="car-form">
                <input 
                    type="text" 
                    name="name" 
                    value={carDetails.name} 
                    onChange={handleChange} 
                    placeholder="Car Name" 
                    required 
                    className="form-input" 
                />
                <input 
                    type="text" 
                    name="image" 
                    value={carDetails.image} 
                    onChange={handleChange} 
                    placeholder="Image URL" 
                    required 
                    className="form-input" 
                />
                
                <select 
                    name="capacity" 
                    value={carDetails.capacity} 
                    onChange={handleChange} 
                    className="form-select"
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                </select>

                <select 
                    name="fuelType" 
                    value={carDetails.fuelType} 
                    onChange={handleChange} 
                    className="form-select"
                >
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="electric">Electric</option>
                    <option value="CNG">CNG</option>
                </select>

                <input 
                    type="number" 
                    name="rentPerHour" 
                    value={carDetails.rentPerHour} 
                    onChange={handleChange} 
                    placeholder="Rent per Hour" 
                    required 
                    className="form-input" 
                />

                <button type="submit" className="form-button">Add Car</button>
            </form>
        </div>
    );
};

export default AddCar;
