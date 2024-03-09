import data from "../constants/categories";

export default function Input ({ set, label, type, name, Icon, state, category, textarea }) {
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
          className={`flex ${
            !textarea && "h-11"
          } bg-white shadow-lg rounded-lg overflow-hidden`}
        >
          <span className="p-2 flex items-center justify-center text-xl text-white bg-title">
            <Icon />
          </span>
          {!category && !textarea && (
            <input
              type={type}
              className="w-full px-2 focus:outline-none bg-white"
              id={name}
              name={name}
              onChange={(e) => set(e.target.value)}
              value={state ? state : ""}
            />
          )}
          {textarea && (
            <textarea
              className="w-full px-2 focus:outline-none bg-white h-48"
              id={name}
              onChange={(e) => set(e.target.value)}
              value={state ? state : ""}
              placeholder="قدم وصفا دقيقا لهذا الإعلان ليشمل كل تفاصيل الخدمة المقدمة"
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
  };
  