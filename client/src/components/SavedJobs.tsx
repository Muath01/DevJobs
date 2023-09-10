import nike from "../assets/nike.png";
import { useSelector } from "react-redux";

import { RootState } from "../Redux/store";

function SavedJobs() {
  const savedJobs = useSelector((state: RootState) => state.saveJobs);

  console.log("Saved Jobs: ", savedJobs);

  return (
    <>
      <div className="bg-purple-300 relative h-[12rem] w-full border md:rounded-bl-[20%] md:rounded-br-[20%] "></div>
      <div className=" flex justify-center h-full">
        <div
          className=" relative top-20 grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  bg-[#efefef] w-full  md:w-[80%] justify-center
        "
        >
          {savedJobs &&
            savedJobs.reverse().map((job) => (
              <div className="bg-white m-2 mt-14 h-[15rem] rounded-sm  relative ">
                <div className="w-1/6 absolute top-[-35px] left-[50%] translate-x-[-50%] border border-black h-16 flex items-center justify-center bg-purple-400 font-bold text-[20px]">
                  Job
                </div>
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
