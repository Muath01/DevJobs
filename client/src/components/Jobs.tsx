import React, { useState } from "react";
import nike from "../assets/nike.png";
import { jobs } from "../assets/jobs";
import axios from "axios";

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
  return (
    <>
      <div className="bg-purple-300 relative h-[12rem] w-full ">
        <div className=" absolute  flex left-1/2 translate-x-[-50%] bottom-[-30px]  w-full justify-center">
          <input
            placeholder="text"
            className="p-5 rounded-lg  sm:w-1/2 w-[80%] outline-none "
          />
          <button
            className="p-5 bg-blue-400 hover:bg-blue-500"
            onClick={bringJobsList}
          >
            Search
          </button>
        </div>
      </div>
      <div className=" relative top-20 grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-[#afafaf] ">
        {jobsList &&
          jobsList.data.map((job) => (
            <div className="bg-white m-2 mt-14 h-[15rem] rounded-lg  relative ">
              <img
                src={nike}
                className="w-1/6 absolute top-[-35px] left-[50%] translate-x-[-50%] border border-black"
              />
              <div className=" h-[60%]  w-full absolute bottom-0  translate-y-[-5%] flex flex-col gap-1 items-start px-10">
                <h1 className=" text-[24px]  text-gray-400">{job.type}</h1>
                <h1 className=" text-[24px]">{job.jobTitle}</h1>
                <h1 className=" text-[24px] text-gray-400">{job.company}</h1>
                <h1 className=" text-[24px] text-blue-400 font-bold absolute bottom-0">
                  {job.remote ? "Remote" : "in office"} {job.location}
                </h1>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Jobs;
