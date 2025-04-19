import { useEffect, useState } from "react";
import LottieLoader from "../assets/lottie";
import { useNavigate } from "react-router";

export default function Logout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();

    window.location.reload();
  }, [navigate]);

  return loading ? <LottieLoader /> : null;
}
