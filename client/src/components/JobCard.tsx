import React from "react";
import { BsBookmarkHeart } from "react-icons/bs";

interface Job {
  jobTitle: String;
  type: String;
  company: String;
  location: String;
  remote: Boolean;
  salaryA: Number;
  salaryB: Number;
}

interface JobCardProp {
  job: Job;
  saveJob: (job: Job) => void;
}
function JobCard({ job, saveJob }: JobCardProp) {
  return (
    <div className="bg-white m-2 mt-14 h-[15rem] rounded-sm  relative  ">
      <div className="w-1/6 absolute top-[-35px] left-[50%] translate-x-[-50%] border border-black h-16 flex items-center justify-center bg-purple-400 font-bold text-[20px]">
        Job
      </div>
      <div className=" h-[60%]  w-full absolute bottom-7  translate-y-[-5%] flex flex-col gap-1 items-start px-10">
        <h1 className=" text-[16px]  text-gray-400 mb-1">{job.type}</h1>
        <h1 className=" text-[24px] text-gray-800">
          {job.jobTitle &&
            job.jobTitle.charAt(0).toUpperCase() + job.jobTitle.slice(1)}
        </h1>
        <h1 className=" text-[18px] text-gray-400 my-1">{job.company}</h1>

        <h1 className=" text-[16px] text-blue-400 font-bold absolute bottom-0">
          {job.remote ? "Remote" : "in office"} {job.location}
        </h1>
        <p
          onClick={() => saveJob(job)}
          className="absolute right-5 bottom-0 cursor-pointer text-red-600 hover:text-red-700"
        >
          <BsBookmarkHeart size={30} />
        </p>
      </div>
    </div>
  );
}

export default JobCard;
