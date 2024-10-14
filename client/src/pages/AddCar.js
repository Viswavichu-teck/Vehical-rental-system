<<<<<<< HEAD
import { Col, Row, Form, Input } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import Spinner from '../components/Spinner';
import { addCar } from '../redux/actions/carsActions';

function AddCar() {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.alertsReducer);

    function onFinish(values) {
        values.bookedTimeSlots = [];
        dispatch(addCar(values));
        console.log(values);
    }

    return (
        <DefaultLayout>
            {loading && <Spinner />}
            <Row justify='center' className='mt-5'>
                <Col lg={12} sm={24} xs={24} className='p-2'>
                    <Form className='bs1 p-2' layout='vertical' onFinish={onFinish}>
                        <h3>Add New Car</h3>
                        <hr />
                        <Form.Item name='name' label='Car name' rules={[{ required: true, message: 'Please enter the car name' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='image' label='Image URL' rules={[{ required: true, message: 'Please enter the image URL' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='rentPerHour' label='Rent per hour' rules={[{ required: true, message: 'Please enter the rent per hour' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='capacity' label='Capacity' rules={[{ required: true, message: 'Please enter the capacity' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='fuelType' label='Fuel Type' rules={[{ required: true, message: 'Please enter the fuel type' }]}>
                            <Input />
                        </Form.Item>
                        <div className='text-right'>
                            <button className='btn1' type='submit'>ADD CAR</button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </DefaultLayout>
    );
}
=======
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
>>>>>>> d410ffa (Changed)

export default AddCar;
