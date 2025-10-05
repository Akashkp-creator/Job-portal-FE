import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { SectionTitle } from "../components"; // ✅ added
import { removeJob } from "../features/jobs/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
import { FaBuilding, FaIndustry, FaFileAlt } from "react-icons/fa";

// import { useDispatch, useSelector } from "react-redux";
// import { removeJob } from "../features/job/jobSlice";

const Jobs = () => {
  const dispatch = useDispatch();
  // const { jobs, totalJobs } = useSelector((store) => store.jobState);
  const { companyName, industry, profilePicture } = useSelector(
    (state) => state.jobState?.companyInfo
  );

  const data = useLoaderData();
  // console.log(companyName, industry, profilePicture);
  //   const jobs = data?.jobs || [];
  //   console.log("Jobs from loader:", jobs);
  const [jobs, setJobs] = useState(data?.jobs || []);

  if (!jobs || jobs.length === 0) {
    return (
      <div className="text-center mt-12">
        <SectionTitle text="No jobs found" />
        <p className="text-gray-500 mt-2">
          Currently, there are no job postings available. Please check back
          later.
        </p>
      </div>
    );
  }

  // Handle interested/ignored actions
  const handleJobAction = async (status, jobId) => {
    try {
      console.log(status, jobId);
      const res = await axios.post(
        `http://localhost:3000/api/request/${status}/${jobId}`,
        {},
        { withCredentials: true }
      );
      console.log(res);
      dispatch(removeJob(jobId));
      toast.success("Request Sent");
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("⚠️ Job action error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      alert(error.response?.data || "Failed to update job status");
    }
  };

  const totalJobs = jobs.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-medium tracking-wider capitalize">
            {/* <h1 className="text-3xl font-bold text-indigo-800 mb-2"> */}
            Job Listings
          </h1>
          <p className="text-2xl text-gray-500 mt-2">
            You have {totalJobs} job{totalJobs !== 1 && "s"} available
          </p>
        </div>

        <div className="grid gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="">
              <div className="p-6">
                <div className="flex flex-col space-y-4">
                  {/* Job Title and Basic Info */}
                  {/* <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                      {job.title}
                    </h2>
                    Company Name:
                    <p className="text-gray-600 line-clamp-2">{companyName}</p>
                    Industry:
                    <p className="text-gray-600 line-clamp-2">{industry}</p>
                    Job Description :
                    <p className="text-gray-600 line-clamp-2">
                      {job.description}
                    </p>
                  </div> */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      {/* Company Logo */}
                      {/* <div className="flex-shrink-0">
                        <img
                          src={
                            profilePicture || "https://via.placeholder.com/80"
                          }
                          alt={companyName}
                          className="w-16 h-16 rounded-xl object-cover border-2 border-gray-100 shadow-md"
                        />
                      </div> */}

                      {/* Job Content */}
                      <div className="flex-1 min-w-0">
                        {/* Title */}
                        <h2 className="text-xl font-bold text-gray-800 mb-3">
                          {job.title}
                        </h2>

                        {/* Company and Industry */}
                        <div className="flex flex-wrap gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <FaBuilding className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-500">
                                Company
                              </p>
                              <p className="text-sm font-bold text-gray-800">
                                {companyName}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                              <FaIndustry className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-500">
                                Industry
                              </p>
                              <p className="text-sm font-bold text-gray-800">
                                {industry}
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* Skills Section */}

                        <div>
                          <div className="flex flex-wrap gap-2 bg-gray-50 rounded-lg p-3">
                            <p className="text-sm font-semibold text-gray-700 leading-relaxed line-clamp-3">
                              Required Skills
                            </p>
                            {job.requiredSkills.map((skill, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Job Description */}
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                              <FaFileAlt className="w-3 h-3 text-purple-600" />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-700">
                              Job Description
                            </h3>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                            {job.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4 pt-2">
                      {/* <button
                      onClick={() => handleJobAction("interested", job._id)}
                      className="flex-1 flex items-center justify-center px-4 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                    >
                      👍 Interested
                    </button>
                    <button
                      onClick={() => handleJobAction("ignored", job._id)}
                      className="flex-1 flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                    >
                      👎 Ignore
                    </button> */}
                      {/* <button
                      onClick={() => handleJobAction("interested", job._id)}
                      className="flex-1 flex items-center justify-center px-4 py-3 rounded-xl shadow-lg text-base font-medium text-white bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
                    >
                      <span className="mr-2">⭐</span>
                      I'm Interested
                    </button>
                    <button
                      onClick={() => handleJobAction("ignored", job._id)}
                      className="flex-1 flex items-center justify-center px-4 py-3 rounded-xl shadow-lg text-base font-medium text-slate-700 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
                    >
                      <span className="mr-2">💔</span>
                      Skip
                    </button> */}
                      {/* <button
                      onClick={() => handleJobAction("interested", job._id)}
                      className="flex-1 flex items-center justify-center px-4 py-3 rounded-xl border-2 border-green-500 text-base font-medium text-green-600 hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <span className="mr-2">✅</span>
                      Interested
                    </button>
                    <button
                      onClick={() => handleJobAction("ignored", job._id)}
                      className="flex-1 flex items-center justify-center px-4 py-3 rounded-xl border-2 border-red-300 text-base font-medium text-red-500 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <span className="mr-2">❌</span>
                      Ignore
                    </button> */}
                      <button
                        onClick={() => handleJobAction("interested", job._id)}
                        className="flex-1 flex items-center justify-center px-4 py-3 rounded-xl text-base font-medium text-white relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 group-hover:from-green-600 group-hover:to-emerald-700 transition-all duration-200"></div>
                        <div className="absolute inset-[2px] bg-white rounded-xl group-hover:bg-transparent transition-all duration-200"></div>
                        <span className="relative z-10 text-transparent bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text group-hover:text-white transition-all duration-200 mr-2">
                          👍
                        </span>
                        <span className="relative z-10 text-transparent bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text group-hover:text-white transition-all duration-200">
                          Interested
                        </span>
                      </button>
                      <button
                        onClick={() => handleJobAction("ignored", job._id)}
                        className="flex-1 flex items-center justify-center px-4 py-3 rounded-xl text-base font-medium text-gray-700 relative overflow-hidden group border border-gray-300"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-200"></div>
                        <span className="relative z-10 mr-2">👎</span>
                        <span className="relative z-10">Ignore</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
