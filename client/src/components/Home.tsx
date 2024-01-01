import { useEffect } from "react";
import Jobs from "./Jobs";
import LoginPage from "./LoginPage";
import { useAuth } from "./Context/AuthContext";

function Home() {
  const { currentUser }: any = useAuth();

  return (
    <div className="h-full relative ">
      {currentUser ? <Jobs /> : <LoginPage />}
    </div>
  );
}

export default Home;
