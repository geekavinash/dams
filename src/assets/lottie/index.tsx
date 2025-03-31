import React from "react";
import Lottie from "lottie-react";
import animationData from "./gene_loading.json";

export default function LottieLoader() {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: 100 }}>
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
}
