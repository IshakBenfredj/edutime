import React, { useEffect, useState, useRef } from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import { useSelector } from "react-redux";
import User from "../User";
import { Link } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { axiosGetWithoutHeader } from "../../functions/axiosFunctions";

const Search = ({
  showSearch,
  setShowSearch,
  setOpenNav,
  setPopupMessages,
  setPopupNot,
}) => {
  const user = useSelector((s) => s.user);
  const users = useSelector((s) => s.users);
  const courses = useSelector((s) => s.courses);
  const [category, setCategory] = useState("الكل");
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [openDd, setOpenDd] = useState(false);
  const inputRef = useRef(null);

  const showSearchFunc = () => {
    setShowSearch(!showSearch);
    setOpenNav(false);
    setPopupMessages(false);
    setPopupNot(false);
    document.body.classList.toggle("open");
    document.body.classList.remove("nav");
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await axiosGetWithoutHeader("/blogs");
      setBlogs(blogs);
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (showSearch) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  useEffect(() => {
    switch (category) {
      case "الكل":
        const searchUsers = users.filter((u) =>
          u.name.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResult(searchUsers);
        break;
      case "الدورات":
        const searchCourses = courses.filter((c) =>
          c.name.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResult(searchCourses);
        break;
      case "المعلمين":
        const teachers = users.filter((u) => u.isCenter);
        const searchTeachers = teachers.filter((t) =>
          t.name.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResult(searchTeachers);
        break;
      case "الطلبة":
        const students = users.filter((u) => !u.isCenter);
        const searchStudents = students.filter((s) =>
          s.name.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResult(searchStudents);
        break;
      case "المدونات":
        const searchBlogs = blogs.filter((b) =>
          b?.title.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResult(searchBlogs);
        break;
      default:
        const searchUsersDefault = users.filter((u) =>
          u.name.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResult(searchUsersDefault);
        break;
    }
  }, [search, category, users, courses, blogs]);

  return (
    <>
      <button
        onClick={showSearchFunc}
        className="p-1 rounded-lg text-gray-500 lg:text-3xl text-2xl transition-all hover:text-title
         font-bold flex justify-center z-40 items-center"
      >
        {showSearch ? <IoClose /> : <IoSearch />}
      </button>
      <div
        className={`lg:w-1/3 md:w-2/3 z-40 ${
          showSearch
            ? `absolute w-11/12 lg:top-20 ${
                user ? "top-[-75vh]" : "top-20"
              }  -translate-x-1/2 left-1/2`
            : "hidden"
        }`}
      >
        <div
          className={`lg:h-10 rounded-lg w-full border-title border-[1px] flex ${
            showSearch && `h-12`
          }`}
        >
          <div
            className="w-20 relative rounded-tr-lg rounded-br-lg overflow-hidden"
            onClick={() => setOpenDd(!openDd)}
          >
            <div className="h-full p-1 cursor-pointer bg-bgcolor flex items-center justify-center gap-2">
              <span className="text-color w-2/3 text-nowrap overflow-hidden">
                {category}
              </span>
              <IoMdArrowDropdown className="text-title" />
            </div>
            {openDd && (
              <div className="fixed z-40 bg-white top-10 w-fit shadow-lg rounded-md">
                <p
                  className="px-2 py-1 cursor-pointer hover:text-title transition-all"
                  onClick={() => setCategory("الكل")}
                >
                  الكل
                </p>
                <p
                  className="px-2 py-1 cursor-pointer hover:text-title transition-all"
                  onClick={() => setCategory("الدورات")}
                >
                  الدورات
                </p>
                <p
                  className="px-2 py-1 cursor-pointer hover:text-title transition-all"
                  onClick={() => setCategory("الطلبة")}
                >
                  الطلبة
                </p>
                <p
                  className="px-2 py-1 cursor-pointer hover:text-title transition-all"
                  onClick={() => setCategory("المعلمين")}
                >
                  معلمين ومراكز
                </p>
                <p
                  className="px-2 py-1 cursor-pointer hover:text-title transition-all"
                  onClick={() => setCategory("المدونات")}
                >
                  المدونات
                </p>
              </div>
            )}
          </div>
          <div className="w-full relative">
            <input
              ref={inputRef}
              type="search"
              name=""
              id=""
              className={`h-full w-full input px-3 bg-white rounded-none outline-none`}
              placeholder="بحث"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            {search && (
              <div className="bg-white p-2 shadow-lg absolute right-0 left-0 top-[39px]">
                <div>
                  {!searchResult.length ? (
                    <span className="text-center text-xl font-bold text-red-400 block">
                      لايوجد نتائج بحث
                    </span>
                  ) : category !== "الدورات" &&  category !== "المدونات" ? (
                    searchResult.map((s) => (
                      <User key={s._id} id={s._id} setPopup={showSearchFunc} />
                    ))
                  ) : category === "الدورات" ? (
                    searchResult.map((s) => (
                      <Link
                        to={`/course_details/${s._id}`}
                        onClick={showSearchFunc}
                        className="w-4/5 p-2 flex items-center gap-2 text-primary hover:text-secondary text-lg font-bold"
                      >
                        <img
                          src={s.image}
                          alt=""
                          className="w-10 h-10 rounded-full"
                        />
                        <span>{s.name}</span>
                      </Link>
                    ))
                  ) : (
                    searchResult.map((s) => (
                      <Link
                        to={`/blog/${s._id}`}
                        onClick={showSearchFunc}
                        className="w-4/5 p-2 flex items-center gap-2 text-primary hover:text-secondary text-lg font-bold"
                      >
                        <img
                          src={s.image}
                          alt=""
                          className="w-10 h-10 rounded-full"
                        />
                        <span>{s.title}</span>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
          <button className="p-2 bg-title text-white flex justify-center items-center rounded-tl-lg rounded-bl-lg">
            <IoSearch size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Search;
