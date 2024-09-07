import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home/Home";
import Footer from "./components/Footer";
import Auth from "./pages/auth/Auth";
import AddCourse from "./pages/AddCourse.jsx";
import TermsAndConditions from "./pages/conditions/TermsAndConditions";
import PrivacyPolicy from "./pages/conditions/PrivacyPolicy";
import PlatformWork from "./pages/conditions/PlatformWork";
// import SubscriptionDetails from "./pages/conditions/SubscriptionDetails";
// import BuySubscription from "./pages/conditions/BuySubscription";
// import AddPayment from "./pages/payments/AddPayment.jsx";
// import Payments from "./pages/payments/Payments.jsx";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import PrivateRoute from "./PrivateRoute.js";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "./toolkit/slices/users.js";
import {
  getClientReservations,
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
import CoursesByCategory from "./pages/CoursesByCategory.jsx";
import CourseDetails from "./pages/CourseDetails.jsx";
import Forum from "./pages/Forum.jsx";
import AddBlog from "./pages/AddBlog.jsx";
import Blogs from "./pages/Blogs.jsx";
import Blog from "./pages/Blog.jsx";
import DocRequests from "./pages/DocRequests.jsx";
import ChangeRequests from "./pages/ChangeRequests.jsx";
import MainPage from "./pages/messages/MainPage.jsx";
import MessagesContextProvider from "./pages/messages/MessagesContext.js";
import PostPage from "./pages/PostPage.jsx";
import SocketContextProvider from "./SocketContext.js";
import NotFound from "./pages/NotFound.jsx";
import { getCourses } from "./toolkit/slices/courses.js";
import HelmetHead from "./components/HelmetHead";

export const setTitle = (newTitle) => {
  document.title = newTitle;
};

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUsers());
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

  useEffect(() => {
    console.log("%cتوقف", "color: red; font-weight: bold; font-size: 4rem;");
    console.log(
      '%cهذه ميزة متصفح مخصصة للمطورين. إذا طلب منك شخص ما نسخ شيء ما ولصقه هنا لتمكين ميزة أودوتايم أو "اختراق" حساب شخص ما، فهذه عملية احتيال وستمنحه حق الوصول إلى حساب أودوتايم الخاص بك.',
      "font-size: 2rem;"
    );
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <HelmetHead title={"EduTime"} desc={"المنصة Edutime التعليمية"} />
      <SocketContextProvider>
        <MessagesContextProvider>
          <ToastContainer />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/auth"
              element={user ? <Navigate to={"/"} /> : <Auth />}
            />
            <Route
              path="/settings"
              element={<PrivateRoute Element={Settings} />}
            />
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
            <Route path="/courses/:category?" element={<CoursesByCategory />} />
            <Route path="/course_details/:id" element={<CourseDetails />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route
              path="/add_article"
              element={<PrivateRoute Element={AddBlog} />}
            />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/documentation_requests" element={<DocRequests />} />
            <Route path="/change_requests" element={<ChangeRequests />} />
            <Route path="/messages" element={<MainPage />} />
            <Route
              path="/termsAndConditions"
              element={<TermsAndConditions />}
            />
            <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/platformWork" element={<PlatformWork />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/404" element={<NotFound />} />
          </Routes>
        </MessagesContextProvider>
      </SocketContextProvider>
      <Footer />
    </>
  );
}

export default App;
