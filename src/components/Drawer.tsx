import { Button, Drawer as DrawerPanel } from "antd";
import { DashboardOutlined, UserOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Colors from "./Colors.tsx";

export default function Drawer({ title, onClick = () => null }) {
  const [selected, setSelected] = useState("Dashboard");
  return (
    <div style={{ flex: 1 }}>
      <div style={{ padding: 10 }}>
        <DrawerHeader title={"Administrator"} email={"test@test.com"} />
      </div>
      <div style={{}}>
        {["Dashboard", "Doctors", "Schedule", "Appointment", "Patients"].map(
          (item) => (
            <div
              onClick={() => setSelected(item)}
              style={{
                cursor: "pointer",
                display: "flex",
                gap: 10,
                width: "100%",
                padding: 20,
                borderRight:
                  selected === item ? `5px solid ${Colors.blue}` : "",
              }}
            >
              <DashboardOutlined
                style={{ color: selected == item ? Colors.blue : "" }}
              />
              <span
                style={{
                  fontWeight: 500,
                  color: selected == item ? Colors.blue : "",
                }}
              >
                {item}
              </span>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

function DrawerHeader({ title, email }: { title: string }) {
  return (
    <div
      style={{
        padding: 10,
        justifyContent: "center",
        borderBottom: "1px solid " + Colors.lightgray,
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
        <div
          style={{
            display: "flex",
            backgroundColor: Colors.lightgray,
            width: 50,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 100,
          }}
        >
          <UserOutlined />
        </div>
        <div>
          <span style={{ fontSize: 30 }}>{title}</span>
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
      >
        Log out
      </Button>
    </div>
  );
}
