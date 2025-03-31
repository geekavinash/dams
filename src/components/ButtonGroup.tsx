import { Button, Space } from "antd";
import React, { useState } from "react";
import ButtonGroupAnt from "antd/es/button/button-group";

export default function ButtonGroupd({
  value = "patient",
  onChange = () => null,
}) {
  return (
    <Space.Compact style={{ outline: "none" }}>
      <Button
        style={{ outline: "none" }}
        type={value === "patient" ? "primary" : "default"}
        onClick={() => onChange("patient")}
      >
        Patient
      </Button>
      <Button
        style={{ outline: "none" }}
        type={value === "doctor" ? "primary" : "default"}
        onClick={() => onChange("doctor")}
      >
        Doctor
      </Button>
      <Button
        style={{ outline: "none" }}
        type={value === "admin" ? "primary" : "default"}
        onClick={() => onChange("admin")}
      >
        Admin
      </Button>
    </Space.Compact>
  );
}
