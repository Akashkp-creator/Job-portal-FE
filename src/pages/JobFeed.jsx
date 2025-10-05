import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { setJobs } from "../features/jobs/jobSlice";
// import { useSelector } from "react-redux";
import Job from "../components/Job";
import { SectionTitle } from "../components";

export const loader = (store) => async () => {
  const user = store.getState().userState.user;
  // console.log(user);

  if (!user) {
    toast.warn("You must be logged in to view jobs");
    return redirect("/login");
  }

  if (user.role !== "student") {
    toast.warn("Unauthorized access");
    return redirect("/");
  }

  // ✅ Fetch jobs from backend
  try {
    const { data } = await axios.get("http://localhost:3000/api/jobs/feed", {
      withCredentials: true,
      // headers: {
      //   "Content-Type": "application/json",
      // },
    }); // adjust endpoint as needed
    // console.log(data);
    if (data?.jobs.length === 0) {
      return toast.info(
        "Currently, there are no job postings available. Please check back later."
      );
    }
    store.dispatch(setJobs({ jobs: data?.jobs, totalJobs: data?.totalJobs }));
    return data; // this will be available in useLoaderData()
    // return null;
  } catch (error) {
    toast.error("Failed to load jobs");
    console.log(error?.message);
    return null;
  }
};

const JobFeed = () => {
  // const jobs = useSelector((state) => state.jobState.jobs);

  return (
    <div>
      {/* <SectionTitle text="Available Jobs" /> */}
      <div>
        <Job />
      </div>
    </div>
  );
};
//   return <h1>HI</h1>;
// };
export default JobFeed;
