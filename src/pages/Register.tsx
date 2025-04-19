import React from "react";
import { Button, Card, Col, Form, Input, Row, Select, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router";
import axios from "axiosConfig";
import "./RegisterStyles.css";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Registered Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error("Something went wrong");
    }
  };

  return (
    <div className="register-container">
      <Card className="register-card">
        <Form layout="vertical" onFinish={onfinishHandler}>
          <h1 className="text-center">Welcome</h1>
          <h3 className="text-center register-subtitle">Create your account</h3>

          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                <Input placeholder="Enter your name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true }]}
              >
                <Input type="email" placeholder="Enter your email" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true }]}
              >
                <Input.Password placeholder="Create a password" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Age" name="age" rules={[{ required: true }]}>
                <Input type="number" min={0} placeholder="Enter your age" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select your gender">
                  <Select.Option value="Male">Male</Select.Option>
                  <Select.Option value="Female">Female</Select.Option>
                  <Select.Option value="Other">Other</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" htmlType="submit" block>
            Sign Up
          </Button>

          <div className="register-footer">
            Already have an account?{" "}
            <Link to="/login" className="m-2">
              Login
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
