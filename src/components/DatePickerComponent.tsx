import { Button, DatePicker, Form, Input } from "antd";
import React from "react";
import Search from "antd/lib/transfer/search";
import { MedicineBoxFilled, SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import Colors from "./Colors.tsx";

export default function DatePickerComponent({ title, onClick = () => null }) {
  const d = () => DatePicker.generatePicker();

  const openPicker = () => {
    alert("hi");
  };
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div>
        <span style={{ fontSize: 12, color: Colors.darkgray }}>
          Today's Date
        </span>
        <br />
        <span style={{ fontSize: 18, fontWeight: "bold" }}>
          {moment().format("DD-MM-YYYY")}
        </span>
      </div>
      <div
        onClick={openPicker}
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
        <MedicineBoxFilled />
        <DatePicker
          style={{ visibility: "hidden", position: "absolute" }}
          size={"small"}
        />
      </div>
    </div>
  );
}
