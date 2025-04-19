import React, { useEffect, useState } from "react";
import { Button, Card, Form, Input, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axiosConfig";
import SearchComponent from "../components/SearchComponent.tsx";
import DatePickerComponent from "../components/DatePickerComponent.tsx";
import Drawer from "../components/Drawer.tsx";
import Colors from "../components/Colors.tsx";
import StatusCard from "../components/StatusCard.tsx";
import DashboardBanner from "../components/DashboardBanner.tsx";
import DoctorsList from "./DoctorsList.tsx";
import AppointmentsList from "./AppointmentList.tsx";
import { setDoctorsList } from "../redux/features/doctorsSlice.ts";
import AboutUs from "./AboutUs.tsx";
import PatientList from "./PatientList.tsx";
import Profile from "./Profile.tsx";
import { RootState } from "../redux/store.ts";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [stats, setStats] = useState({});
  const user = useSelector((state: RootState) => state.user);
  //form handler
  const getAllStats = async () => {
    try {
      const res = await axios.get("/api/v1/user/getStats", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setStats(res?.data?.data);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("something went wrong");
    } finally {
    }
  };

  const [showBanner, setShowBanner] = useState(
    !(user?.isAdmin && user?.isDoctor),
  );
  const drawerView = params.view;

  useEffect(() => {
    getAllStats();
  }, []);

  //form handler
  const getAllDoctorsList = async () => {
    try {
      const res = await axios.get("/api/v1/user/getAllDoctors", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        dispatch(setDoctorsList(res?.data?.data));
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("something went wrong");
    } finally {
    }
  };

  useEffect(() => {
    getAllDoctorsList();
  }, []);

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
            style={{ flex: 1.5, display: "flex", justifyContent: "flex-end" }}
          >
            <DatePickerComponent />
          </div>
        </div>
        {drawerView !== "about" ? <br /> : null}
        {showBanner ? <DashboardBanner /> : null}
        {drawerView !== "about" ? (
          <>
            <br />
            <div style={{ display: "flex", gap: 10 }}>
              <StatusCard
                title={"Doctors"}
                count={stats?.totalDoctors || 0}
                type={"doctor"}
              />
              <StatusCard
                title={"Patients"}
                count={stats?.totalPatients || 0}
                type={"patient"}
              />
              <StatusCard
                title={"New Booking"}
                count={stats?.totalBookings || 0}
                type={"booking"}
              />
              <StatusCard
                title={"Today Sessions"}
                count={stats?.totalDoctors || 0}
                type={"monitor"}
              />
            </div>
            <br />
          </>
        ) : null}
        {
          {
            doctors: <DoctorsList />,
            appointments: <AppointmentsList />,
            about: <AboutUs />,
            profile: <Profile />,
            patients: <PatientList />,
          }[drawerView]
        }
      </div>
    </div>
  );
};

export default Dashboard;
