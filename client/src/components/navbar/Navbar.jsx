import { useEffect, useState } from "react";
import LargeScreen from "./LargeScreen";
import PhoneScreen from "./PhoneScreen";

export default function Navbar() {
  const [scrollPosition, setScrollPosition] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [popupMessages, setPopupMessages] = useState(false);
  const [popupNot, setPopupNot] = useState(false);

  const closeAll = () => {
    setOpenNav(false);
    setShowSearch(false);
    setPopupMessages(false);
    document.querySelector("body").classList.remove("open");
    document.querySelector("body").classList.remove("nav");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      if (currentPosition >= 100) {
        setScrollPosition(true);
      } else {
        setScrollPosition(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 right-0 h-14 bg-white ${
        scrollPosition && "shadow-lg"
      }`}
    >
      <LargeScreen
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        closeAll={closeAll}
        setOpenNav={setOpenNav}
        setPopupMessages={setPopupMessages}
        popupMessages={popupMessages}
        setPopupNot={setPopupNot}
        popupNot={popupNot}
      />
      <PhoneScreen
        openNav={openNav}
        setOpenNav={setOpenNav}
        closeAll={closeAll}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        setPopupMessages={setPopupMessages}
        popupMessages={popupMessages}
        setPopupNot={setPopupNot}
        popupNot={popupNot}
      />
    </header>
  );
}
