import { Button, DatePicker, Form, Input } from "antd";
import React, { useState } from "react";
import Search from "antd/lib/transfer/search";
import { MedicineBoxFilled, SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import Colors from "./Colors.tsx";

export default function DatePickerComponent({ title, onClick = () => null }) {
  const d = () => DatePicker.generatePicker();
  const [picker, setPicker] = useState(false);

  const openPicker = () => {
    setPicker(!picker);
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
        <br />
        <DatePicker
          onAbort={() => setPicker(false)}
          onBlur={() => setPicker(false)}
          open={picker}
          style={{ visibility: "hidden", position: "absolute" }}
          size={"small"}
        />
      </div>
    </div>
  );
}
