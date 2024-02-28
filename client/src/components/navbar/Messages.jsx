import { AiOutlineMessage, AiFillMessage } from "react-icons/ai";

export default function Messages() {
  return (
    <>
      <button className="p-1 rounded-lg lg:text-3xl text-2xl text-gray-500 transition-all hover:text-title font-bold flex justify-center items-center">
        <AiOutlineMessage />
      </button>
    </>
  );
}
