import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router";
import axios from "axiosConfig";
import SearchComponent from "../components/SearchComponent.tsx";
import DatePickerComponent from "../components/DatePickerComponent.tsx";
import Drawer from "../components/Drawer.tsx";
import Colors from "../components/Colors.tsx";
import StatusCard from "../components/StatusCard.tsx";
import DashboardBanner from "../components/DashboardBanner.tsx";
import {
  CalendarOutlined,
  CodepenCircleFilled,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { setDoctorsList } from "../redux/features/doctorsSlice.ts";

const DoctorsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const doctorsList = useSelector((state) => state?.doctors?.doctorsList);
  const [form] = Form.useForm();
  const isAdmin = useSelector((state) => state?.user?.user?.isAdmin);
  const isDoctor = useSelector((state) => state?.user?.user?.isDoctor);

  const onDoctorUpdate = (values) => {
    const mode = form.getFieldValue("mode");
    const userId = form.getFieldValue("userId");
    const specialization = form?.getFieldValue("specialization")?.join(",");
    console.log("shouldupdate", mode, userId, specialization, values);
    if (mode === "view") {
      form.resetFields();
      return setShowDoctorModal(false);
    } else if (mode === "edit") {
      onDoctorEdit({ ...values, userId, specialization });
    } else if (mode === "remove") {
      onDoctorRemove(userId);
    } else {
      onDoctorAdd(values);
    }
  };

  const onDoctorRemove = async (userId) => {
    try {
      const res = await axios.delete(`/api/v1/doctor/${userId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        window.location.reload();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("something went wrong");
    } finally {
      setShowDoctorModal(false);
    }
  };

  const onDoctorEdit = async (values) => {
    try {
      const res = await axios.put(
        `/api/v1/doctor/update/${values.userId}`,
        values,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (res.data.success) {
        window.location.reload();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("something went wrong");
    } finally {
      setShowDoctorModal(false);
    }
  };

  const onDoctorAdd = async (values) => {
    try {
      const res = await axios.post("/api/v1/user/register", {
        ...values,
        specialization: values.specialization.join(","),
        isDoctor: true,
      });
      if (res.data.success) {
        window.location.reload();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("something went wrong");
    } finally {
      setShowDoctorModal(false);
    }
  };

  const [doctorsListLoading, setDoctorsListLoading] = useState(false);

  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [doctorData, setDoctorData] = useState({});
  const [doctorModalMode, setDoctorModalMode] = useState("add");

  const openAddDoctorModal = () => {};

  return (
    <>
      <DoctorDetailsModal
        onUpdate={onDoctorUpdate}
        show={showDoctorModal}
        onClose={() => {
          form.resetFields();
          setDoctorData({});
          setShowDoctorModal(false);
          setDoctorModalMode("add");
        }}
        mode={doctorModalMode}
        form={form}
      />
      <Card
        title={"All Doctors"}
        extra={
          <Button
            icon={<PlusOutlined />}
            style={{
              visibility: isAdmin ? "visible" : "hidden",
              backgroundColor: Colors.lightblue,
              color: Colors.blue,
              fontWeight: "bold",
              border: "0px",
            }}
            onClick={() => setShowDoctorModal(!showDoctorModal)}
          >
            Add Doctor
          </Button>
        }
        style={{
          padding: 0,
          // flex: 1,
          // alignItems: "center",
          // display: "flex",
        }}
      >
        <Table
          loading={doctorsListLoading}
          style={{ flex: 1 }}
          dataSource={doctorsList.map((item, index) => {
            return {
              ...item,
              specialization: item.specialization
                .split(",")
                .map((s) => (
                  <Tag style={{ textTransform: "capitalize" }}>{s}</Tag>
                )),
              key: item.userId,
              events: (
                <div
                  style={{
                    columnGap: 10,
                    display: "flex",
                  }}
                >
                  {isAdmin ? (
                    <>
                      <Button
                        icon={<EditOutlined />}
                        style={{
                          backgroundColor: Colors.lightblue,
                          color: Colors.blue,
                          fontWeight: "bold",
                          border: "0px",
                        }}
                        onClick={() => {
                          form.setFieldsValue(item);
                          form.setFieldValue(
                            "specialization",
                            item?.specialization?.split(","),
                          );
                          form.setFieldValue("password", "test");
                          form.setFieldValue("mode", "edit");
                          form.setFieldValue("userId", item?.userId);
                          setDoctorModalMode("edit");
                          setShowDoctorModal(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        icon={<EyeOutlined />}
                        style={{
                          backgroundColor: Colors.lightblue,
                          color: Colors.blue,
                          fontWeight: "bold",
                          border: "0px",
                        }}
                        onClick={() => {
                          form.setFieldsValue(item);
                          form.setFieldValue(
                            "specialization",
                            item?.specialization?.split(","),
                          );
                          form.setFieldValue("password", "test");
                          form.setFieldValue("mode", "view");
                          form.setFieldValue("userId", item?.userId);
                          setDoctorModalMode("view");
                          setShowDoctorModal(true);
                        }}
                      >
                        View
                      </Button>
                      <Button
                        danger={true}
                        type={"primary"}
                        icon={<DeleteOutlined />}
                        style={{}}
                        onClick={() => {
                          form.setFieldsValue(item);
                          form.setFieldValue(
                            "specialization",
                            item?.specialization?.split(","),
                          );
                          form.setFieldValue("password", "test");
                          form.setFieldValue("mode", "remove");
                          form.setFieldValue("userId", item?.userId);
                          setDoctorModalMode("remove");
                          setShowDoctorModal(true);
                        }}
                      >
                        Remove
                      </Button>
                    </>
                  ) : (
                    <Button
                      type={"primary"}
                      icon={<CalendarOutlined />}
                      style={{}}
                      onClick={() => {
                        navigate("/dashboard/appointments");
                      }}
                    >
                      Book Appointment
                    </Button>
                  )}
                </div>
              ),
            };
          })}
          columns={[
            {
              title: "Doctor Name",
              dataIndex: "name",
              key: "name",
              sorter: {
                compare: (a, b) => a.name.localeCompare(b.name),
              },
            },
            {
              title: "Email",
              dataIndex: "email",
              key: "email",
            },
            {
              title: "Specialties",
              dataIndex: "specialization",
              key: "specialization",
            },
            {
              title: "Fees",
              dataIndex: "feesPerConsultation",
              key: "feesPerConsultation",
              sorter: {
                compare: (a, b) =>
                  a.feesPerConsultation - b.feesPerConsultation,
              },
            },
            {
              title: "Events",
              dataIndex: "events",
              key: "events",
            },
          ]}
          // style={{ flex: 1 }}
        ></Table>
      </Card>
    </>
  );
};

export default DoctorsList;

function DoctorDetailsModal({
  onUpdate,
  onDoctorEdit,
  onDoctorDelete,
  show,
  onClose,
  formData = null,
  mode = "add",
  form,
}) {
  const doctorSpecializations = [
    { label: "Cardiology", value: "cardiology" },
    { label: "Endocrinology", value: "endocrinology" },
    { label: "Neurology", value: "neurology" },
    { label: "Oncology", value: "oncology" },
    { label: "Pulmonology", value: "pulmonology" },
    { label: "Gastroenterology", value: "gastroenterology" },
    { label: "Nephrology", value: "nephrology" },
    { label: "Hematology", value: "hematology" },
    { label: "Rheumatology", value: "rheumatology" },
    { label: "Dermatology", value: "dermatology" },
    { label: "Ophthalmology", value: "ophthalmology" },
    { label: "Urology", value: "urology" },
    { label: "Pediatrics", value: "pediatrics" },
    { label: "Geriatrics", value: "geriatrics" },
    { label: "Orthopedics", value: "orthopedics" },
    { label: "Psychiatry", value: "psychiatry" },
    { label: "Anesthesiology", value: "anesthesiology" },
    { label: "General Surgery", value: "general_surgery" },
    { label: "Physician", value: "physician" },
  ];

  return (
    <Modal
      title="Add Doctor"
      centered
      open={show}
      onCancel={onClose}
      width={{
        xs: "90%",
        sm: "80%",
        md: "70%",
        lg: "60%",
        xl: "50%",
        xxl: "40%",
      }}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onUpdate}
        className="register-form"
        wrapperCol={{ flex: 1 }}
      >
        <Row>
          <Col span={10}>
            <Form.Item label="Doctor Name" name="name" required>
              <Input
                type="name"
                required
                placeholder="Please enter doctor's name"
              />
            </Form.Item>
          </Col>
          <Col span={10} offset={2}>
            <Form.Item label="Email" name="email" required>
              <Input
                type="email"
                required
                placeholder="Please enter doctor's email"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <Form.Item
              label="Password"
              name="password"
              required={mode === "add"}
              initialValue={mode !== "add" ? "random" : ""}
            >
              <Input
                type="password"
                required
                placeholder="Please enter doctor's password"
              />
            </Form.Item>
          </Col>
          <Col span={10} offset={2}>
            <Form.Item label="Specialization" name="specialization" required>
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                options={doctorSpecializations}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <Form.Item label="Address" name="address" required>
              <Input
                type="text"
                required
                placeholder="Please enter doctor's name"
              />
            </Form.Item>
          </Col>
          <Col span={10} offset={2}>
            <Form.Item label="Phone" name="phone" required>
              <Input
                type="phone"
                required
                placeholder="Please enter doctor's email"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <Form.Item label="Experience" name="experience" required>
              <Input
                type="number"
                required
                placeholder="Please enter doctor's password"
              />
            </Form.Item>
          </Col>
          <Col span={10} offset={2}>
            <Form.Item label="Fees" name="feesPerConsultation" required>
              <Input
                type="number"
                required
                placeholder="Please enter doctor's password"
              />
            </Form.Item>
          </Col>
        </Row>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <Button type={"default"} onClick={onClose} disabled={false}>
            Cancel
          </Button>
          <Button
            danger={mode === "remove"}
            type={"primary"}
            htmlType={"submit"}
            disabled={false}
          >
            {mode === "remove"
              ? "Remove"
              : mode === "edit"
                ? "Update"
                : mode === "view"
                  ? "Ok"
                  : "Add"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
