import React, { useEffect } from "react";
import { Navigate } from "react-router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice.ts";
import { setUser } from "../redux/features/userSlice.ts";
// import {hideLoading, showLoading} from "../redux/features/alertSlice";
// import {setUser} from "../redux/features/userSlice";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  //get user
  //eslint-disable-next-line
  const getUser = async () => {
    try {
      dispatch(showLoading());
      console.log("getting data datatoke", localStorage.getItem("token"));
      const res = await axios.post(
        "/api/v1/user/getUserData",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      console.log("getting data", res, localStorage.getItem("token"));
      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(setUser(res.data.data));
        <Navigate to="/dashboard" />;
      } else {
        localStorage.clear();
        <Navigate to="/login" />;
      }
    } catch (error) {
      localStorage.clear();
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/landing" />;
  }
}
