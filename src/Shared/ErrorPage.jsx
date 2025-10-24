import { useEffect } from "react";
import { Link, useNavigate, useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    document.title = "Error";
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300">

      <div className="text-center">
        <h1 className="text-7xl font-extrabold text-red-500">404</h1>
        <h2 className="text-2xl font-semibold mt-4 text-gray-800">
          {error?.statusText || "Page Not Found"}
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          {error?.message || "Sorry, the page you are looking for doesn't exist."}
        </p>
        <Link to="/">
          <button
            onClick={handleBack}
            className="mt-6 px-6 py-3 rounded-lg text-white bg-red-500 hover:bg-red-600 transition-shadow shadow-lg hover:shadow-xl">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
