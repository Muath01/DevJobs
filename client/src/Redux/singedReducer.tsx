import { createSlice } from "@reduxjs/toolkit";

if (!localStorage.getItem("loggedUser")) {
  let whoLogged = {
    isLogged: false,
    user: "",
  };
  let whoLoggedObjectString = JSON.stringify(whoLogged);
  localStorage.setItem("loggedUser", whoLoggedObjectString);
} else {
  console.log("there is a logged user");
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
      console.log("action: ", action.payload);

      state.signed = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSigned } = signedReducer.actions;

export default signedReducer.reducer;
