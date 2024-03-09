import { CgDanger } from "react-icons/cg";

export default function Remark({ text }) {
  return (
    <div className="my-4 p-2 flex items-center gap-3 bg-red-200 text-red-700 rounded-md w-fit mx-auto">
      <CgDanger size={24} />
      <span>{text}</span>
    </div>
  );
}
