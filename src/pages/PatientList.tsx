import React, { useEffect, useState } from "react";
import { Button, Card, Table, Tag, message, Modal, Descriptions } from "antd";
import axios from "axios";
import Colors from "../components/Colors.tsx";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import Endpoints from "../Endpoints.tsx";
import { useSelector } from "react-redux";

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user } = useSelector((state) => state.user);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const res = await axios.get(Endpoints.getAllPatients, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        const onlyPatients = res.data.data.filter(
          (user) => !user.isAdmin && !user.isDoctor,
        );
        setPatients(onlyPatients);
      } else {
        message.error(res.data.message || "Failed to fetch patients");
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <>
      <Card
        title="Patient List"
        style={{ padding: 0 }}
        extra={
          <Button
            icon={<EyeOutlined />}
            style={{
              backgroundColor: Colors.lightblue,
              color: Colors.blue,
              fontWeight: "bold",
              border: "0px",
            }}
            onClick={fetchPatients}
          >
            Refresh
          </Button>
        }
      >
        <Table
          loading={loading}
          dataSource={patients.map((item) => ({
            ...item,
            key: item._id,
            roleTag: <Tag color="blue">Patient</Tag>,
            actions: (
              <div style={{ display: "flex", gap: 8 }}>
                <Button
                  icon={<EyeOutlined />}
                  style={{
                    backgroundColor: Colors.lightblue,
                    color: Colors.blue,
                    fontWeight: "bold",
                    border: "0px",
                  }}
                  onClick={() => {
                    setSelectedPatient(item);
                    setShowModal(true);
                  }}
                >
                  View
                </Button>
              </div>
            ),
          }))}
          columns={[
            {
              title: "Name",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Email",
              dataIndex: "email",
              key: "email",
            },
            {
              title: "Age",
              dataIndex: "age",
              key: "age",
            },
            {
              title: "Gender",
              dataIndex: "gender",
              key: "gender",
            },
            {
              title: "Role",
              dataIndex: "roleTag",
              key: "role",
            },
            {
              title: "Actions",
              dataIndex: "actions",
              key: "actions",
            },
          ]}
        />
      </Card>

      {/* Patient View Modal */}
      <Modal
        title="Patient Details"
        open={showModal}
        footer={null}
        onCancel={() => setShowModal(false)}
      >
        {selectedPatient && (
          <Descriptions column={1} bordered size="middle">
            <Descriptions.Item label="Name">
              {selectedPatient.name}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {selectedPatient.email}
            </Descriptions.Item>
            <Descriptions.Item label="Age">
              {selectedPatient.age}
            </Descriptions.Item>
            <Descriptions.Item label="Gender">
              {selectedPatient.gender}
            </Descriptions.Item>
            <Descriptions.Item label="Role">Patient</Descriptions.Item>
            {/* Add more fields if needed */}
          </Descriptions>
        )}
      </Modal>
    </>
  );
};

export default PatientsList;
