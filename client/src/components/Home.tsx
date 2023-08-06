import React from "react";
import Search from "./Search";
import Jobs from "./Jobs";
import { RootState } from "../Redux/store";
import { useSelector } from "react-redux";
import LoginPage from "./LoginPage";

function Home() {
  const { signed } = useSelector((state: RootState) => state.setSigned);
  console.log(signed);

  const isLoggedIn = localStorage.getItem("loggedUser");
  const parsed = JSON.parse(isLoggedIn!) as {
    isLogged: boolean;
    user: string;
  };

  console.log("bbbb, ", parsed);

  return (
    <div className="h-full relative ">
      {parsed.isLogged ? <Jobs /> : <LoginPage />}
    </div>
  );
}

export default Home;
