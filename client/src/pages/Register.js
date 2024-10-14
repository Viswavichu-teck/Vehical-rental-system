import React from "react";
import { Row, Col, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from "../redux/actions/userActions";
import Spinner from '../components/Spinner';

function Register() {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.alertsReducer);

    function onFinish(values) {
        if (values.password !== values.cpassword) {
            message.error('Passwords do not match');
            return;
        }
        dispatch(userRegister(values));
    }

    return (
        <div className="register">
            {loading && (<Spinner />)}
            <Row gutter={16} className="d-flex align-items-center">
                <Col lg={8} className="text-left p-5">
                    <Form layout="vertical" className="register-form p-5" onFinish={onFinish}>
                        <h1>Register</h1>
                        <hr />
                        <Form.Item
                            name="username"
                            label="Username"
                            rules={[{ required: true, message: 'Username is required' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{ required: true, message: 'Password is required' }]}>
                            <Input type="password" />
                        </Form.Item>
                        <Form.Item
                            name="cpassword"
                            label="Confirm Password"
                            rules={[{ required: true, message: 'Please confirm your password' }]}>
                            <Input type="password" />
                        </Form.Item>
                        
                        <button type="submit" className="btn1 mt-2 mb-3">Register</button>
                        <br />
                        <Link to="/login">Click Here to Login</Link>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default Register;
