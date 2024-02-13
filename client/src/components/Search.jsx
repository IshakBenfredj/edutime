import { IoClose, IoSearch } from "react-icons/io5";

const Search = ({showSearch, setShowSearch}) => {

  const showSearchFunc = () => {
    setShowSearch(!showSearch);
    document.body.classList.toggle("open");
  };

  return (
    <>
      <button
        onClick={showSearchFunc}
        className="p-2 bg-gray-800 rounded-lg text-white z-40 flex justify-center items-center lg:hidden order-3"
      >
        {
            showSearch ? <IoClose size={20} /> : <IoSearch size={20} />
          }
      </button>
      <div
        className={`lg:h-10 rounded-lg overflow-hidden border-gray-800 border-[1px] lg:relative lg:translate-x-0 flex ${
          showSearch
            ? "absolute h-12 w-4/5 top-20 -translate-x-1/2 left-1/2 z-40"
            : "lg:flex hidden"
        }`}
      >
        <input
          type="search"
          name=""
          id=""
          className="h-full bg-white rounded-none outline-none"
          placeholder="بحث"
        />
        <button
          className="p-2 bg-gray-800 text-white flex justify-center items-center"
        >
          <IoSearch size={20} />
        </button>
      </div>
    </>
  );
};

export default Search;
