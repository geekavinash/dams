import React from "react";
import { Card, Switch, Typography } from "antd";
import { MedicineBoxFilled, TagOutlined } from "@ant-design/icons";
import Colors from "./Colors.tsx";
import { AlertFilled } from "@ant-design/icons/lib/icons";

const StatusCard = ({ count, title, type }) => {
  const Icon = () => {
    switch (type) {
      case "doctor":
        return <MedicineBoxFilled style={{ color: Colors.blue }} />;
      case "patient":
        return <AlertFilled style={{ color: Colors.blue }} />;
      case "booking":
        return <TagOutlined style={{ color: Colors.blue }} />;
      case "monitor":
        return <MedicineBoxFilled style={{ color: Colors.blue }} />;
    }
  };

  return (
    <Card style={{}}>
      <div
        style={{
          maxWidth: 200,
          display: "flex",
          flexDirection: "row",
          columnGap: 50,
          justifyContent: "space-between",
        }}
      >
        <div>
          <Typography
            style={{ fontSize: 20, color: Colors.blue, fontWeight: "bold" }}
          >
            {count}
          </Typography>
          <Typography>{title}</Typography>
        </div>
        <div
          style={{
            display: "flex",
            backgroundColor: Colors.lightgray,
            width: 50,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
          }}
        >
          <Icon />
        </div>
      </div>
    </Card>
  );
};

export default StatusCard;
