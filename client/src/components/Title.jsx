const Title = ({ title, minTitle }) => {
  return (
    <div className="mb-10 text-center">
      <h1 className="font-bold md:text-5xl text-4xl text-title">{title}</h1>
      <p className="text-color md:text-lg text-sm font-semibold mt-3">
        {minTitle}
      </p>
    </div>
  );
};

export default Title;
