import React from "react";
import { Button, Card, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import SearchComponent from "../components/SearchComponent.tsx";
import DatePickerComponent from "../components/DatePickerComponent.tsx";
import Drawer from "../components/Drawer.tsx";
import Colors from "../components/Colors.tsx";
import StatusCard from "../components/StatusCard.tsx";
import DashboardBanner from "../components/DashboardBanner.tsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      console.log(values);
      const res = await axios.post("/api/v1/user/login", values);
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
        flex: 1,
        // alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <div
        style={{
          flex: 1.8,
          borderRight: `0.5px solid ${Colors.lightgray}`,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Drawer />
      </div>
      <div style={{ flex: 8.2, padding: 25 }}>
        <div style={{ display: "flex", columnGap: 50 }}>
          <div style={{ flex: 8.5 }}>
            <SearchComponent />
          </div>
          <div
            style={{ flex: 1.2, display: "flex", justifyContent: "flex-end" }}
          >
            <DatePickerComponent />
          </div>
        </div>
        <br />
        <DashboardBanner />
        <br />
        <div style={{ display: "flex", gap: 10 }}>
          <StatusCard title={"Doctors"} count={1} type={"doctor"} />
          <StatusCard title={"Patients"} count={1} type={"patient"} />
          <StatusCard title={"New Booking"} count={1} type={"booking"} />
          <StatusCard title={"Today Sessions"} count={1} type={"monitor"} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
