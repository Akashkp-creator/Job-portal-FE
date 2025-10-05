import axios from "axios";
import { useState } from "react";
import {
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaUserTie,
  FaPlus,
  FaTimes,
  FaPaperPlane,
} from "react-icons/fa";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
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
  return null;
};

const PostJobs = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "",
    experienceLevel: "",
  });

  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills((prev) => [...prev, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // setMessage("");

    // Simulate API call
    try {
      const jobData = {
        ...formData,
        requiredSkills: skills,
      };

      console.log("Job Data to be submitted:", jobData);

      // Simulate API delay
      // await new Promise((resolve) => setTimeout(resolve, 1500));
      const response = await axios.post(
        "http://localhost:3000/api/jobs",
        jobData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // setMessage({
      //   type: "success",
      //   text: "Job posted successfully! Redirecting...",
      // });
      toast.success(`${response.data.message}`);

      // Reset form
      setFormData({
        title: "",
        description: "",
        location: "",
        jobType: "",
        experienceLevel: "",
      });
      setSkills([]);
    } catch (error) {
      // setMessage({
      //   type: "error",
      //   text: "Failed to post job. Please try again.",
      // });
      toast.error(`${error?.response?.data?.message}`);
      console.log("Failed to post job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.title &&
    formData.description &&
    formData.location &&
    formData.jobType &&
    formData.experienceLevel &&
    skills.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FaBriefcase className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-700 bg-clip-text text-transparent mb-2">
            Post a New Job
          </h1>
          <p className="text-gray-600 text-lg">
            Fill in the details to find the perfect candidate for your team
          </p>
        </div>

        {/* Success/Error Message */}
        {/* {message && (
          <div
            className={`p-4 rounded-lg mb-6 ${
              message.type === "success"
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )} */}

        {/* Job Posting Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Job Title */}
          <div className="mb-6">
            <label
              htmlFor="title"
              className="flex items-center text-lg font-semibold text-gray-800 mb-3"
            >
              <FaBriefcase className="w-5 h-5 text-cyan-600 mr-2" />
              Job Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Senior Frontend Developer"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          {/* Job Description */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-lg font-semibold text-gray-800 mb-3"
            >
              Job Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the role, responsibilities, and what you're looking for in a candidate..."
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 resize-vertical"
              required
            />
          </div>

          {/* Required Skills */}
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              Required Skills *
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                placeholder="Add a skill"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button
                onClick={addSkill}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center gap-2"
              >
                <FaPlus className="w-4 h-4" />
                Add
              </button>
            </div>

            {/* Skills List */}
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800 px-3 py-2 rounded-full text-sm font-medium"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-cyan-600 hover:text-cyan-800"
                  >
                    <FaTimes className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            {skills.length === 0 && (
              <p className="text-gray-500 text-sm mt-2">No skills added yet</p>
            )}
          </div>

          {/* Location and Job Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="flex items-center text-lg font-semibold text-gray-800 mb-3"
              >
                <FaMapMarkerAlt className="w-5 h-5 text-cyan-600 mr-2" />
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Remote, New York, NY"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                required
              />
            </div>

            {/* Job Type */}
            <div>
              <label
                htmlFor="jobType"
                className="flex items-center text-lg font-semibold text-gray-800 mb-3"
              >
                <FaBriefcase className="w-5 h-5 text-cyan-600 mr-2" />
                Job Type *
              </label>
              <select
                id="jobType"
                name="jobType"
                value={formData.jobType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                required
              >
                <option value="">Select job type</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>

          {/* Experience Level */}
          <div className="mb-8">
            <label
              htmlFor="experienceLevel"
              className="flex items-center text-lg font-semibold text-gray-800 mb-3"
            >
              <FaUserTie className="w-5 h-5 text-cyan-600 mr-2" />
              Experience Level *
            </label>
            <select
              id="experienceLevel"
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              required
            >
              <option value="">Select experience level</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
              <option value="lead">Lead/Manager</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
              isFormValid && !isSubmitting
                ? "bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                Posting Job...
              </>
            ) : (
              <>
                <FaPaperPlane className="w-5 h-5" />
                Post Job Opportunity
              </>
            )}
          </button>
        </form>

        {/* Form Info */}
        <div className="mt-6 text-center text-gray-600">
          <p>All fields marked with * are required</p>
        </div>
      </div>
    </div>
  );
};

export default PostJobs;
