import React from "react";
import { Button, Card, Dropdown, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      console.log(values);
      const res = await axios.post("/api/v1/user/register", values);
      window.location.reload();
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
      console.log(error);
      message.error("something went wrong");
    }
  };

  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        backgroundColor: "#dfdfdf",
      }}
    >
      <Card style={{ padding: 50 }}>
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
        >
          <h1 className="text-center">Welcome Back</h1>
          <h3 className="text-center">Sign up for a free account</h3>

          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>

          <button
            className="btn btn-primary"
            style={{ width: "100%" }}
            type="submit"
          >
            Sign Up
          </button>
          <br />
          <br />
          <div style={{ textAlign: "center" }}>
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
