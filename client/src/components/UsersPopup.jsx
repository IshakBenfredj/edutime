import { IoCloseSharp } from "react-icons/io5";
import images from "../constants/images";
import User from "./User";
import { useLocation } from "react-router-dom";

export default function UsersPopup({ usersLikesId, setPopup, showUsers }) {
  const path = useLocation().pathname
  return (
    <div className={`fixed z-[200] h-screen ${path === '/forum' ? '-top-3' :'top-0'} right-0 left-0 bg-black/70 flex justify-center items-center`}>
      <div className="bg-white max-h-96 no-scrollbar overflow-auto lg:w-1/4 md:w-2/5 w-4/5 rounded-lg">
        <div className="p-1 border-b-[1px] border-gray-500">
          <IoCloseSharp
            size={30}
            className="cursor-pointer"
            onClick={() => setPopup(false)}
          />
        </div>
        {showUsers ? (
          usersLikesId.map((id) => (
            <User id={id} key={id} setPopup={setPopup} />
          ))
        ) : (
          <div className="p-4">
            <img
              src={images.listPrivate}
              alt=""
              className="w-1/3 mx-auto mb-4"
            />
            <p className="text-color text-lg leading-8 text-center mb-3">
              نعتذر !! هذه القائمة خاصة ولا يمكن التطلع عليها , نشكرك على تفهمك
              ❤️
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
