import { createBrowserRouter, RouterProvider } from "react-router-dom";
// loader
import { loader as jobFeedLoader } from "./pages/JobFeed";
import { loader as postLoader } from "./pages/PostJobs";
import { loader as myCandidatesLoader } from "./pages/MyCandidates";
import { loader as notificationLoader } from "./pages/NotificationList";
// import { notificationLoader } from "./features/notifications/notificationLoader";
// actions
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
// import { action as jobFeedaction } from "./components/Job";

import {
  About,
  JobFeed,
  Landing,
  Login,
  MyCandidates,
  PostJobs,
  Register,
  HomeLayout,
  Error,
  Services,
  NotificationList,
} from "./pages";
import { store } from "./store";
import { ErrorElement } from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true, // default route → /
        element: <Landing />,
        errorElement: <ErrorElement />,
      },
      {
        path: "about",
        element: <About />,
        errorElement: <ErrorElement />,
      },
      // {
      //   path: "/jobs/:jobId",
      //   element: <JobDetail />,
      //   loader: jobDetailLoader,
      // },
      {
        path: "job-feed",
        element: <JobFeed />,
        errorElement: <ErrorElement />,
        loader: jobFeedLoader(store),
        // action: jobFeedaction,
      },
      {
        path: "my-candidates",
        element: <MyCandidates />,
        errorElement: <ErrorElement />,
        loader: myCandidatesLoader(store),
      },
      {
        path: "post-jobs",
        element: <PostJobs />,
        errorElement: <ErrorElement />,
        loader: postLoader(store),
      },
      {
        path: "features",
        element: <Services />,
        errorElement: <ErrorElement />,
      },
      {
        path: "notification",
        element: <NotificationList />,
        errorElement: <ErrorElement />,
        loader: notificationLoader(store),
        // loader: notificationLoader, // 👈 attach loader here
        // loader: () => notificationLoader(store), // pass the store
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store),
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
    action: registerAction,
  },
]);

// function App() {
//   return <RouterProvider router={router} />;
// }
function App() {
  return (
    <RouterProvider router={router}>
      <>
        <h1>Hello!!!</h1>
      </>
    </RouterProvider>
  );
}
export default App;
