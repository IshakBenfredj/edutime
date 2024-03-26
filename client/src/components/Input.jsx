import data from "../constants/categories";

export default function Input({
  set,
  state,
  label,
  type,
  name,
  Icon,
  category,
  textarea,
  bgGray,
  placeholder
}) {
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        name={name}
        className="block text-primary text-lg font-semibold mb-2"
      >
        {label}
      </label>

      <div
        className={`flex border-[1px] border-gray-200 ${
          !textarea && "h-11"
        } bg-white rounded-lg overflow-hidden`}
      >
        <span className="p-2 flex items-center justify-center text-xl text-white bg-title">
          <Icon />
        </span>
        {!category && !textarea && (
          <input
            type={type}
            className={`w-full px-2 focus:outline-none ${
              bgGray ? "bg-bgcolor" : "bg-white"
            }`}
            id={name}
            name={name}
            onChange={(e) => set(e.target.value)}
            value={state ? state : ""}
          />
        )}
        {textarea && (
          <textarea
            className={`w-full px-2 focus:outline-none ${
              bgGray ? "bg-bgcolor" : "bg-white"
            } h-40`}
            id={name}
            onChange={(e) => set(e.target.value)}
            value={state ? state : ""}
            placeholder={placeholder}
          ></textarea>
        )}
        {category && (
          <select
            onChange={(e) => set(e.target.value)}
            className="w-full px-2 focus:outline-none bg-white"
          >
            <option selected disabled>
              الفئة
            </option>
            {data.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}
