import { Col, Row, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { editCar, getAllCars } from "../redux/actions/carsActions";

function EditCar({ match }) {
  const { cars } = useSelector((state) => state.carsReducer);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setCar] = useState(null);

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      const foundCar = cars.find((o) => o._id === match.params.carid); // use === for strict equality
      setCar(foundCar);
    }
  }, [cars, dispatch, match.params.carid]); // added missing dependencies

  function onFinish(values) {
    if (car) { // Ensure car is not null
      values._id = car._id;
      dispatch(editCar(values));
    }
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center" className="mt-5">
        <Col lg={12} sm={24} xs={24} className='p-2'>
          {car && (
            <Form
              initialValues={car}
              className="bs1 p-2"
              layout="vertical"
              onFinish={onFinish}
            >
              <h3>Edit Car</h3>

              <hr />
              <Form.Item
                name="name"
                label="Car Name"
                rules={[{ required: true, message: 'Please enter the car name' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="image"
                label="Image URL"
                rules={[{ required: true, message: 'Please enter the image URL' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="rentPerHour"
                label="Rent Per Hour"
                rules={[{ required: true, message: 'Please enter the rent per hour' }]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                name="capacity"
                label="Capacity"
                rules={[{ required: true, message: 'Please enter the capacity' }]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                name="fuelType"
                label="Fuel Type"
                rules={[{ required: true, message: 'Please enter the fuel type' }]}
              >
                <Input />
              </Form.Item>

              <div className="text-right">
                <button type="submit" className="btn1">Edit Car</button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default EditCar;
