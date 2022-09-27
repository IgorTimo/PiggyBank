const ErrorView = ({ error }) => {
  return (
    <div
      className={
        "flex w-1/3 justify-center border bg-red-400 py-1 px-4 text-3xl font-bold text-red-800"
      }
    >
      {error}
    </div>
  );
};

export default ErrorView;
