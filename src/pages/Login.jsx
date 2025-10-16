import { Form, Link } from "react-router-dom";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { setUser } from "../features/user/userSlice";
import axios from "axios";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      store.dispatch(setUser(response.data.user));
      toast.success("Logged in successfully");
      return redirect("/");
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "Please double check your credentials";

      toast.error(errorMessage);
      return null;
    }
  };

const Login = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 grid place-items-center p-4">
      <Form
        method="POST"
        className="card w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl border-0 transform hover:scale-[1.02] transition-transform duration-300"
      >
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h4 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-700 bg-clip-text text-transparent">
            Welcome Back
          </h4>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        {/* Email Input */}
        <div className="form-control mb-6">
          <label htmlFor="email" className="label">
            <span className="label-text font-semibold text-gray-700">
              Email Address
            </span>
          </label>
          <div className="relative">
            <input
              type="email"
              id="identifier"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 rounded-lg"
              required
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </div>
        </div>

        {/* Password Input */}
        <div className="form-control mb-6">
          <label htmlFor="password" className="label">
            <span className="label-text font-semibold text-gray-700">
              Password
            </span>
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              // value="StrongPass@123"
              placeholder="Enter your password"
              className="input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 rounded-lg"
              required
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 border-0"
        >
          Sign In
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>

        {/* Links Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col space-y-4 text-center">
            {/* Register Link */}
            <div className="flex items-center justify-center space-x-2">
              <span className="text-gray-600">Don't have an account?</span>
              <Link
                to="/register"
                className="font-semibold text-cyan-600 hover:text-cyan-700 transition-colors duration-300 flex items-center"
              >
                Create Account
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
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>

            {/* Home Link */}
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
          </div>
        </div>

        {/* Forgot Password Link */}
        {/* <div className="text-center mt-4">
          <Link
            to="/forgot-password"
            className="text-sm text-cyan-600 hover:text-cyan-700 transition-colors duration-300"
          >
            Forgot your password?
          </Link>
        </div> */}
      </Form>
    </section>
  );
};

export default Login;
