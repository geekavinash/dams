import { createSlice } from "@reduxjs/toolkit";

export const doctorsSlice = createSlice({
  name: "user",
  initialState: {
    doctorsList: [],
  },
  reducers: {
    setDoctorsList: (state, action) => {
      state.doctorsList = action.payload;
    },
  },
});

export const { setDoctorsList } = doctorsSlice.actions;
