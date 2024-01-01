import { useRef, useState, useEffect } from "react";
import jobImg from "../assets/nike.png";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { BsBookmarkHeart } from "react-icons/bs";
import { jobSchema } from "../Redux/jobReducer";
import JobCard from "./JobCard";

// interface JobSchema {
//   jobTitle: String;
//   type: String;
//   company: String;
//   location: String;
//   remote: Boolean;
//   salaryA: Number;
//   salaryB: Number;
// }

function Jobs() {
  const [search, setSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");

  // show more item state

  const [items, setItems] = useState<jobSchema[]>();
  const [visible, setVisible] = useState<number>(6);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetch("https://devjobs-klnj.onrender.com/job/display")
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data);
        setItems(data);
      });
  }, []);

  function focusInput() {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }

  function saveJob(job: any) {
    try {
      axios.post("https://devjobs-klnj.onrender.com/arch/save", {
        job: job,
        user: loggedUser(),
      });
    } catch (err: any) {}
  }

  function loggedUser() {
    const isLoggedIn = localStorage.getItem("loggedUser");
    const parsed = JSON.parse(isLoggedIn!) as {
      isLogged: boolean;
      user: string;
    };
    console.log("here");

    return parsed.user;
  }
  return (
    <>
      <div className="flex flex-col  pb-5 ">
        <div className="bg-purple-300  relative h-[12rem] w-full border md:rounded-bl-[20%] md:rounded-br-[20%] ">
          <div className=" absolute  flex left-1/2 translate-x-[-50%] bottom-[-30px] w-[80%] justify-center">
            <p
              onClick={() => focusInput()}
              className="p-5 bg-white rounded-l-sm md:block hidden border-none "
            >
              <BsSearch size={20} />
            </p>
            <input
              ref={inputRef}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for job"
              className="p-5 sm:w-[100%] w-[80%] outline-none bg-white text-black "
            />
            <input
              onChange={(e) => setCitySearch(e.target.value)}
              placeholder="filter by location"
              className="p-5 rounded-r-sm sm:w-[100%] w-[80%] outline-none border-l border-black md:block hidden bg-white text-black"
            />
            <div className="bg-white relative flex justify-center items-center w-1/5">
              <button
                className="p-4 bg-purple-300 hover:bg-purple-400"
                // onClick={bringJobsList}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className=" flex justify-center h-full  relative top-20 ">
          <div
            className=" relative  grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  bg-[#efefef] w-full  md:w-[80%] justify-center
        "
          >
            {items &&
              [...items]
                .reverse()
                .slice(0, visible)
                .filter((job) => {
                  if (
                    search.toLowerCase() == "" &&
                    citySearch.toLowerCase() == ""
                  ) {
                    return job;
                  } else {
                    const cityMatch = job.location
                      .toLowerCase()
                      .startsWith(citySearch.toLowerCase());
                    const jobTitleMatch = job.jobTitle
                      .toLowerCase()
                      .startsWith(search.toLowerCase());

                    return cityMatch && jobTitleMatch;
                  }
                })

                .map((job, index) => (
                  //change key index, bad practice.
                  <JobCard key={index} job={job} saveJob={saveJob} />
                ))}
          </div>
        </div>
        <div className=" relative mt-20  left-1/2   translate-x-[-50%] flex justify-center items-end  ">
          <button
            className="bg-gray-300  hover:bg-gray-400 border border-blue-200 flex  relative    "
            onClick={() => setVisible((visible) => visible + 6)}
          >
            Show more...
          </button>
        </div>
      </div>
    </>
  );
}

export default Jobs;
