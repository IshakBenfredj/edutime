const Title = ({ title, minTitle }) => {
  return (
    <div className="mb-10 text-center">
      <h1 className="font-bold md:text-4xl text-3xl text-title flex items-center gap-2 justify-center">
        <span>🎓</span>
        <span>{title}</span>
      </h1>
      {minTitle && (
        <p
          className="text-color md:text-lg text-sm font-semibold mt-3 w-fit mx-auto relative 
        before:absolute before:w-2 before:h-2 before:rounded-full before:bg-secondary before:-right-4 before:-translate-y-1/2 before:top-1/2"
        >
          {minTitle}
        </p>
      )}
    </div>
  );
};

export default Title;
