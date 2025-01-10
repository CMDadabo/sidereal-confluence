const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="h-8 w-8 border-4 border-t-transparent border-primary rounded-full animate-spin"
        role="status"
        aria-label="Loading"
      ></div>
    </div>
  );
};

export default Spinner;
