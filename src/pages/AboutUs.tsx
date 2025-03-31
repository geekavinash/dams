import React from "react";
import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

const AboutUs = () => {
  return (
    <Card
      style={{
        // maxWidth: 900,
        margin: "40px auto",
        padding: "24px",
        paddingTop: 0,
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Typography>
        <Title level={2}>
          About Us – DAMS (Doctor Appointment Management System)
        </Title>

        <Paragraph>
          Welcome to <strong>DAMS</strong>, a smart and seamless platform
          designed to bridge the gap between patients and healthcare
          professionals.
        </Paragraph>

        <Paragraph>
          At DAMS, we believe that{" "}
          <strong>
            access to medical care should be simple, fast, and transparent
          </strong>
          . Whether you’re a patient looking for a doctor or a healthcare
          provider managing your schedule, our platform makes the process
          effortless.
        </Paragraph>

        <Title level={3}>Why We Built DAMS</Title>
        <Paragraph>
          Healthcare is essential — but getting a timely appointment shouldn't
          be a challenge. We created DAMS to:
          <ul>
            <li>
              Simplify the <strong>appointment booking process</strong>
            </li>
            <li>
              Empower doctors with a digital dashboard to{" "}
              <strong>manage schedules</strong>
            </li>
            <li>
              Give patients easy access to <strong>specialized care</strong>
            </li>
            <li>Eliminate unnecessary paperwork and phone calls</li>
          </ul>
        </Paragraph>

        <Title level={3}>Key Features</Title>
        <ul>
          <li>
            📅 <strong>Instant Appointment Booking:</strong> Book doctor
            appointments in just a few clicks.
          </li>
          <li>
            👨‍⚕️ <strong>Doctor Dashboard:</strong> View, manage, and update
            appointments with ease.
          </li>
          <li>
            🔐 <strong>Secure & Role-Based Access:</strong> Custom access for
            admins, doctors, and patients.
          </li>
          <li>
            🔔 <strong>Smart Notifications:</strong> Stay updated with real-time
            alerts.
          </li>
        </ul>

        <Title level={3}>Built With Modern Tech</Title>
        <Paragraph>
          DAMS is a <strong>full-stack web application</strong> built using:
          <ul>
            <li>
              <strong>React</strong> for a dynamic frontend
            </li>
            <li>
              <strong>Node.js & Express</strong> for scalable backend APIs
            </li>
            <li>
              <strong>MongoDB</strong> for flexible and secure data storage
            </li>
            <li>
              <strong>JWT</strong> for user authentication and session
              management
            </li>
          </ul>
        </Paragraph>

        <Title level={3}>Our Mission</Title>
        <Paragraph>
          To modernize the way patients and doctors connect — making healthcare
          management more efficient, transparent, and accessible to all.
        </Paragraph>

        <Title level={3}>Thank You</Title>
        <Paragraph>
          Thank you for using DAMS. We’re continuously working to improve the
          platform and make your healthcare experience better, faster, and
          smarter.
        </Paragraph>

        <Paragraph>
          Have feedback or questions? Don’t hesitate to reach out — we’d love to
          hear from you!
        </Paragraph>
      </Typography>
    </Card>
  );
};

export default AboutUs;
