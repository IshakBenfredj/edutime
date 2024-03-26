import { Navigate } from "react-router-dom";
import AddCourse from "./pages/AddCourse.jsx";
import { useSelector } from "react-redux";
import AddBlog from "./pages/AddBlog.jsx";
import EditCourse from "./pages/EditCourse.jsx";
import UserReservations from "./pages/UserReservations.jsx";
import ChangeRequests from "./pages/ChangeRequests.jsx";
import DocRequests from "./pages/DocRequests.jsx";
import ClientReservations from "./pages/ClientReservations.jsx";

const PrivateRoute = ({ Element }) => {
  const user = useSelector((state) => state.user);

  // no user , redirect to auth page
  if (!user) return <Navigate to="/auth" />;

  // user is center , redirect to home page
  if (user.isCenter && Element === ClientReservations)
    return <Navigate to="/" />;

  // user is student , redirect to home page
  if (
    !user.isCenter &&
    (Element === AddCourse ||
      Element === EditCourse ||
      Element === UserReservations)
  )
    return <Navigate to="/" />;

  // user is not admin , redirect to home page
  if (
    !user.isAdmin &&
    (Element === AddBlog ||
      Element === DocRequests ||
      Element === ChangeRequests)
  )
    return <Navigate to="/" />;

  // else
  return <Element />;
};

export default PrivateRoute;
