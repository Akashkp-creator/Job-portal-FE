import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { redirect, useLoaderData } from "react-router-dom";
import {
  FaChartBar,
  FaClock,
  FaEye,
  FaCheck,
  FaTimes,
  FaUserTie,
  FaAward,
} from "react-icons/fa";

const BASE_URL = "http://localhost:3000/api";

export const loader = (store) => async () => {
  const user = store.getState().userState.user;
  // console.log(user);

  if (!user) {
    toast.warn("You must be logged in to view jobs");
    return redirect("/login");
  }

  if (user.role !== "company") {
    toast.warn("Unauthorized access");
    return redirect("/");
  }

  try {
    const response = await axios.get(`${BASE_URL}/applications/my-jobs`, {
      withCredentials: true,
    });

    // console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const MyCandidates = () => {
  const fromLoaderData = useLoaderData();

  // console.log(fromLoaderData);
  const [data, setData] = useState(fromLoaderData.data);
  console.log(data);
  // const [loading, setLoading] = useState(true);

  // Fetch candidates on mount
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //
  //       setData(res.data);
  //     } catch (error) {
  //       console.error("⚠️ Error fetching candidates:", error);
  //       toast.error("Failed to load candidates");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // Handle Accept / Reject
  const handleStatusUpdate = async (applicationId, status) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/request/review/${status}/${applicationId}`,
        {},
        { withCredentials: true }
      );

      // Update UI locally after status change
      console.log(applicationId, status);
      console.log(res);
      setData((prev) => {
        return {
          ...prev,
          applications: prev.applications.map((app) =>
            app._id === applicationId ? { ...app, status } : app
          ),
          statusCounts: {
            ...prev.statusCounts,
            [status]: prev.statusCounts[status] + 1,
            [prev.applications.find((app) => app._id === applicationId).status]:
              prev.statusCounts[
                prev.applications.find((app) => app._id === applicationId)
                  .status
              ] - 1,
          },
        };
      });

      toast.success(`Candidate ${status}`);
    } catch (error) {
      // console.error("⚠️ Status update error:", error);
      toast.error(error?.response?.data?.message);
    }
  };

  // if (loading) return <p className="text-center mt-8">Loading candidates...</p>;
  if (!data) return <p className="text-center mt-8">No applications found.</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Summary Section */}
      {/* <div className="bg-white shadow-md rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">
          Applications Overview
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
          <div className="p-4 bg-indigo-50 rounded-lg">
            <p className="text-lg font-semibold">{data.totalApplications}</p>
            <p className="text-gray-600">Total</p>
          </div>
          {Object.entries(data.statusCounts).map(([key, value]) => (
            <div key={key} className="p-4 bg-indigo-50 rounded-lg">
              <p className="text-lg font-semibold">{value}</p>
              <p className="capitalize text-gray-600">{key}</p>
            </div>
          ))}
        </div>
      </div> */}

      {/* ***************** */}

      {/* +++++++++++++++++ */}

      {/* __________________ */}

      {/* +++++++++++++++++++++++ */}

      {/* ______________ */}
      <div className="bg-white shadow-xl rounded-2xl p-6 mb-8 border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Applications Overview
            </h2>
            <p className="text-gray-600 text-sm">
              Real-time application status tracking
            </p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <FaChartBar className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Status Counts Cards Only */}
          {Object.entries(data.statusCounts).map(([key, value]) => {
            const statusConfig = {
              ignored: {
                color: "from-amber-500 to-orange-500",
                icon: <FaClock className="w-5 h-5" />,
                border: "border-amber-400",
              },
              interested: {
                color: "from-blue-500 to-cyan-500",
                icon: <FaUserTie className="w-5 h-5" />,
                border: "border-blue-400",
              },
              // pending: {
              //   color: "from-amber-500 to-orange-500",
              //   icon: <FaClock className="w-5 h-5" />,
              //   border: "border-amber-400",
              // },
              // reviewed: {
              //   color: "from-blue-500 to-cyan-500",
              //   icon: <FaEye className="w-5 h-5" />,
              //   border: "border-blue-400",
              // },

              interviewing: {
                color: "from-purple-500 to-indigo-500",
                icon: <FaUserTie className="w-5 h-5" />,
                border: "border-purple-400",
              },
              offered: {
                color: "from-teal-500 to-green-500",
                icon: <FaAward className="w-5 h-5" />,
                border: "border-teal-400",
              },
              accepted: {
                color: "from-green-500 to-emerald-500",
                icon: <FaCheck className="w-5 h-5" />,
                border: "border-green-400",
              },
              rejected: {
                color: "from-red-500 to-pink-500",
                icon: <FaTimes className="w-5 h-5" />,
                border: "border-red-400",
              },
            };

            const config = statusConfig[key] || {
              color: "from-gray-500 to-gray-600",
              icon: <FaChartBar className="w-5 h-5" />,
              border: "border-gray-400",
            };

            return (
              <div
                key={key}
                className={`bg-gradient-to-br ${config.color} text-white p-5 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200 border ${config.border}`}
              >
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-10 h-10  bg-opacity-20 rounded-full flex items-center justify-center">
                      {config.icon}
                    </div>
                  </div>
                  <p className="text-3xl font-bold mb-1">{value}</p>
                  <p className="capitalize text-sm font-medium opacity-90">
                    {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Footer with Total Count */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="grid place-items-center sm:text-left mb-3 sm:mb-0">
              <p className="text-2xl font-bold text-gray-800 ">
                {data.totalApplications}
              </p>
              <p className="text-gray-600 text-sm">Total Applications</p>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                Accepted: {data.statusCounts.accepted || 0}
              </span>
              <span className="flex items-center">
                <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                Interested: {data.statusCounts.interested || 0}
              </span>
              <span className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                Rejected: {data.statusCounts.rejected || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Candidates List */}
      <h2 className="text-xl font-bold text-indigo-800 mb-4">
        Candidate Applications
      </h2>
      <div className="grid gap-6">
        {!data.applications || data.applications.length === 0 ? (
          <div className="text-center p-6">
            <h2 className="text-xl font-semibold">No applications yet 🚀</h2>
            <p className="text-gray-500">
              Candidates will appear here once they apply.
            </p>
          </div>
        ) : (
          data.applications.map((app) => (
            <div
              key={app._id}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-6 items-center justify-between"
            >
              {/* Candidate Info */}
              <div className="flex items-center gap-4">
                <img
                  src={app.candidateId.profilePicture}
                  alt="profile"
                  className="w-16 h-16 rounded-full border"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {app.candidateId.firstName} {app.candidateId.lastName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {app.candidateId.email}
                  </p>
                  <p className="text-sm text-gray-500 capitalize">
                    Current status: {app.status}
                  </p>
                </div>
              </div>

              {/* Skills Info */}
              <div className="flex flex-col gap-2 text-sm">
                <div>
                  <span className="font-medium text-gray-700">
                    Candidate Skills:
                  </span>{" "}
                  {app.candidateId.skills.join(", ")}
                </div>
                <div>
                  <span className="font-medium text-gray-700">
                    Required Skills:
                  </span>{" "}
                  {app.jobId.requiredSkills.join(", ")}
                </div>
              </div>

              {/* Job Info */}
              <div className="hidden md:block text-sm text-gray-600">
                <p className="font-medium">{app.jobId.title}</p>
                <p>{app.jobId.location}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleStatusUpdate(app._id, "accepted")}
                  className={`px-4 py-2 rounded-lg shadow transition ${
                    app.status !== "interested"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
                  disabled={app.status !== "interested"}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleStatusUpdate(app._id, "rejected")}
                  className={`px-4 py-2 rounded-lg shadow transition ${
                    app.status !== "interested"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                  disabled={app.status !== "interested"}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyCandidates;
