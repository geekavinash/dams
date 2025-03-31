import React, { useState } from "react";
import "./App.css";
import "./main.css";
import "./animation.css";
import DOCTOR_BACKGROUND from "./assets/doctor_background.webp";
import LOGO from "./assets/dams_logo.svg";
import LinkButton from "./components/LinkButton.tsx";
import Spinner from "./components/Spinner.tsx";
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
          {/*<Route*/}
          {/*    path="/admin/users"*/}
          {/*    element={*/}
          {/*        <ProtectedRoute>*/}
          {/*            <Users/>*/}
          {/*        </ProtectedRoute>*/}
          {/*    }*/}
          {/*/>*/}
          {/*<Route*/}
          {/*    path="/admin/doctors"*/}
          {/*    element={*/}
          {/*        <ProtectedRoute>*/}
          {/*            <Doctors/>*/}
          {/*        </ProtectedRoute>*/}
          {/*    }*/}
          {/*/>*/}
          {/*<Route*/}
          {/*    path="/doctor/profile/:id"*/}
          {/*    element={*/}
          {/*        <ProtectedRoute>*/}
          {/*            <Profile/>*/}
          {/*        </ProtectedRoute>*/}
          {/*    }*/}
          {/*/>*/}
          {/*<Route*/}
          {/*    path="/doctor/book-appointment/:doctorId"*/}
          {/*    element={*/}
          {/*        <ProtectedRoute>*/}
          {/*            <BookingPage/>*/}
          {/*        </ProtectedRoute>*/}
          {/*    }*/}
          {/*/>*/}
          {/*<Route*/}
          {/*    path="/notification"*/}
          {/*    element={*/}
          {/*        <ProtectedRoute>*/}
          {/*            <NotificationPage/>*/}
          {/*        </ProtectedRoute>*/}
          {/*    }*/}
          {/*/>*/}
          <Route
            path="/login/*?"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          {/*<Route*/}
          {/*    path="/register"*/}
          {/*    element={*/}
          {/*        <PublicRoute>*/}
          {/*            <Register/>*/}
          {/*        </PublicRoute>*/}
          {/*    }*/}
          {/*/>*/}
          {/*<Route*/}
          {/*    path="/appointments"*/}
          {/*    element={*/}
          {/*        <ProtectedRoute>*/}
          {/*            <Appointments/>*/}
          {/*        </ProtectedRoute>*/}
          {/*    }*/}
          {/*/>*/}
          {/*<Route*/}
          {/*    path="/doctor-appointments"*/}
          {/*    element={*/}
          {/*        <ProtectedRoute>*/}
          {/*            <DoctorAppointments/>*/}
          {/*        </ProtectedRoute>*/}
          {/*    }*/}
          {/*/>*/}
          <Route
            path="/"
            element={<ProtectedRoute>{/*<HomePage/>*/}</ProtectedRoute>}
          />
        </Routes>
      )}
    </>
  );
}
