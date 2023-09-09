import { useEffect } from "react";
import Jobs from "./Jobs";
import LoginPage from "./LoginPage";

function Home() {
  const isLoggedIn = localStorage.getItem("loggedUser");
  const parsed = JSON.parse(isLoggedIn!) as {
    isLogged: boolean;
    user: string;
  };

  useEffect(() => {}, [parsed]);

  return (
    <div className="h-full relative ">
      {parsed.isLogged ? <Jobs /> : <LoginPage />}
    </div>
  );
}

export default Home;
