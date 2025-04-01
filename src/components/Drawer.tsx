import { Button, Drawer as DrawerPanel } from "antd";
import {
  DashboardOutlined,
  PieChartOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Colors from "./Colors.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import { useNavigate, useParams } from "react-router";
import { FaStethoscope, FaWheelchair } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoMdInformationCircle } from "react-icons/io";
import { LuCalendarCheck } from "react-icons/lu";
import { logout } from "../redux/features/userSlice.ts";

export default function Drawer({ title, onClick = () => null }) {
  const [selected, setSelected] = useState("dashboard");
  const navigate = useNavigate();

  const userDetails = useSelector((state: RootState) => state.user.user);
  const isAdmin = userDetails?.isAdmin;
  const isDoctor = userDetails?.isDoctor;
  const params = useParams();

  const onDrawerToggle = (item) => {
    if (item === "dashboard") {
      navigate("/dashboard");
      setSelected(item);
    } else {
      navigate(`/dashboard/${item}`);
      setSelected(item);
    }
  };

  useEffect(() => {
    setSelected(params);
  }, [params]);

  const drawerItems = [
    { label: "Dashboard", value: "dashboard", icon: PieChartOutlined },
    { label: "Doctors", value: "doctors", icon: FaStethoscope },
    { label: "Appointments", value: "appointments", icon: LuCalendarCheck },
    { label: "Patients", value: "patients", icon: FaWheelchair },
    { label: "Profile", value: "profile", icon: CgProfile },
    { label: "About DAMS", value: "about", icon: IoMdInformationCircle },
  ];

  const filteredDrawerItems = useMemo(() => {
    if (isAdmin) {
      return drawerItems;
    } else if (isDoctor) {
      return drawerItems.filter((d) => d.value !== "doctors");
    } else {
      return drawerItems.filter((d) => d.value !== "patients");
    }
  }, [isAdmin, isDoctor, drawerItems]);

  console.log("cooluserdetails", userDetails);

  return (
    <div style={{ flex: 1 }}>
      <div style={{ padding: 10 }}>
        <DrawerHeader
          title={userDetails?.name}
          email={userDetails?.email}
          isAdmin={userDetails?.isAdmin}
          profilePicture={userDetails?.profilePicture}
        />
      </div>
      <div style={{}}>
        {filteredDrawerItems.map(({ label: item, value, icon: Icon }) => (
          <div
            onClick={() => onDrawerToggle(value)}
            style={{
              cursor: "pointer",
              display: "flex",
              gap: 10,
              width: "100%",
              padding: 20,
              borderRight: selected === value ? `5px solid ${Colors.blue}` : "",
              alignItems: "center",
            }}
          >
            <Icon style={{ color: selected == value ? Colors.blue : "" }} />
            {/*<DashboardOutlined*/}
            {/*  style={{ color: selected == value ? Colors.blue : "" }}*/}
            {/*/>*/}
            <span
              style={{
                fontWeight: 500,
                color: selected == value ? Colors.blue : "",
              }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DrawerHeader({
  title,
  email,
  isAdmin,
  profilePicture,
}: {
  title: string;
}) {
  const dispatch = useDispatch();
  const doLogout = () => {
    dispatch(logout());
  };
  return (
    <div
      style={{
        padding: 10,
        justifyContent: "center",
        borderBottom: "1px solid " + Colors.lightgray,
        display: "flex",
        flexDirection: "column",
        gap: 15,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          columnGap: 10,
          // justifyContent: "space-between",
        }}
      >
        {profilePicture ? (
          <img
            src={profilePicture}
            width={50}
            height={50}
            style={{ borderRadius: 100 }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              backgroundColor: isAdmin ? Colors.lightred : Colors.lightgray,
              width: 50,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 100,
              flexDirection: "column",
            }}
          >
            <UserOutlined style={{ color: isAdmin ? "white" : "" }} />
            {isAdmin ? (
              <span style={{ fontSize: 10, color: "white" }}> Admin</span>
            ) : null}
          </div>
        )}
        <div>
          <span style={{ fontSize: 22, fontWeight: "bold" }}>{title}</span>
          <br />
          <span>{email}</span>
        </div>
      </div>
      <Button
        style={{
          width: "80%",
          backgroundColor: Colors.lightblue,
          color: Colors.blue,
          fontWeight: "bold",
          border: "0px",
        }}
        onClick={doLogout}
      >
        Log out
      </Button>
    </div>
  );
}
