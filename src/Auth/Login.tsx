import { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { tokenActions } from "../Store/TokenSlice";
import { loginUser } from "./authFunctions";
import { userActions } from "../Store/UserSlice";

const Login = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userName.trim() || !password.trim()) {
      alert("Both fields are required.");
      return;
    }

    const data = await loginUser({userName, password});

    dispatch(tokenActions.onLogin({token: data.accessToken, expiresIn: 86400000}));
    dispatch(userActions.onLogin(data.user))

    console.log(data.accessToken);
    console.log(data.user);

    setUserName("");
    setPassword("");
  };

  function navigateTOCreateAccount(){
    navigate("/sign-up");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Sign In
          </button>
        </form>

        {/* Create Account Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <span className="text-blue-600 underline cursor-pointer hover:text-blue-700" onClick={navigateTOCreateAccount}>
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;