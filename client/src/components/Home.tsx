import Jobs from "./Jobs";
import { RootState } from "../Redux/store";
import { useSelector } from "react-redux";
import LoginPage from "./LoginPage";
import NavBar from "./NavBar";

function Home() {
  const { signed } = useSelector((state: RootState) => state.setSigned);

  const isLoggedIn = localStorage.getItem("loggedUser");
  const parsed = JSON.parse(isLoggedIn!) as {
    isLogged: boolean;
    user: string;
  };

  console.log("Inside Home... ");

  return (
    <div className="h-full relative ">
      {parsed.isLogged ? <Jobs /> : <LoginPage />}
    </div>
  );
}

export default Home;
