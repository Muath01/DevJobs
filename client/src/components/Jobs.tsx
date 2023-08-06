import React, { useRef, useState } from "react";
import nike from "../assets/nike.png";
import { jobs } from "../assets/jobs";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { BsBookmarkHeart } from "react-icons/bs";
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

function Jobs() {
  const [jobsList, setJobsList] = useState<JobSchema>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function bringJobsList() {
    console.log("hello");

    try {
      const response: JobSchema = await axios.get(
        "http://localhost:3001/jobs",
        {
          params: {},
        }
      );

      console.log("response: ", response.data);

      setJobsList(response);
      // console.log("JobList: ", jobsList!.data)
      console.log("JobListz: ", jobsList);
    } catch (err) {
      console.log(err);
    }
  }

  function focusInput(e: any) {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }

  function saveJob(e: any, job: any) {
    console.log("job: ", job);
    try {
      const response = axios.post("http://localhost:3001/save", {
        job: job,
        user: loggedUser(),
      });
    } catch (err) {}
  }

  function loggedUser() {
    const isLoggedIn = localStorage.getItem("loggedUser");
    const parsed = JSON.parse(isLoggedIn!) as {
      isLogged: boolean;
      user: string;
    };

    return parsed.user;
  }
  return (
    <>
      <div className="bg-purple-300 relative h-[12rem] w-full border md:rounded-bl-[20%] md:rounded-br-[20%] ">
        <div className=" absolute  flex left-1/2 translate-x-[-50%] bottom-[-30px] w-[80%] justify-center">
          <p
            onClick={(e) => focusInput(e)}
            className="p-5 bg-white rounded-l-sm md:block hidden"
          >
            <BsSearch size={20} />
          </p>
          <input
            ref={inputRef}
            placeholder="Search for job"
            className="p-5 sm:w-[100%] w-[80%] outline-none "
          />
          <input
            placeholder="filter by location"
            className="p-5 rounded-r-sm sm:w-[100%] w-[80%] outline-none border-l border-black md:block hidden"
          />
          <div className="bg-white relative flex justify-center items-center w-1/5">
            <button
              className="p-4 bg-purple-300 hover:bg-purple-400"
              onClick={bringJobsList}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className=" flex justify-center h-full">
        <div
          className=" relative top-20 grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  bg-[#efefef] w-full  md:w-[80%] justify-center
        "
        >
          {jobsList &&
            jobsList.data.map((job) => (
              <div className="bg-white m-2 mt-14 h-[15rem] rounded-sm  relative ">
                <img
                  src={nike}
                  className="w-1/6 absolute top-[-35px] left-[50%] translate-x-[-50%] border border-black"
                />
                <div className=" h-[60%]  w-full absolute bottom-7  translate-y-[-5%] flex flex-col gap-1 items-start px-10">
                  <h1 className=" text-[16px]  text-gray-400 mb-1">
                    {job.type}
                  </h1>
                  <h1 className=" text-[24px]">{job.jobTitle}</h1>
                  <h1 className=" text-[18px] text-gray-400 my-1">
                    {job.company}
                  </h1>

                  <h1 className=" text-[16px] text-blue-400 font-bold absolute bottom-0">
                    {job.remote ? "Remote" : "in office"} {job.location}
                  </h1>
                  <p
                    onClick={(e) => saveJob(e, job)}
                    className="absolute right-10 bottom-0 text-black cursor-pointer"
                  >
                    <BsBookmarkHeart size={30} />
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Jobs;
