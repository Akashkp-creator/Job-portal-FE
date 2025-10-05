import { Link } from "react-router-dom";
import {
  FaBuilding,
  FaStar,
  FaRocket,
  FaUsers,
  FaChartLine,
  FaAward,
  FaRegClock,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Services = () => {
  // Top Companies Data
  const topCompanies = [
    {
      id: 1,
      name: "Google",
      logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=80&h=80&fit=crop&crop=center",
      jobs: 124,
      category: "Technology",
      rating: 4.8,
      featured: true,
    },
    {
      id: 2,
      name: "Microsoft",
      logo: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=80&h=80&fit=crop&crop=center",
      jobs: 89,
      category: "Software",
      rating: 4.7,
      featured: true,
    },
    {
      id: 3,
      name: "Amazon",
      logo: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=80&h=80&fit=crop&crop=center",
      jobs: 156,
      category: "E-commerce",
      rating: 4.6,
      featured: true,
    },
    {
      id: 4,
      name: "Netflix",
      logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=80&h=80&fit=crop&crop=center",
      jobs: 67,
      category: "Entertainment",
      rating: 4.9,
      featured: true,
    },
    {
      id: 5,
      name: "Spotify",
      logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=80&h=80&fit=crop&crop=center",
      jobs: 45,
      category: "Music",
      rating: 4.5,
      featured: false,
    },
    {
      id: 6,
      name: "Airbnb",
      logo: "https://images.unsplash.com/photo-1519558260268-cde7e03a0152?w=80&h=80&fit=crop&crop=center",
      jobs: 78,
      category: "Travel",
      rating: 4.4,
      featured: true,
    },
  ];

  // Featured Jobs Data
  const featuredJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Google",
      type: "Full-time",
      location: "Remote",
      salary: "$120k - $150k",
      posted: "2 days ago",
      urgent: true,
      skills: ["React", "TypeScript", "Node.js"],
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Microsoft",
      type: "Full-time",
      location: "Seattle, WA",
      salary: "$130k - $160k",
      posted: "1 week ago",
      urgent: false,
      skills: ["Product Strategy", "Agile", "UX"],
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "Amazon",
      type: "Remote",
      location: "Remote",
      salary: "$110k - $140k",
      posted: "3 days ago",
      urgent: true,
      skills: ["Python", "Machine Learning", "SQL"],
    },
    {
      id: 4,
      title: "UX Designer",
      company: "Netflix",
      type: "Full-time",
      location: "Los Angeles, CA",
      salary: "$100k - $130k",
      posted: "5 days ago",
      urgent: false,
      skills: ["Figma", "UI/UX", "Prototyping"],
    },
  ];

  // Stats Data
  const stats = [
    { icon: FaBuilding, number: "10K+", label: "Companies Hiring" },
    { icon: FaUsers, number: "50K+", label: "Active Jobs" },
    { icon: FaRocket, number: "95%", label: "Success Rate" },
    { icon: FaChartLine, number: "30 Days", label: "Average Hiring" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      {/* Stats Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow"
            >
              <stat.icon className="text-3xl text-cyan-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-800">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Companies Hiring Now */}
      <section className="container mx-auto px-4 mb-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Top Companies Hiring Now
            </h2>
            <p className="text-gray-600 text-lg">
              Discover opportunities with leading companies worldwide
            </p>
          </div>
          <Link
            to="/login"
            className="hidden md:block text-cyan-600 hover:text-cyan-700 font-semibold transition-colors"
          >
            View All Companies →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topCompanies
            .filter((company) => company.featured)
            .map((company) => (
              <div
                key={company.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">
                        {company.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {company.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaStar className="text-yellow-400" />
                    <span className="font-semibold">{company.rating}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-cyan-600 font-semibold">
                    {company.jobs} jobs
                  </span>
                  <Link
                    to={`/login`}
                    className="btn btn-sm btn-outline border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white"
                  >
                    View Jobs
                  </Link>
                </div>
              </div>
            ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link
            to="/login"
            className="btn btn-outline border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white"
          >
            View All Companies
          </Link>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="container mx-auto px-4 mb-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Featured Jobs
            </h2>
            <p className="text-gray-600 text-lg">
              Hand-picked opportunities from top employers
            </p>
          </div>
          <Link
            to="/login"
            className="hidden md:block text-cyan-600 hover:text-cyan-700 font-semibold transition-colors"
          >
            Browse All Jobs →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {featuredJobs.map((job) => (
            <div
              key={job.id}
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${
                job.urgent ? "border-red-500" : "border-cyan-500"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-gray-800 text-xl mb-2">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 font-semibold">{job.company}</p>
                </div>
                {job.urgent && (
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                    Urgent
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <FaRegClock />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaMapMarkerAlt />
                  <span>{job.location}</span>
                </div>
                <div className="font-semibold text-cyan-600">{job.salary}</div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">
                  Posted {job.posted}
                </span>
                <Link
                  to={`/login`}
                  className="btn btn-sm bg-cyan-600 text-white border-cyan-600 hover:bg-cyan-700"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link
            to="/login"
            className="btn btn-outline border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white"
          >
            Browse All Jobs
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-cyan-600 to-teal-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <FaAward className="text-5xl mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Dream Job?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of professionals who have accelerated their careers
            with CareerConnect
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="btn btn-lg bg-white text-cyan-700 border-white hover:bg-gray-100 font-semibold"
            >
              Create Free Account
            </Link>
            <Link
              to="/login"
              className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-cyan-700 font-semibold"
            >
              Explore Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
