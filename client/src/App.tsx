import { useState } from "react";
import "./App.css";
import Search from "./components/Search.tsx";
import Jobs from "./components/Jobs.tsx";
import NavBar from "./components/NavBar.tsx";
import { Route, Routes } from "react-router-dom";
import ListJob from "./components/ListJob.tsx";
import Home from "./components/Home.tsx";
import LoginPage from "./components/LoginPage.tsx";
import Registration from "./components/Registration.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./Redux/store.tsx";

function App() {
  const signed = useSelector((state: RootState) => state.setSigned);

  return (
    <>
      {!signed ? (
        <LoginPage />
      ) : (
        <div className="w-full h-[91%] absolute ">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<ListJob />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
