import { configureStore, createStore } from "@reduxjs/toolkit";
import { alertSlice } from "./features/alertSlice";
import { userSlice } from "./features/userSlice";
import { doctorsSlice } from "./features/doctorsSlice";

// load string from localStarage and convert into an Object
// invalid output must be undefined
function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("persistentState");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

// create our store from our rootReducers and use loadFromLocalStorage
// to overwrite any values that we already have saved

const reHydrateStore = () => {
  if (localStorage.getItem("persistentState") !== null) {
    return JSON.parse(localStorage.getItem("persistentState")); // re-hydrate the store
  }
};

const rootReducer = {
  alerts: alertSlice.reducer,
  user: userSlice.reducer,
  doctors: doctorsSlice.reducer,
};

export default configureStore({
  reducer: rootReducer,
  devTools: true,
  preloadedState: reHydrateStore(),
});

export type RootState = ReturnType<typeof rootReducer>;
