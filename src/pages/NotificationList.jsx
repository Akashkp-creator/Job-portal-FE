// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { markNotificationAsRead } from "../features/notifications/notificationSlice";
// import { setNotifications } from "../features/notifications/notificationSlice";
import {
  FaCheck,
  FaBriefcase,
  FaBuilding,
  FaRegClock,
  FaTimesCircle,
  FaCheckCircle,
} from "react-icons/fa";

export const loader = (store) => async () => {
  const user = store.getState().userState.user;
  // console.log(user);

  if (!user) {
    toast.warn("You must be logged in to view jobs");
    return redirect("/login");
  }

  if (user.role !== "student") {
    toast.warn("Unauthorized access");
    return redirect("/");
  }

  return null;
};
const NotificationList = () => {
  //   const data = useLoaderData(); // pre-fetched before render
  //   console.log(data);

  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector(
    (state) => state.notificationState
  );

  const handleMarkAsRead = (applicationId) => {
    dispatch(markNotificationAsRead(applicationId));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (notifications.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaCheck className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          All Caught Up!
        </h3>
        <p className="text-gray-500">You don't have any new notifications.</p>
      </div>
    );
  }

  //   return (
  //     <div>
  //       <h2>Notifications</h2>
  //       {notifications.map((n) => (
  //         <div
  //           key={n._id}
  //           className="p-3 border-b flex items-center justify-between"
  //         >
  //           <p>{n.message.replace(/\"/g, "")}</p>
  //           <button
  //             onClick={() => handleMarkAsRead(n._id)}
  //             className="badge badge-sm bg-blue-500 text-white"
  //           >
  //             Mark as Read
  //           </button>
  //         </div>
  //       ))}
  //     </div>
  //   );

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div
          key={notification._id}
          className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="flex items-start justify-between">
            {/* Notification Content */}
            <div className="flex items-start space-x-4 flex-1">
              {/* Status Icon */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  notification.status === "accepted"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {notification.status === "accepted" ? (
                  <FaCheckCircle className="w-6 h-6" />
                ) : (
                  <FaTimesCircle className="w-6 h-6" />
                )}
              </div>

              {/* Message and Details */}
              <div className="flex-1 min-w-0">
                <p className="text-gray-800 text-lg font-medium mb-2 leading-relaxed">
                  {notification.message.replace(/\"/g, "")}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <FaBriefcase className="w-4 h-4" />
                    <span>{notification.jobTitle}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaBuilding className="w-4 h-4" />
                    <span>{notification.companyName}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaRegClock className="w-4 h-4" />
                    <span>
                      {new Date(notification.reviewedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => handleMarkAsRead(notification._id)}
              className="ml-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 text-sm font-medium shadow-sm"
            >
              <FaCheck className="w-4 h-4" />
              <span>Mark Read</span>
            </button>
          </div>

          {/* New Badge */}
          {notification.isNew && (
            <div className="mt-3 flex justify-end">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                New
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default NotificationList;
