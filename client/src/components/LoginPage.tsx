import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { setSigned } from "../Redux/singedReducer";

function LoginPage() {
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({});

  const dispatch = useDispatch();

  function postLoginState(e: any) {
    const { name, value } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  }

  async function login(e: any) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://devjobs-klnj.onrender.com/auth/login",
        {
          loginInfo: loginInfo,
        }
      );

      if (!response.data.success) {
        dispatch(setSigned(response.data.success));
      } else {
        let whoLogged = { isLogged: true, user: response.data.user };
        let whoLoggedObjectString = JSON.stringify(whoLogged);
        localStorage.setItem("loggedUser", whoLoggedObjectString);
        dispatch(setSigned(response.data.success));
      }
    } catch (error: any) {}
  }
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-1222 lg:px-8 bg-white h-full">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={login}>
          <div>
            <label
              htmlFor="email"
              className=" text-sm font-medium leading-6 flex  text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={(e) => postLoginState(e)}
                className="block w-full rounded-md border-0 pl-1.5 py-1.5  text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={(e) => postLoginState(e)}
                required
                className="block w-full rounded-md border-0 pl-1.5 py-1.5  text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                navigate("/");
              }}
            >
              Sign in
            </button>
            <button
              type="submit"
              onClick={() => {
                navigate("/register");
              }}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
