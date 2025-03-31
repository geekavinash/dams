import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Table,
  Tag,
  message,
  Form,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Modal,
} from "antd";
import axios from "axios";
import Colors from "../components/Colors.tsx";
import { EyeOutlined } from "@ant-design/icons";
import Endpoints from "../Endpoints.tsx";
import { useSelector } from "react-redux";
import { FaBookMedical } from "react-icons/fa";

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const isAdmin = user?.isAdmin;
  const isDoctor = user?.isDoctor;

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        user.isAdmin
          ? Endpoints.getAdminAppointments
          : user.isDoctor
            ? Endpoints.getDoctorAppointments
            : Endpoints.getPatientAppointments,
        {
          isAdmin: user?.isAdmin,
          isDoctor: user?.isDoctor,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (res.data.success) {
        setAppointments(res.data.data);
      } else {
        message.error(res.data.message || "Failed to fetch appointments");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const [openAppointmentModal, setOpenAppointmentModal] = useState(false);

  const addAppointment = () => {
    setOpenAppointmentModal(true);
  };

  return (
    <Card
      title="Appointments List"
      style={{ padding: 0 }}
      extra={
        <div style={{ gap: 10, display: "flex" }}>
          <Button
            icon={<EyeOutlined />}
            style={{
              backgroundColor: Colors.lightblue,
              color: Colors.blue,
              fontWeight: "bold",
              border: "0px",
            }}
            onClick={fetchAppointments}
          >
            Refresh
          </Button>
          {!(isAdmin || isDoctor) ? (
            <Button
              icon={<FaBookMedical />}
              style={{
                backgroundColor: Colors.lightblue,
                color: Colors.blue,
                fontWeight: "bold",
                border: "0px",
              }}
              onClick={addAppointment}
            >
              Request Appointment
            </Button>
          ) : null}
        </div>
      }
    >
      <AppointmentBookingModal
        show={openAppointmentModal}
        disabled={isAdmin || isDoctor}
        onClose={() => setOpenAppointmentModal(false)}
      />
      <Table
        loading={loading}
        dataSource={appointments.map((item) => ({
          ...item,
          key: item._id,
          date: new Date(item.date).toLocaleDateString(),
          patientName: item?.userInfo?.name,
          patientAge: item?.userInfo?.age,
          patientGender: item?.userInfo?.gender,
          doctorName: item?.doctorInfo?.name,
          statusTag: (
            <Tag
              color={
                item.status === "Scheduled"
                  ? "blue"
                  : item.status === "Attended"
                    ? "green"
                    : "red"
              }
              style={{ textTransform: "capitalize" }}
            >
              {item.status}
            </Tag>
          ),
        }))}
        columns={[
          {
            title: "Date",
            dataIndex: "date",
            key: "date",
          },
          {
            title: "Patient Name",
            dataIndex: "patientName",
            key: "patientName",
          },
          {
            title: "Patient Age",
            dataIndex: "patientAge",
            key: "patientAge",
          },
          {
            title: "Patient Gender",
            dataIndex: "patientGender",
            key: "patientGender",
          },
          {
            title: "Doctor Name",
            dataIndex: "doctorName",
            key: "doctorName",
          },
          {
            title: "Attended",
            dataIndex: "statusTag",
            key: "statusTag",
          },
        ]}
      />
    </Card>
  );
};

export default AppointmentsList;

const AppointmentBookingModal = ({ show, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const { user } = useSelector((state) => state.user);
  const [doctors, setDoctors] = useState([]);
  const doctorsList = useSelector((state) => state?.doctors?.doctorsList);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(Endpoints.getAllDoctors, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    if (show) {
      fetchDoctors();
      form.setFieldsValue({
        name: user.name,
        age: user.age,
        gender: user.gender,
      });
    }
  }, [show]);

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post(
        Endpoints.bookAppointment,
        {
          userId: user._id,
          description: values.description,
          doctorId: values.doctorId,
          date: values.date.toISOString(),
          time: values.time.format("HH:mm"),
          userInfo: {
            name: values.name,
            age: values.age,
            gender: values.gender,
          },
          doctorInfo: {
            name: doctorsList.find((d) => d.userId === values.doctorId)?.name,
          },
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (res.data.success) {
        onSuccess?.();
        form.resetFields();
        onClose();
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  return (
    <Modal
      title="Book Appointment"
      centered
      open={show}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Patient Name" name="name">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Age" name="age">
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Gender" name="gender">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Select Doctor"
              name="doctorId"
              rules={[{ required: true, message: "Please select a doctor" }]}
            >
              <Select
                placeholder="Select Doctor"
                options={doctorsList.map((doc) => ({
                  label: doc.name,
                  value: doc.userId,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "Please select a date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Time"
              name="time"
              rules={[{ required: true, message: "Please select a time" }]}
            >
              <TimePicker style={{ width: "100%" }} format="HH:mm" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Brief description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please enter brief description of problem",
                },
              ]}
            >
              <Input.TextArea
                autoSize={{ minRows: 2, maxRows: 6 }}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
        >
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Book Appointment
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
