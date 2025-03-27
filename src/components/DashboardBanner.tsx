import React from "react";
import imgg from "../assets/banner_background.jpg";

const DashboardBanner = () => {
  return (
    <div
      style={{
        height: 300,
        backgroundImage: `url(${imgg})`,
        borderRadius: 10,
        resize: "revert",
        padding: 30,
        backgroundPosition: "center",
        backgroundSize: "100%",
      }}
    >
      <span style={{ fontWeight: "bold", fontSize: 20 }}>Welcome</span>
      <br />
      <br />
      <span style={{ fontWeight: "bold", fontSize: 30 }}>Test Doctor</span>
      <br />
      <br />
      <span>
        Thanks for joining DAMS. We are trying to provide you best service
        <br />
        Thanks for joining DAMS. We are trying to provide you best service
      </span>
      <br />
      <br />
      <button
        className="btn btn-primary"
        type="submit"
        style={{ paddingLeft: 50, paddingRight: 50, fontWeight: "bold" }}
      >
        View my Appointments
      </button>
      {/*<img src={imgg} style={{}} />*/}
    </div>
  );
};

export default DashboardBanner;
