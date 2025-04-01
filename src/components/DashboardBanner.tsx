import React, { useState } from "react";
import { useSelector } from "react-redux";
import imgg from "../assets/banner_background.jpg"; // update path if needed

const DashboardBanner = () => {
  const { user } = useSelector((state: any) => state.user);
  const [showBanner, setShowBanner] = useState(true);

  if (!showBanner) return null;

  return (
    <div
      style={{
        position: "relative",
        height: 300,
        backgroundImage: `url(${imgg})`,
        borderRadius: 10,
        padding: 30,
        backgroundPosition: "center",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Close button */}
      <button
        onClick={() => setShowBanner(false)}
        style={{
          position: "absolute",
          top: 10,
          right: 15,
          background: "transparent",
          border: "none",
          fontSize: 20,
          fontWeight: "bold",
          cursor: "pointer",
        }}
        aria-label="Close banner"
      >
        ✖
      </button>

      {/* Banner Content */}
      <span style={{ fontWeight: "bold", fontSize: 22 }}>👋 Welcome back,</span>

      <span style={{ fontWeight: "bold", fontSize: 32 }}>
        {user?.name || "User"}!
      </span>

      <span style={{ marginTop: 20, fontSize: 16, maxWidth: 600 }}>
        Thanks for being part of DAMS — your trusted Doctor Appointment
        Management System. We're here to simplify your healthcare journey.
      </span>

      <button
        className="btn btn-primary"
        type="button"
        style={{
          marginTop: 30,
          width: "fit-content",
          paddingLeft: 40,
          paddingRight: 40,
          fontWeight: "bold",
        }}
        onClick={() => {
          window.location.href = "/dashboard/appointments";
        }}
      >
        View My Appointments
      </button>
    </div>
  );
};

export default DashboardBanner;
