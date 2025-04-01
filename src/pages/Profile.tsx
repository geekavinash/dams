import React, { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Tag,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

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

const Profile = () => {
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const isAdmin = user?.isAdmin;
  const isDoctor = user?.isDoctor;

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        specialization: user.specialization?.split(","),
        experience: user.experience,
        feesPerConsultation: user.feesPerConsultation,
        address: user.address,
        phone: user.phone,
        timings: user.timings,
        profilePicture: user.profilePicture,
      });
    }
  }, [user]);

  const handleUpdate = async (values: any) => {
    try {
      dispatch(showLoading());

      const payload = { ...values };

      if (isDoctor && Array.isArray(payload.specialization)) {
        payload.specialization = payload.specialization.join(",");
      }

      const endpoint = isAdmin
        ? "/api/v1/admin/updateProfile"
        : isDoctor
          ? "/api/v1/doctor/updateProfile"
          : "/api/v1/user/updateProfile";

      const res = await axios.post(endpoint, payload, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch(hideLoading());

      if (res.data.success) {
        message.success("Profile updated successfully");
        window.location.reload();
      } else {
        message.error(res.data.message);
      }
    } catch (error: any) {
      dispatch(hideLoading());
      console.error("Update error:", error);
      message.error("Something went wrong");
    }
  };

  return (
    <div style={{ margin: "40px auto", padding: "0 20px" }}>
      <Card title="Edit Profile" bordered={false}>
        <Form layout="vertical" form={form} onFinish={handleUpdate}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                <Input placeholder="Enter your name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Profile Picture (URL)"
                name="profilePicture"
                rules={[{ required: false }]}
              >
                <Input placeholder="https://your-image-url.com" />
              </Form.Item>
            </Col>
          </Row>

          {(isDoctor || !isAdmin) && (
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input type="email" placeholder="Enter your email" />
            </Form.Item>
          )}

          {!isDoctor && !isAdmin && (
            <Form.Item label="Age" name="age" rules={[{ required: true }]}>
              <Input type="number" min={1} placeholder="Enter your age" />
            </Form.Item>
          )}

          {isDoctor && (
            <>
              <Form.Item
                label="Specialization"
                name="specialization"
                rules={[{ required: true }]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Select specializations"
                  options={doctorSpecializations}
                />
              </Form.Item>

              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="Experience (years)"
                    name="experience"
                    rules={[{ required: true }]}
                  >
                    <Input type="number" min={0} placeholder="Experience" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Fees per Consultation"
                    name="feesPerConsultation"
                    rules={[{ required: true }]}
                  >
                    <Input type="number" min={0} placeholder="Fees" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Phone number" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Timings"
                    name="timings"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="e.g. 10am - 6pm" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={2} placeholder="Address" />
              </Form.Item>
            </>
          )}

          {(isDoctor || (!isAdmin && !isDoctor)) && (
            <Form.Item label="Password" name="password">
              <Input.Password placeholder="Update password" />
            </Form.Item>
          )}

          <Form.Item label="Role">
            <Tag color={isDoctor ? "blue" : isAdmin ? "purple" : "green"}>
              {isDoctor ? "Doctor" : isAdmin ? "Admin" : "Patient"}
            </Tag>
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Update Profile
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Profile;
