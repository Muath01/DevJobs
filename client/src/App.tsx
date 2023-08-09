import "./App.css";
import NavBar from "./components/NavBar.tsx";
import { Route, Routes } from "react-router-dom";
import ListJob from "./components/ListJob.tsx";
import Home from "./components/Home.tsx";
import LoginPage from "./components/LoginPage.tsx";
import Registration from "./components/Registration.tsx";
import SavedJobs from "./components/SavedJobs.tsx";

function App() {
  return (
    <>
      <div className="w-full h-[91%] absolute ">
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/DevJobs" element={<Home />} />
          <Route path="/list" element={<ListJob />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/saved" element={<SavedJobs />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
