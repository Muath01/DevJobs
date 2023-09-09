import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { setJobs } from "../Redux/jobReducer";

interface JobSchema {
  data: {
    jobTitle: String;
    type: String;
    company: String;
    location: String;
    remote: Boolean;
    salaryA: Number;
    salaryB: Number;
  }[];
}

function NavBar() {
  const [hidden, setHidden] = useState(true);

  const dispatch = useDispatch();

  const userNameLocal = localStorage.getItem("loggedUser");
  const parsedLocalStorage = JSON.parse(userNameLocal!) as {
    isLogged: Boolean;
    user: String;
  };

  async function getSavedJobs() {
    try {
      const isLoggedIn = localStorage.getItem("loggedUser");
      const parsed = JSON.parse(isLoggedIn!) as {
        isLogged: boolean;
        user: string;
      };

      const response: JobSchema = await axios.get(
        "https://devjobs-klnj.onrender.com/arch/saved",
        {
          params: {
            body: parsed.user,
          },
        }
      );

      dispatch(setJobs(response.data));
    } catch (error) {}
  }

  //function to set the loggedin status to false
  function signOut() {
    // Retrieve the string from local storage
    const isLoggedIn = localStorage.getItem("loggedUser");

    // type assertion aviod null > string error
    const parsed = JSON.parse(isLoggedIn!) as {
      isLogged: boolean;
      user: string;
    };

    //
    parsed.isLogged = false;

    // stringify that parse data
    const updatedObjectString = JSON.stringify(parsed);

    // store back to local storage
    localStorage.setItem("loggedUser", updatedObjectString);
  }

  return (
    <div className="relative">
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              {parsedLocalStorage.isLogged
                ? parsedLocalStorage.user
                : "Please Log in"}
            </span>
          </Link>
          <button
            onClick={() => setHidden(!hidden)}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu </span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            className={`${hidden ? "hidden" : null}  w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  onClick={() => setHidden(!hidden)}
                  to="/"
                  className="block py-2 pl-3 pr-4 text-white bg-purple-700 rounded md:bg-transparent md:text-purple-700 md:p-0 dark:text-white md:dark:text-purple-500"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setHidden(!hidden)}
                  to="/list"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Hire
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    getSavedJobs();
                    setHidden(!hidden);
                  }}
                  to="/saved"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Saved
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setHidden(!hidden)}
                  to="/login"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    signOut();
                    setHidden(!hidden);
                    location.reload();
                  }}
                  to="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  sign out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
