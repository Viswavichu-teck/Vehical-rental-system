import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllCars } from "../redux/actions/carsActions";
import moment from "moment";
import { bookCar } from "../redux/actions/bookingActions";
import StripeCheckout from "react-stripe-checkout";
import 'aos/dist/aos.css';

const { RangePicker } = DatePicker;

function BookingCar({ match }) {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setCar] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setCar(cars.find((o) => o._id === match.params.carid));
    }
  }, [cars, dispatch, match.params.carid]);

  const selectTimeSlots = useCallback((values) => {
    const selectedFrom = moment(values[0]);
    const selectedTo = moment(values[1]);
    const currentTime = moment();

    // Prevent booking for past dates
    if (selectedFrom.isBefore(currentTime)) {
      alert("You cannot book a car for a past date or time.");
      return;
    }

    setFrom(selectedFrom.format("MMM DD yyyy HH:mm"));
    setTo(selectedTo.format("MMM DD yyyy HH:mm"));
    setTotalHours(selectedTo.diff(selectedFrom, "hours"));
  }, []);

  const onToken = useCallback((token) => {
    const totalAmount = (totalHours * car.rentPerHour) + (driver ? 30 * totalHours : 0);

    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };

    dispatch(bookCar(reqObj));
  }, [car, totalHours, driver, from, to, dispatch]);

  // Calculate totalAmount on the fly
  const totalAmount = (totalHours * car.rentPerHour) + (driver ? 30 * totalHours : 0);

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24} className="p-3">
          <img
            src={car.image}
            alt={car.name}
            className="carimg2 bs1 w-100"
            data-aos="flip-left"
            data-aos-duration="1500"
          />
        </Col>

        <Col lg={10} sm={24} xs={24} className="text-right">
          <Divider type="horizontal" dashed>
            Car Info
          </Divider>
          <div style={{ textAlign: "right" }}>
            <p>{car.name}</p>
            <p>{car.rentPerHour} Rent Per Hour /-</p>
            <p>Fuel Type: {car.fuelType}</p>
            <p>Max Persons: {car.capacity}</p>
          </div>

          <Divider type="horizontal" dashed>
            Select Time Slots
          </Divider>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={selectTimeSlots}
          />
          <br />
          <button
            className="btn1 mt-2"
            onClick={() => {
              setShowModal(true);
            }}
          >
            See Booked Slots
          </button>
          {from && to && (
            <div>
              <p>
                Total Hours: <b>{totalHours}</b>
              </p>
              <p>
                Rent Per Hour: <b>{car.rentPerHour}</b>
              </p>
              <Checkbox
                onChange={(e) => {
                  setDriver(e.target.checked);
                }}
              >
                Driver Required
              </Checkbox>

              <h3>Total Amount: {totalAmount}</h3>

              <StripeCheckout
                shippingAddress
                token={onToken}
                currency="INR"
                amount={totalAmount * 100}
                stripeKey="pk_test_51Q1j6NRxzx8LaCIqGOL9KhF5wGWQOb2DtxEzy4qFx9077zDgU4Zwcumc7LNit2TVFjMBxfzFEIhxlvIfQQcaEhot00Mjsvy9UJ"
              >
                <button className="btn1">Book Now</button>
              </StripeCheckout>
            </div>
          )}
        </Col>

        {car.name && (
          <Modal
            open={showModal}
            closable={false}
            footer={false}
            title="Booked Time Slots"
          >
            <div className="p-2">
              {car.bookedTimeSlots.map((slot) => (
                <button key={slot.from + slot.to} className="btn1 mt-2">
                  {slot.from} - {slot.to}
                </button>
              ))}

              <div className="text-right mt-5">
                <button
                  className="btn1"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </Modal>
        )}
      </Row>
    </DefaultLayout>
  );
}

export default BookingCar;
