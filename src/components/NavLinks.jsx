import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

// Define links for different user types
const guestLinks = [
  { id: 1, url: "/", text: "home" },
  { id: 2, url: "about", text: "about" },
  { id: 3, url: "features", text: "features" },
];

const studentLinks = [
  { id: 1, url: "/", text: "home" },
  { id: 2, url: "about", text: "about" },
  { id: 3, url: "job-feed", text: "jobs" },
  // { id: 4, url: "features", text: "features" },
];

const companyLinks = [
  { id: 1, url: "/", text: "home" },
  { id: 2, url: "about", text: "about" },
  { id: 4, url: "my-candidates", text: "My Candidates" },
  { id: 5, url: "post-jobs", text: "Post Job" },
  // { id: 6, url: "features", text: "features" },
];

const NavLinks = () => {
  const user = useSelector((state) => state.userState.user);

  // Determine which links to show based on user role
  let linksToShow = guestLinks; // Default for non-logged in users

  if (user) {
    if (user.role === "student") {
      linksToShow = studentLinks;
    } else if (user.role === "company") {
      linksToShow = companyLinks;
    }
  }

  return (
    <>
      {linksToShow.map((link) => {
        const { id, url, text } = link;
        return (
          <li key={id}>
            <NavLink
              to={url}
              className={({ isActive }) =>
                isActive
                  ? "capitalize text-neutral-content bg-neutral"
                  : "capitalize"
              }
            >
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};

export default NavLinks;
