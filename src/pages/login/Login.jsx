import { Link, useNavigate, useLocation } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import "./login.css";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  const { signInWithGoogle, setLoading, signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signIn(email, password)
      .then((result) => {
        console.log(result.user);
        navigate(from, { replace: true });
        toast.success("you logged in successfully");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        navigate(from, { replace: true });
        toast.success("you logged in successfully");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
        // toast.error(err.message);
      });
  };
  return (
    <div className="flex justify-center items-center min-h-screen login-div">
      <div className="flex flex-col max-w-lg p-6 sm:p-10 text-black rounded-xl bg-gray-300 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-[2px] max-sm:px-8">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm">Login to access your account</p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-md">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 rounded-md focus:outline-none bg-gray-200 placeholder:text-gray-500"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-md mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 rounded-md focus:outline-none bg-gray-200 placeholder:text-gray-900"
              />
            </div>
          </div>

          <div>
            <button type="submit" className="btn">
              Continue
            </button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          {/* <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div> */}
          {/* <p className="px-3 text-sm dark:text-gray-400">
            Login with social accounts
          </p> */}
          {/* <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div> */}
        </div>
        <div
          onClick={handleGoogleSignIn}
          className="btn-two flex justify-center my-2 items-center rounded-md cursor-pointer"
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className="px-6 text-md text-center">
          Don't have an account yet?
          <Link to="/register" className="font-semibold hover:underline">
            Register
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
