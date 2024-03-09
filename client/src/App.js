import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home/Home";
// import Footer from "./components/footer/Footer";
import Auth from "./pages/auth/Auth";
import AddCourse from "./pages/AddCourse.jsx";
// import CourseworkDetails from "./pages/details/CourseworkDetails";
// import ReserveForm from "./pages/reserve/ReserveForm";
// import CenterDetails from "./pages/details/CenterDetails";
// import CategoryCourses from "./pages/courses/category and search filter/CategoryCourses";
// import AllCenters from "./pages/courses/category and search filter/AllCenters";
// import Search from "./pages/courses/category and search filter/Search";
// import Reservations from "./pages/reserve/Reservations";
// import TermsAndConditions from "./pages/conditions/TermsAndConditions";
// import PrivacyPolicy from "./pages/conditions/PrivacyPolicy";
// import PlatformWork from "./pages/conditions/PlatformWork";
// import SubscriptionDetails from "./pages/conditions/SubscriptionDetails";
// import BuySubscription from "./pages/conditions/BuySubscription";
// import Articles from "./pages/articles/Articles";
// import Article from "./pages/articles/Article.jsx";
// import AddPayment from "./pages/payments/AddPayment.jsx";
// import Payments from "./pages/payments/Payments.jsx";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import PrivateRoute from "./PrivateRoute.js";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "./toolkit/slices/users.js";
import { getComments } from "./toolkit/slices/comments.js";
import { getArticles } from "./toolkit/slices/articles.js";
import {
  getClientReservations,
  getReservations,
  getUserReservations,
} from "./toolkit/slices/reservations.js";
import { logout, update } from "./toolkit/slices/user.js";
import { axiosGetWithoutHeader } from "./functions/axiosFunctions.js";
import { handleError } from "./functions/toastifyFunctions.js";
import Settings from "./pages/Settings.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import EditCourse from "./pages/EditCourse.jsx";
import ClientReservations from "./pages/ClientReservations.jsx";
import UserReservations from "./pages/UserReservations.jsx";

export const setTitle = (newTitle) => {
  document.title = newTitle;
};

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUsers());
    // dispatch(getComments());
    // dispatch(getArticles());
    user && user.isCenter
      ? dispatch(getUserReservations())
      : dispatch(getClientReservations());
  }, [dispatch, user]);

  useEffect(() => {
    const verifyToken = async () => {
      const tokenStorage = localStorage.getItem("token");

      if (!tokenStorage) {
        dispatch(logout());
        return;
      }

      try {
        const data = await axiosGetWithoutHeader(`/auth/${tokenStorage}`);

        if (data.success) {
          dispatch(update(data.user));
        } else {
          handleErrorInToken();
        }
      } catch (error) {
        handleErrorInToken();
      }
    };

    const handleErrorInToken = () => {
      dispatch(logout());
      localStorage.removeItem("token");
      handleError("جلسة منتهية الصلاحية");
      navigate("/");
    };

    verifyToken();
  }, [dispatch, navigate]);

  // useEffect(() => {
  //   console.log("%cتوقف", "color: red; font-weight: bold; font-size: 4rem;");
  //   console.log(
  //     '%cهذه ميزة متصفح مخصصة للمطورين. إذا طلب منك شخص ما نسخ شيء ما ولصقه هنا لتمكين ميزة أودوتايم أو "اختراق" حساب شخص ما، فهذه عملية احتيال وستمنحه حق الوصول إلى حساب أودوتايم الخاص بك.',
  //     "font-size: 2rem;"
  //   );
  // }, []);

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={user ? <Navigate to={"/"} /> : <Auth />} />
        <Route path="/settings" element={<PrivateRoute Element={Settings} />} />
        <Route
          path="/profile/:id"
          element={<PrivateRoute Element={Profile} />}
        />
        <Route
          path="/add_announcement"
          element={<PrivateRoute Element={AddCourse} />}
        />
        <Route
          path="/edit_course/:id"
          element={<PrivateRoute Element={EditCourse} />}
        />
        <Route
          path="/reservations"
          element={<PrivateRoute Element={UserReservations} />}
        />
        <Route
          path="/my_reservations"
          element={<PrivateRoute Element={ClientReservations} />}
        />
        {/* <Route
          path="/courseworkDetails/:courseworkname/:id"
          element={<CourseworkDetails />}
        /> */}
        {/* <Route path="/centerDetails/:centername" element={<CenterDetails />} /> */}
        {/* <Route
          path="/reserve/:courseworkname/:id"
          element={<PrivateRoute Element={ReserveForm} />}
        /> */}
        {/* <Route path="/courseworks/:category" element={<CategoryCourses />} /> */}
        {/* <Route path="/users" element={<AllCenters />} /> */}
        {/* <Route path="/centers" element={<AllCenters />} /> */}
        {/* <Route path="/search/:type/:searchText" element={<Search />} /> */}
        {/* <Route path="/termsAndConditions" element={<TermsAndConditions />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/platformWork" element={<PlatformWork />} />
        <Route path="/subscriptionDetails" element={<SubscriptionDetails />} />
        <Route path="/buySubscription" element={<BuySubscription />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/article_details/:id" element={<Article />} /> */}
        {/* <Route
          path="/addPayment"
          element={<PrivateRoute Element={AddPayment} />}
        /> */}
        {/* <Route path="/payments" element={<PrivateRoute Element={Payments} />} /> */}
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
