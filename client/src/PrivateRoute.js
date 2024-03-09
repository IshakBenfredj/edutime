import { Navigate } from "react-router-dom";
import AddCourse from "./pages/AddCourse.jsx";
import ReserveForm from "./pages/reserve/ReserveForm.jsx";
import AddPayment from "./pages/payments/AddPayment.jsx";
import Payments from "./pages/payments/Payments.jsx";
import { useSelector } from "react-redux";

const PrivateRoute = ({ Element }) => {
  const user = useSelector((state) => state.user);

  if (!user) return <Navigate to="/auth" />;

  if (!user.isCenter && (Element === AddCourse || Element === AddPayment))
    return <Navigate to="/" />;

  if (user.isCenter && Element === ReserveForm) return <Navigate to="/" />;

  if (!user.isAdmin && Element === Payments) return <Navigate to="/" />;

  return <Element />;
};

export default PrivateRoute;
