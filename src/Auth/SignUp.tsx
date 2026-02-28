import { useState, type FormEvent } from "react";
import { signUp } from "./authFunctions";
import { useDispatch } from "react-redux";
import { tokenActions } from "../Store/TokenSlice";
import { userActions } from "../Store/UserSlice";

const SignUp = () => {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch();

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userName.trim() || !email.trim() || !password.trim()) {
      alert("All fields are required.");
      return;
    }

    const data = await signUp({userName, email, password})

    dispatch(tokenActions.onLogin({token: data.accessToken, expiresIn: 86400000}));
    dispatch(userActions.onLogin(data.user));

    console.log(data.user);
    

    // Optional reset
    setUserName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Account
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

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;