import { NavLink } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import NavLinks from "./NavLinks";
// import { BsCart3 } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  clearNotifications,
  fetchNotifications,
} from "../features/notifications/notificationSlice";
import Loading from "./Loading";

const Navbar = () => {
  // const user = useSelector((state) => state?.userState?.user);
  // const notificationCount = useSelector(
  //   (state) => state?.notificationState?.count
  // );
  // console.log(user);
  //  const dispatch = useDispatch();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);
  const notificationCount = useSelector(
    (state) => state.notificationState?.count || 0
  );
  const { loading, error } = useSelector((state) => state.notificationState);

  useEffect(() => {
    if (user?.role === "student") {
      dispatch(fetchNotifications());
    }
    //  else {
    //   dispatch(clearNotifications());
    // }
  }, [user, dispatch]);
  if (loading) return <Loading />;
  // if (loading) return <p>Loading notifications...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <nav className="bg-base-200 sticky top-0 z-50">
      <div className="navbar align-element ">
        <div className="navbar-start">
          {/* Title */}
          <NavLink to="/" className="hidden lg:flex  text-3xl items-center ">
            CareerConnect
          </NavLink>
          {/* DROPDOWN */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal ">
            <NavLinks />
          </ul>
        </div>
        <div className="navbar-end">
          {/* add any thing u want can add */}
          {user?.role === "student" && (
            <NavLink
              to="notification"
              className="btn btn-ghost btn-circle btn-md ml-4"
            >
              <div className="indicator">
                <FaRegBell className="h-6 w-6" />
                <span className="badge badge-sm badge-primary indicator-item">
                  {/* {numItemsInCart} */}
                  {notificationCount}
                </span>
              </div>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
