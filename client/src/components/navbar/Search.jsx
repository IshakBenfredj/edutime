import { IoClose, IoSearch } from "react-icons/io5";
import { useSelector } from "react-redux";

const Search = ({ showSearch, setShowSearch, setOpenNav }) => {
  const user = useSelector((s) => s.user);
  const showSearchFunc = () => {
    setShowSearch(!showSearch);
    setOpenNav(false);
    document.body.classList.toggle("open");
    document.body.classList.remove("nav");
  };

  return (
    <>
      <button
        onClick={showSearchFunc}
        className="p-1 rounded-lg text-gray-500 lg:text-3xl text-2xl transition-all hover:text-title font-bold flex justify-center z-40 items-center"
      >
        {showSearch ? <IoClose /> : <IoSearch />}
      </button>
      <div
        className={`lg:h-10 rounded-lg overflow-hidden lg:w-1/3 md:w-2/3 border-title border-[1px] flex z-40 ${
          showSearch
            ? `absolute h-12 w-4/5 lg:top-20 ${
                user ? "top-[-75vh]" : "top-20"
              }  -translate-x-1/2 left-1/2`
            : "hidden"
        }`}
      >
        <input
          type="search"
          name=""
          id=""
          className="h-full input bg-white rounded-none outline-none"
          placeholder="بحث"
        />
        <button className="p-2 bg-title text-white flex justify-center items-center">
          <IoSearch size={20} />
        </button>
      </div>
    </>
  );
};

export default Search;
