const  NotFound = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center space-y-6">
      <h1 className="text-3xl font-bold text-red-500">404 Not Found</h1>
      <p className="text-lg">The page you are looking for does not exist.</p>
    </div>
  );
};

export default  NotFound;