import React, { useState } from "react";
import { Button, Card, Dropdown, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import {
  Link,
  useNavigate,
  useNavigation,
  useParams,
  useRoutes,
} from "react-router";
import axios from "axios";
import ButtonGroup from "../components/ButtonGroup";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      console.log(res);
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

  const onLogin = async (values) => {
    alert(JSON.stringify(params));
    console.log(params);
  };

  const [loginType, setLoginType] = useState("patient");

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
          <button
            className="btn btn-primary"
            style={{ width: "100%" }}
            type="submit"
          >
            Login
          </button>
          <br />
          <br />
          <div style={{ textAlign: "center" }}>
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
