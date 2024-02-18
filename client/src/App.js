import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home/Home";
import Navbare from "./components/Navbare.jsx";
import Footer from "./components/footer/Footer";
import Auth from "./pages/auth/Auth";
import AddCoursework from "./pages/courses/add coursework/AddCoursework";
import CourseworkDetails from "./pages/details/CourseworkDetails";
import ReserveForm from "./pages/reserve/ReserveForm";
import CenterDetails from "./pages/details/CenterDetails";
import CategoryCourses from "./pages/courses/category and search filter/CategoryCourses";
import AllCenters from "./pages/courses/category and search filter/AllCenters";
import Search from "./pages/courses/category and search filter/Search";
import Profile from "./pages/Profile";
import Edit from "./pages/courses/add coursework/Edit";
import Reservations from "./pages/reserve/Reservations";
import TermsAndConditions from "./pages/conditions/TermsAndConditions";
import PrivacyPolicy from "./pages/conditions/PrivacyPolicy";
import PlatformWork from "./pages/conditions/PlatformWork";
import SubscriptionDetails from "./pages/conditions/SubscriptionDetails";
import BuySubscription from "./pages/conditions/BuySubscription";
import Articles from "./pages/articles/Articles";
import Article from "./pages/articles/Article.jsx";
import AddPayment from "./pages/payments/AddPayment.jsx";
import Payments from "./pages/payments/Payments.jsx";
import { useEffect } from "react";
import PrivateRoute from "./PrivateRoute.js";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUsers } from "./toolkit/slices/users.js";
import { getComments } from "./toolkit/slices/comments.js";
import { getArticles } from "./toolkit/slices/articles.js";
import { getReservations } from "./toolkit/slices/reservations.js";
import { logout, update } from "./toolkit/slices/user.js";
import { axiosGetWithoutHeader } from "./functions/axiosFunctions.js";
import { handleError } from "./functions/toastifyFunctions.js";

export const setTitle = (newTitle) => {
  document.title = newTitle;
};

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getComments());
    dispatch(getArticles());
    dispatch(getReservations());
  }, [dispatch]);

  useEffect(() => {
    const verifyToken = async () => {
      const tokenStorage = localStorage.getItem("token");

      if (!tokenStorage) {
        navigate("/");
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
  }, []);

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
      {/*
      <UserContextProvider>
      <CourseworkContextProvider>
      <CommentsContextProvider>
      <ReservationsProvider> */}
      <Navbare />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/auth"
          element={
            localStorage.getItem("userId") ? <Navigate to={"/"} /> : <Auth />
          }
        />
        <Route
          path="/addCoursework"
          element={<PrivateRoute Element={AddCoursework} />}
        />
        <Route
          path="/editCoursework/:id"
          element={<PrivateRoute Element={Edit} />}
        />
        <Route
          path="/courseworkDetails/:courseworkname/:id"
          element={<CourseworkDetails />}
        />
        <Route path="/centerDetails/:centername" element={<CenterDetails />} />
        <Route
          path="/reserve/:courseworkname/:id"
          element={<PrivateRoute Element={ReserveForm} />}
        />
        <Route path="/courseworks/:category" element={<CategoryCourses />} />
        <Route path="/users" element={<AllCenters />} />
        <Route path="/centers" element={<AllCenters />} />
        <Route path="/search/:type/:searchText" element={<Search />} />
        <Route
          path="/profile/:id"
          element={<PrivateRoute Element={Profile} />}
        />
        <Route
          path="/orders"
          element={<PrivateRoute Element={Reservations} />}
        />
        <Route path="/termsAndConditions" element={<TermsAndConditions />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/platformWork" element={<PlatformWork />} />
        <Route path="/subscriptionDetails" element={<SubscriptionDetails />} />
        <Route path="/buySubscription" element={<BuySubscription />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/article_details/:id" element={<Article />} />
        <Route
          path="/addPayment"
          element={<PrivateRoute Element={AddPayment} />}
        />
        <Route path="/payments" element={<PrivateRoute Element={Payments} />} />
      </Routes>
      {/* <Footer /> */}
      {/* </ReservationsProvider>
      </CommentsContextProvider>
      </CourseworkContextProvider>
      </UserContextProvider>
       */}
    </>
  );
}

export default App;
