import axios from "axios";
import React, { useRef, useState } from "react";
import nike from "../assets/nike.png";
import { useSelector } from "react-redux";

import { BsBookmarkHeart, BsSearch } from "react-icons/bs";
import { RootState } from "../Redux/store";

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

function SavedJobs() {
  const [savedJobList, setSavedJobList] = useState<JobSchema>();

  const test = useSelector((state: RootState) => state.saveJobs);

  console.log("test: ", test);

  const inputRef = useRef<HTMLInputElement | null>(null);

  async function getSavedJobs() {
    try {
      const isLoggedIn = localStorage.getItem("loggedUser");
      const parsed = JSON.parse(isLoggedIn!) as {
        isLogged: boolean;
        user: string;
      };

      const response: JobSchema = await axios.get(
        "http://localhost:3001/saved",
        {
          params: {
            body: parsed.user,
          },
        }
      );
      setSavedJobList(response);
      console.log("dddd: ", savedJobList);
    } catch (error) {}
  }

  function focusInput(e: any) {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }

  return (
    <>
      <div className="bg-purple-300 relative h-[12rem] w-full border md:rounded-bl-[20%] md:rounded-br-[20%] "></div>
      <div className=" flex justify-center h-full">
        <div
          className=" relative top-20 grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  bg-[#efefef] w-full  md:w-[80%] justify-center
        "
        >
          {test &&
            test.map((job) => (
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
                  {/* <p
                    onClick={(e) => saveJob(e, job)}
                    className="absolute right-10 bottom-0 text-black cursor-pointer"
                  >
                    <BsBookmarkHeart size={30} />
                  </p> */}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default SavedJobs;
