import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ListJob() {
  const [newJob, setNewJob] = useState({});
  const navigate = useNavigate();

  async function createNewJob(e: any) {
    const { name, value, innerText } = e.target;

    setNewJob({
      ...newJob,
      [name !== undefined ? name : "remote"]:
        value !== undefined ? value.toLowerCase() : innerText,
    });
  }

  async function ListJob(e: any) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://devjobs-klnj.onrender.com/job/list",
        // "http://localhost:3001/job/list",
        {
          newJob: newJob,
        }
      );

      navigate("/");
    } catch (error: any) {
      console.error("error: ", error);
    }
  }

  return (
    <div className="h-full w-full bg-yellow-200 flex justify-center items-center">
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-2  border-2 ">
              <img className=" h-full object-cover " />
            </div>

            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
              <form action="" className="space-y-4" onSubmit={ListJob}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="sr-only" htmlFor="name">
                    Job Title
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="jobTitle"
                    type="text"
                    name="jobTitle"
                    id="name"
                    onChange={createNewJob}
                  />
                  <div>
                    <label className="sr-only" htmlFor="type">
                      type
                    </label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm "
                      placeholder="type"
                      type="text"
                      name="type"
                      id="email"
                      onChange={createNewJob}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="sr-only" htmlFor="company">
                      company
                    </label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm "
                      placeholder="company"
                      type="text"
                      name="company"
                      id="email"
                      onChange={createNewJob}
                    />
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="phone">
                      Location
                    </label>
                    <input
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Location"
                      type="text"
                      name="location"
                      id="phone"
                      onChange={createNewJob}
                    />
                  </div>
                </div>

                <div className=" gap-4 text-center sm:grid-cols-3  flex justify-center items-center ">
                  <div>
                    <input
                      className="peer sr-only"
                      id="option1"
                      type="radio"
                      name="remote"
                    />

                    <label
                      onClick={createNewJob}
                      htmlFor="option1"
                      className="block w-full rounded-lg border border-gray-200 p-3 cursor-pointer hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white bg-purple-400 text-white"
                    >
                      Remote
                    </label>
                  </div>

                  <div>
                    <input
                      className="peer sr-only"
                      id="option2"
                      type="radio"
                      name="remote"
                    />

                    <label
                      onClick={createNewJob}
                      htmlFor="option2"
                      className="block w-full rounded-lg border border-gray-200 p-3 cursor-pointer hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white bg-purple-400 text-white"
                    >
                      In Office
                    </label>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Salary Range
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        name="salaryA"
                        onChange={createNewJob}
                        id="price"
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="0.00"
                      />
                      <input
                        type="text"
                        name="salaryB"
                        onChange={createNewJob}
                        id="price"
                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="0.00"
                      />
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <label htmlFor="currency" className="sr-only">
                        Currency
                      </label>
                      <select
                        id="currency"
                        name="currency"
                        className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                      >
                        <option>USD</option>
                        <option>CAD</option>
                        <option>EUR</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="inline-block w-full rounded-lg px-5 py-3 font-medium text-white sm:w-auto bg-purple-400"
                  >
                    List Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ListJob;
