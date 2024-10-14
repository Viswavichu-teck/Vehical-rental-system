import { Col, Row, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { editCar, getAllCars } from "../redux/actions/carsActions";

const { Option } = Select; // Destructure Option from Select

function EditCar({ match }) {
  const { cars } = useSelector((state) => state.carsReducer);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const [form] = Form.useForm(); // Create a form instance
  const [car, setCar] = useState(null);

  useEffect(() => {
    // Fetch all cars if not already loaded
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      // Find the car by ID and set it to state
      const foundCar = cars.find((o) => o._id === match.params.carid);
      setCar(foundCar);
      // Set form values if car is found
      if (foundCar) {
        form.setFieldsValue(foundCar);
      }
    }
  }, [cars, dispatch, match.params.carid, form]); // Ensure dependencies are correct

  function onFinish(values) {
    if (car) { // Ensure car is not null
      values._id = car._id; // Add the car ID to the values
      dispatch(editCar(values)); // Dispatch the edit action
    }
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center" className="mt-5">
        <Col lg={12} sm={24} xs={24} className='p-2'>
          {car && (
            <Form
              form={form} // Attach the form instance
              initialValues={car} // Initialize the form with car data
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
                rules={[{ required: true, message: 'Please select the fuel type' }]}
              >
                <Select placeholder="Select fuel type">
                  <Option value="petrol">Petrol</Option>
                  <Option value="diesel">Diesel</Option>
                  <Option value="electric">Electric</Option>
                  <Option value="hybrid">Hybrid</Option>
                </Select>
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
