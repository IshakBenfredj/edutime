import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { UserContextProvider } from "./context/userContext.js";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Home from "./pages/home/Home";
import Navbare from "./components/navbar/Navbare";
import ModeContextProvider from "./context/modeContext";
import Footer from "./components/footer/Footer";
import Auth from "./pages/auth/Auth";
import AddCoursework from "./pages/courses/add coursework/AddCoursework";
import CourseworkContextProvider from "./context/courseworkContext";
import CourseworkDetails from "./pages/details/CourseworkDetails";
import ReserveForm from "./pages/reserve/ReserveForm";
import CenterDetails from "./pages/details/CenterDetails";
import CommentsContextProvider from "./context/commentsContext";
import ReservationsProvider from "./context/reservationContext";
import CategoryCourses from "./pages/courses/category and search filter/CategoryCourses";
import AllCenters from "./pages/courses/category and search filter/AllCenters";
import Search from "./pages/courses/category and search filter/Search";
import Profile from "./pages/profile/Profile";
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
import { useState } from "react";
import PrivateRoute from "./PrivateRoute.js";
import { Navigate } from 'react-router-dom';

export const setTitle = (newTitle) => {
  document.title = newTitle;
};

function App() {

  const [id, setId] = useState()
  return (
    <>
      <ToastContainer/>
      <ModeContextProvider>
      <UserContextProvider>
      <CourseworkContextProvider>
      <CommentsContextProvider>
      <ReservationsProvider>
        <Navbare />
        <Routes>
          <Route path="/" element={<Home setId={setId} />} />
          <Route path="/auth" element={localStorage.getItem('userId') ? <Navigate to={'/'} /> : <Auth />} />
          <Route path="/addCoursework" element={<PrivateRoute Element={AddCoursework} />} />
          <Route path="/editCoursework/:id" element={<PrivateRoute Element={Edit} />} />
          <Route path="/courseworkDetails/:courseworkname/:id" element={<CourseworkDetails />} />
          <Route path="/centerDetails/:centername" element={<CenterDetails id={id} />} />
          <Route path="/reserve/:courseworkname/:id" element={<PrivateRoute Element={ReserveForm} />} />
          <Route path="/courseworks/:category" element={<CategoryCourses />} />
          <Route path="/users" element={<AllCenters setId={setId} />} />
          <Route path="/centers" element={<AllCenters setId={setId} />} />
          <Route path="/search/:type/:searchText" element={<Search />} />
          <Route path="/profile" element={<PrivateRoute Element={Profile} />} />
          <Route path="/orders" element={<PrivateRoute Element={Reservations} />} />
          <Route path="/termsAndConditions" element={<TermsAndConditions />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/platformWork" element={<PlatformWork />} />
          <Route path="/subscriptionDetails" element={<SubscriptionDetails />} />
          <Route path="/buySubscription" element={<BuySubscription />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/article_details/:id" element={<Article />} />
          <Route path="/addPayment" element={<PrivateRoute Element={AddPayment} />} />
          <Route path="/payments" element={<PrivateRoute Element={Payments} />} />
        </Routes>
        <Footer />
      </ReservationsProvider>
      </CommentsContextProvider>
      </CourseworkContextProvider>
      </UserContextProvider>
      </ModeContextProvider>
    </>
  );
}

export default App;
