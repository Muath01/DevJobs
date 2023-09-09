import { createSlice } from "@reduxjs/toolkit";

if (!localStorage.getItem("loggedUser")) {
  let whoLogged = {
    isLogged: false,
    user: "",
  };
  let whoLoggedObjectString = JSON.stringify(whoLogged);
  localStorage.setItem("loggedUser", whoLoggedObjectString);
} else {
}
export interface signedState {
  signed: Boolean;
}

const initialState: signedState = {
  signed: false,
};

export const signedReducer = createSlice({
  name: "signed",
  initialState,
  reducers: {
    setSigned: (state, action) => {
      state.signed = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSigned } = signedReducer.actions;

export default signedReducer.reducer;
