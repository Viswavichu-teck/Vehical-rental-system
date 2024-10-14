import React from "react";
import { Row, Col, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from "../redux/actions/userActions";
import Spinner from '../components/Spinner';

function Login() {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.alertsReducer);

    function onFinish(values) {
        dispatch(userLogin(values));
    }

    return (
        <div className="login">
            {loading && (<Spinner />)}
            <Row gutter={16} className="d-flex align-items-center">
                <Col lg={8} className="text-left p-5">
                    <Form layout="vertical" className="login-form p-5" onFinish={onFinish}>
                        <h1>Login</h1>
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

                        <button type="submit" className="btn1 mt-2 mb-3">Login</button>
                        <br />
                        <Link to="/register">Click Here to Register</Link>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default Login;
