import React, { useState } from "react";
import { Card, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axiosConfig";
import "./LoginStyles.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  // Form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
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
    <div className="login-container">
      <Card className="login-card">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
        >
          <h1 className="text-center">Welcome Back</h1>
          <h3 className="text-center">Login with your details to continue</h3>

          <Form.Item label="Email" name="email">
            <Input
              type="email"
              required
              placeholder="Please enter your email"
            />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input
              type="password"
              required
              placeholder="Please enter your password"
            />
          </Form.Item>
          <button className="btn btn-primary login-button" type="submit">
            Login
          </button>
          <div className="login-footer">
            Don't have an account?{" "}
            <Link to="/register" className="m-2">
              Sign Up
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
