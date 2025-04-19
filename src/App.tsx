import React from "react";
import "./App.css";
import "./main.css";
import "./animation.css";
import { Route, Routes } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import LandingScreen from "./pages/LandingScreen.tsx";
import PublicRoute from "./components/PublicRoute.tsx";
import Login from "./pages/Login.tsx";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard.tsx";
import Register from "./pages/Register.tsx";
import LottieLoader from "./assets/lottie";
import { RootState } from "./redux/store.ts";

export default function () {
  const loading = useSelector((state: RootState) => state.alerts.loading);

  return (
    <>
      {loading ? (
        <LottieLoader />
      ) : (
        <Routes>
          <Route
            path="/landing"
            element={
              <PublicRoute>
                <LandingScreen />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard/:view?"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/login/*?"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={<ProtectedRoute>{/* Add HomePage component here */}</ProtectedRoute>}
          />
        </Routes>
      )}
    </>
  );
}
