// pages/Register.jsx
import axios from "axios";
import { useState } from "react";
import { Link, Form, redirect, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
// import customFetch from "../utils/customFetch";

// export const action = async ({ request }) => {
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData);
//   if (data.skills) {
//     data.skills = data.skills.split(",").map((skill) => skill.trim());
//   }

//   try {
//     const response = await axios.post(
//       "http://localhost:3000/api/auth/signup",
//       data, // Remove the extra { data } wrapper
//       {
//         withCredentials: true,
//         // headers: {
//         //   "Content-Type": "application/json",
//         // },
//       }
//     );
//     console.log("Registration successful:", response);

//     toast.success("Account created successfully! Welcome to CareerConnect.");
//     return redirect("/login");
//   } catch (error) {
//     const errorMessage =
//       error?.response?.data?.error?.message ||
//       "Please double check your credentials and try again.";

//     toast.error(errorMessage);
//     return null;
//   }
// };
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // Convert skills to array if it exists
  if (data.skills) {
    data.skills = data.skills.split(",").map((skill) => skill.trim());
  }

  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/signup",
      data, // Send data directly, not wrapped in {data}
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Registration successful:", response);

    toast.success(" Registration successful! Please login.");
    // toast.success("Account created successfully! Welcome to CareerConnect.");
    return redirect("/login");
  } catch (error) {
    console.error("Registration error:", error);

    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error?.message ||
      "Please double check your credentials and try again.";

    toast.error(errorMessage);
    return null;
  }
};
const Register = () => {
  const [role, setRole] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100 py-8 px-4">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Welcome Text */}
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-center">
          <div className="pb-8 flex justify-center">
            <NavLink
              to="/"
              className="text-[#006080] text-3xl lg:text-4xl font-bold items-center px-4 py-2 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white/50 backdrop-blur-sm"
            >
              CareerConnect
            </NavLink>
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-2xl font-bold text-[#006080] mb-4">
              Welcome to CareerConnect
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Your gateway to amazing career opportunities. Join thousands of
              professionals and companies who are already building their futures
              with us.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-[#006080] rounded-full p-2 mr-3">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-gray-700">
                  Connect with top companies and talented professionals
                </p>
              </div>
              <div className="flex items-start">
                <div className="bg-[#006080] rounded-full p-2 mr-3">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-gray-700">
                  Personalized job matches and candidate recommendations
                </p>
              </div>
              <div className="flex items-start">
                <div className="bg-[#006080] rounded-full p-2 mr-3">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-gray-700">
                  Build your professional network and grow your career
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Create Your Account
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Join our community and unlock new opportunities
          </p>

          <Form method="post" className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006080] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006080] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            {/* Email and Password */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006080] focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006080] focus:border-transparent transition-all duration-200"
                placeholder="Create a strong password"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                I am a *
              </label>
              <select
                id="role"
                name="role"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006080] focus:border-transparent transition-all duration-200"
              >
                <option value="">Select your role</option>
                <option value="student">Student/Job Seeker</option>
                <option value="company">Industry Professional/Employer</option>
              </select>
            </div>

            {/* Student Specific Fields */}
            {role === "student" && (
              <>
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Gender *
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006080] focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    {/* <option value="Prefer not to say">Prefer not to say</option> */}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="skills"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Skills *
                  </label>
                  <input
                    type="text"
                    id="skills"
                    name="skills"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006080] focus:border-transparent transition-all duration-200"
                    placeholder="e.g., JavaScript, React, Node.js"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Separate skills with commas
                  </p>
                </div>
              </>
            )}

            {/* Industry Specific Fields */}
            {role === "company" && (
              <>
                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006080] focus:border-transparent transition-all duration-200"
                    placeholder="Enter your company name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="industry"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Industry *
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006080] focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Retail">Retail</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#006080] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#66ccff] transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-[#006080] focus:ring-offset-2 cursor-pointer"
            >
              Create Account
            </button>

            {/* Login Link */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600">
                Already a member?
                <Link
                  to="/login"
                  className="ml-2 link link-hover font-semibold text-[#006080] hover:text-[#66ccff] transition-colors duration-200"
                >
                  Login here
                </Link>
              </p>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-gray-600">Return to</span>
              <Link
                to="/"
                className="font-semibold text-gray-700 hover:text-gray-900 transition-colors duration-300 flex items-center"
              >
                Home Page
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
