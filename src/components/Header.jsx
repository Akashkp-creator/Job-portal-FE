import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../features/user/userSlice";
import { clearJobs } from "../features/jobs/jobSlice";
import { clearNotifications } from "../features/notifications/notificationSlice";
// import { clearCart } from "../features/cart/cartSlice";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);
  // console.log(user);

  const handleLogout = () => {
    navigate("/");
    //   dispatch(clearCart());
    dispatch(clearJobs());
    dispatch(clearUser());
    dispatch(clearNotifications());
  };
  return (
    <header className=" bg-neutral py-2 text-neutral-content ">
      <div className="align-element flex justify-center sm:justify-end ">
        {user ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <p className="text-xs sm:text-sm font-bold">
              Hello,{user.firstName}
            </p>
            <button className="btn btn-xs" onClick={handleLogout}>
              logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            <Link to="/login" className="link link-hover text-xs sm:text-sm">
              Sign in
            </Link>
            <Link to="/register" className="link link-hover text-xs sm:text-sm">
              Create an Account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
