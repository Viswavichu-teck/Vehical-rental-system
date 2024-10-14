import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import { getAllCars } from '../redux/actions/carsActions';
<<<<<<< HEAD
import { Col, Row, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import moment from 'moment';

const { RangePicker } = DatePicker;
=======
import { Col, Row, Select } from 'antd';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

const { Option } = Select;
>>>>>>> d410ffa (Changed)

function Home() {
  const { cars } = useSelector(state => state.carsReducer);
  const { loading } = useSelector(state => state.alertsReducer);
  const [totalCars, setTotalCars] = useState([]);
<<<<<<< HEAD
=======
  const [capacityFilter, setCapacityFilter] = useState(null);
  const [fuelTypeFilter, setFuelTypeFilter] = useState(null);
>>>>>>> d410ffa (Changed)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  useEffect(() => {
    setTotalCars(cars);
  }, [cars]);

<<<<<<< HEAD
  function setFilter(values) {
    const selectedFrom = moment(values[0]);
    const selectedTo = moment(values[1]);

    const temp = cars.filter(car => {
      if (car.bookedTimeSlots.length === 0) {
        return true;
      }

      return !car.bookedTimeSlots.some(booking => {
        const bookingFrom = moment(booking.from);
        const bookingTo = moment(booking.to);

        return selectedFrom.isBetween(bookingFrom, bookingTo, null, '[)') ||
          selectedTo.isBetween(bookingFrom, bookingTo, null, '(]') ||
          bookingFrom.isBetween(selectedFrom, selectedTo, null, '[)') ||
          bookingTo.isBetween(selectedFrom, selectedTo, null, '(]');
      });
    });

    setTotalCars(temp);
  }
=======
  useEffect(() => {
    // Filter cars based on selected capacity and fuel type
    const filteredCars = cars.filter(car => {
      const capacityMatch = capacityFilter ? car.capacity === capacityFilter : true;
      const fuelTypeMatch = fuelTypeFilter ? car.fuelType === fuelTypeFilter : true;
      return capacityMatch && fuelTypeMatch;
    });
    setTotalCars(filteredCars);
  }, [capacityFilter, fuelTypeFilter, cars]);

  const handleCapacityChange = value => {
    setCapacityFilter(value);
    if (value === null) setTotalCars(cars); // Reset to all cars when "All" is selected
  };

  const handleFuelTypeChange = value => {
    setFuelTypeFilter(value);
    if (value === null) setTotalCars(cars); // Reset to all cars when "All" is selected
  };
>>>>>>> d410ffa (Changed)

  return (
    <DefaultLayout>
      <Row className='mt-3' justify='center'>
        <Col lg={20} sm={24} className='d-flex justify-content-left'>
<<<<<<< HEAD
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format='MMM DD yyyy HH:mm'
            onChange={setFilter}
          />
=======
          <Select
            placeholder="Select Capacity"
            style={{ width: 200, marginRight: '10px' }}
            onChange={handleCapacityChange}
            allowClear // Allows clearing the selection
          >
            <Option value={null}>All</Option> {/* Added All Option */}
            <Option value={2}>2</Option>
            <Option value={4}>4</Option>
            <Option value={6}>6</Option>
            <Option value={8}>8</Option>
          </Select>

          <Select
            placeholder="Select Fuel Type"
            style={{ width: 200 }}
            onChange={handleFuelTypeChange}
            allowClear // Allows clearing the selection
          >
            <Option value={null}>All</Option> {/* Added All Option */}
            <Option value="petrol">Petrol</Option>
            <Option value="diesel">Diesel</Option>
            <Option value="electric">Electric</Option>
            <Option value="hybrid">Hybrid</Option> {/* Changed CNG to Hybrid */}
          </Select>
>>>>>>> d410ffa (Changed)
        </Col>
      </Row>

      {loading && <Spinner />}

      <Row justify='center' gutter={16}>
        {totalCars.map(car => (
          <Col lg={5} sm={24} xs={24} key={car._id}>
            <div className="car p-2 bs1">
              <img src={car.image} alt={car.name} className="carimg" />

              <div className="car-content d-flex align-items-center justify-content-between">
                <div className='text-left pl-2'>
                  <p>{car.name}</p>
                  <p> Rent Per Hour {car.rentPerHour} /-</p>
                </div>

                <div>
                  <button className="btn1 mr-2">
                    <Link to={`/booking/${car._id}`}>Book Now</Link>
                  </button>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </DefaultLayout>
  );
}

export default Home;
