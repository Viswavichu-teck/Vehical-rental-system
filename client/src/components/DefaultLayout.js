import React from "react";
import { Dropdown, Button, Row, Col } from "antd";
import { Link } from 'react-router-dom';

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem('user'));

  // Updated menu items to use 'items' instead of 'children'
  const menuItems = [
    { key: '1', label: <Link to="/">Home</Link> },
    { key: '2', label: <Link to="/userbookings">Bookings</Link> },
    { key: '3', label: <Link to="/admin">Admin</Link> },
    { key: '4', label: <span style={{ color: 'orangered' }} onClick={() => {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }}>Logout</span> },
  ];

  return (
    <div>
      <div className="header bs1">
        <Row gutter={16} justify='center'>
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex justify-content-between">
              <h1>
                <b><Link to='/' style={{ color: 'orangered' }}>VichuCars</Link></b>
              </h1>

              <Dropdown menu={{ items: menuItems }} placement="bottomRight">
                <Button>{user?.username}</Button>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>
      <div className="content">{props.children}</div>
      <div className="footer text-center">
        <hr />
        <p>Designed and Developed By</p>
        <p>Vichu</p>
      </div>
    </div>
  );
}

export default DefaultLayout;
