import { Button, Form, Input } from "antd";
import React from "react";
import Search from "antd/lib/transfer/search";
import { SearchOutlined } from "@ant-design/icons";

export default function SearchComponent({ title, onClick = () => null }) {
  return (
    <Form onClick={onClick} style={{ display: "flex", flex: 1, gap: 10 }}>
      <Input
        size={"large"}
        prefix={<SearchOutlined />}
        placeholder={"Seach doctor name or email"}
      />
      <Button size={"large"}>Search</Button>
    </Form>
  );
}
