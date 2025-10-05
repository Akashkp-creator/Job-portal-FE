import { Link } from "react-router-dom";
import {
  FaUsers,
  FaBriefcase,
  FaRocket,
  FaHandshake,
  FaGraduationCap,
  FaChartLine,
} from "react-icons/fa";

const About = () => {
  const features = [
    {
      icon: <FaBriefcase className="text-3xl" />,
      title: "Job Opportunities",
      description:
        "Access thousands of verified job listings from top companies across various industries.",
    },
    {
      icon: <FaUsers className="text-3xl" />,
      title: "Talent Pool",
      description:
        "Connect with qualified candidates and find the perfect match for your organization.",
    },
    {
      icon: <FaRocket className="text-3xl" />,
      title: "Quick Hiring",
      description:
        "Streamlined application process that gets you hired faster with smart matching algorithms.",
    },
    {
      icon: <FaHandshake className="text-3xl" />,
      title: "Direct Connection",
      description:
        "Communicate directly with employers and candidates without unnecessary intermediaries.",
    },
  ];

  const stats = [
    { number: "50K+", label: "Active Jobs" },
    { number: "100K+", label: "Registered Users" },
    { number: "5K+", label: "Partner Companies" },
    { number: "95%", label: "Success Rate" },
  ];

  const team = [
    {
      name: "Elon Musk",
      role: "CEO & Founder",
      image:
        "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQHvmQTw2KvOBn_PhOjxFXNvd3mhIvkdXblMzv4stAbnAJe05Z4m2tpqdSaOsMF24l8wxLHmEKQdLCTc3monS9PHmR6_sNFtbISF51zmMQ",
    },
    {
      name: "Mike Chen",
      role: "CTO",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Emily Davis",
      role: "Head of HR",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Alex Rodriguez",
      role: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-cyan-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About CareerConnect
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Bridging the gap between talented professionals and innovative
            companies worldwide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="btn  btn-lg bg-white text-cyan-700 border-white hover:bg-gray-100  px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              Get Started
            </Link>
            <Link
              to="/job-feed"
              className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-cyan-700 px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                At CareerConnect, we believe that everyone deserves to find
                meaningful work that aligns with their passions and skills. Our
                platform is designed to create seamless connections between job
                seekers and employers, making the hiring process more efficient,
                transparent, and human-centered.
              </p>
              <p className="text-lg text-gray-600">
                We're committed to breaking down barriers in the job market and
                providing equal opportunities for all professionals, regardless
                of their background or experience level.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80"
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-lg">
                <FaGraduationCap className="text-4xl text-cyan-600 mb-2" />
                <h3 className="font-bold text-gray-800">Since 2024</h3>
                <p className="text-gray-600">Connecting Talent</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-cyan-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose CareerConnect?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide a comprehensive platform that benefits both job seekers
              and employers
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-cyan-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              The passionate people behind CareerConnect
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-cyan-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {member.name}
                </h3>
                <p className="text-cyan-600 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-cyan-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <FaChartLine className="text-5xl mx-auto mb-6 opacity-80" />
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of professionals who have found their dream jobs
            through CareerConnect
          </p>
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="btn btn-primary btn-lg bg-white text-cyan-700 border-white hover:bg-gray-100 px-8 py-3 rounded-full font-semibold"
            >
              Start Your Journey
            </Link>
            <Link
              to="/contact"
              className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-cyan-700 px-8 py-3 rounded-full font-semibold"
            >
              Contact Us
            </Link>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default About;
