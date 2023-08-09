import { useRef, useState, useEffect } from "react";
import nike from "../assets/nike.png";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { BsBookmarkHeart } from "react-icons/bs";
import { jobSchema } from "../Redux/jobReducer";
interface JobSchema {
  jobTitle: String;
  type: String;
  company: String;
  location: String;
  remote: Boolean;
  salaryA: Number;
  salaryB: Number;
}

function Jobs() {
  const [jobsList, setJobsList] = useState<JobSchema[]>();
  const [search, setSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");

  // show more item state

  const [items, setItems] = useState<jobSchema[]>();
  const [visible, setVisible] = useState<number>(4);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    console.log("Inside Job UseEffect");
    fetch("http://localhost:3001/jobs")
      .then((res) => res.json())
      .then((data) => setItems(data));

    console.log(items);
  }, []);

  // async function bringJobsList() {
  //   try {
  //     const response = await axios.get("http://localhost:3001/jobs", {
  //       params: {},
  //     });

  //     console.log("response: ", response.data);
  //     console.log("items: ", items);

  //     setJobsList(response.data);
  //     // console.log("JobList: ", jobsList!.data)
  //     console.log("JobListz: ", jobsList);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  function focusInput() {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }

  function saveJob(job: any) {
    try {
      axios.post("http://localhost:3001/save", {
        job: job,
        user: loggedUser(),
      });
    } catch (err: any) {
      console.log("err: ", err.message);
    }
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
      <div className="flex flex-col  pb-5 ">
        <div className="bg-purple-300 relative h-[12rem] w-full border md:rounded-bl-[20%] md:rounded-br-[20%] ">
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
              className="p-5 sm:w-[100%] w-[80%] outline-none "
            />
            <input
              onChange={(e) => setCitySearch(e.target.value)}
              placeholder="filter by location"
              className="p-5 rounded-r-sm sm:w-[100%] w-[80%] outline-none border-l border-black md:block hidden"
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
              items
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
                  <div
                    key={index}
                    className="bg-white m-2 mt-14 h-[15rem] rounded-sm  relative "
                  >
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
                        onClick={() => saveJob(job)}
                        className="absolute right-5 bottom-0 cursor-pointer text-red-600 hover:text-red-700"
                      >
                        <BsBookmarkHeart size={30} />
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
        <div className=" relative mt-20  left-1/2   translate-x-[-50%] flex justify-center items-end  ">
          <button
            className="bg-gray-300  hover:bg-gray-400 border border-blue-200 flex  relative    "
            onClick={(e) => setVisible((visible) => visible + 4)}
          >
            Show more...
          </button>
        </div>
      </div>
    </>
  );
}

export default Jobs;
