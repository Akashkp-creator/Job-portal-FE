// src/components/Hero.jsx
import { useSelector } from "react-redux";
import img from "../assets/generated-image.png";
import { Link } from "react-router-dom";

export default function Hero() {
  const user = useSelector((state) => state?.userState?.user);
  console.log(user);
  return (
    <section className="bg-gradient-to-r from-teal-600 to-cyan-700  text-white min-h-[70vh] flex items-center">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 px-6 w-full transform scale-90">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight bg-gradient-to-r text-white  bg-clip-text ">
            Find Your Dream Job Today
          </h1>
          <p className="mt-3 text-sm md:text-base text-white max-w-xl leading-relaxed">
            Connect with top employers and discover career opportunities that
            match your skills and aspirations.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-center md:justify-start">
            {user?.role === "student" && (
              <Link to="/job-feed">
                <button className="text-white border-2 border-white hover:bg-white hover:text-cyan-700 px-4 py-2 text-m font-semibold rounded-lg  transition-all duration-300 cursor-pointer">
                  Browse Jobs
                </button>
              </Link>
            )}
            {!user && (
              <Link to="/register">
                <button className="border-2  px-4 py-2 text-sm font-semibold rounded-lg text-white border-white hover:bg-white hover:text-cyan-700 transition-all duration-300 cursor-pointer">
                  Join Now
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center relative">
          <div className="relative transform scale-75">
            <img
              src={img}
              alt="Career Opportunities Illustration"
              className="w-full max-w-xs lg:max-w-lg rounded-xl shadow-xl"
            />
            <div className="absolute -inset-3 bg-blue-200 rounded-xl opacity-20 blur-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
