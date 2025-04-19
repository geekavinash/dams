import React, { useEffect, useState } from "react";
import axios from "axiosConfig"; // Adjust to your config path
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice.ts";
import { setUser } from "../redux/features/userSlice.ts";
import { Navigate } from "react-router";
import LottieLoader from "../assets/lottie";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getUser = async () => {
      try {
        dispatch(showLoading());
        const res = await axios.post(
          "/api/v1/user/getUserData",
          { token },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        dispatch(hideLoading());

        if (res.data.success) {
          dispatch(setUser(res.data.data));
        } else {
          localStorage.clear();
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.clear();
      } finally {
        setCheckingAuth(false);
      }
    };

    if (token && !user) {
      getUser();
    } else {
      setCheckingAuth(false);
    }
  }, [token, user, dispatch]);

  if (!token) return <Navigate to="/landing" />;

  if (checkingAuth) return <LottieLoader />; // Or show loader

  return children;
}
