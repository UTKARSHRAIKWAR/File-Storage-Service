import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const showPass = () => setShow(!show);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error("Please fill all the fields");
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.post(
        "/api/auth/login",
        { email, password },
        { headers: { "Content-type": "application/json" } }
      );

      toast.success("Login Successful", {
        description: "Logged in successfully!",
        duration: 3000,
      });

      // Store token and user info
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      toast.error("An error occurred", {
        description:
          error.response?.data?.message || "Invalid email or password",
        duration: 3000,
      });
      setLoading(false);
    }
  };

  return (
    <div className="font-display min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 overflow-x-hidden">
      <div className="flex flex-1 justify-center py-5">
        <div className="flex flex-col w-full max-w-[960px]">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen w-full">
            {/* Left Side */}
            <div
              className="hidden md:flex w-full bg-center bg-no-repeat bg-cover"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom right, #a8d8ff, #d8bfff)",
              }}
            ></div>

            {/* Right Side */}
            <div className="flex items-center justify-center p-8 bg-gray-100 dark:bg-gray-900">
              <div className="w-full max-w-md">
                <div className="text-center mb-8">
                  <span className="text-2xl font-bold text-gray-500 dark:text-gray-400">
                    File Storage Service
                  </span>
                </div>

                <div className="bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl p-8 rounded-xl shadow-lg">
                  <div className="flex flex-wrap justify-between gap-3 p-4">
                    <p className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] w-full text-center">
                      Welcome Back
                    </p>
                  </div>

                  <form onSubmit={onSubmit} className="flex flex-col gap-4 p-4">
                    {/* Email */}
                    <label className="flex flex-col">
                      <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">
                        Email Address
                      </p>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-input w-full rounded-lg text-slate-900 dark:text-white border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 h-12 p-4 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      />
                    </label>

                    {/* Password */}
                    <label className="flex flex-col relative">
                      <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">
                        Password
                      </p>
                      <input
                        type={show ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-input w-full rounded-lg text-slate-900 dark:text-white border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 h-12 p-4 placeholder:text-gray-400 dark:placeholder:text-gray-500 pr-12"
                      />
                      <button
                        type="button"
                        onClick={showPass}
                        className="absolute right-4 top-[46px] text-sm font-medium text-blue-600 dark:text-blue-400"
                      >
                        {show ? "Hide" : "Show"}
                      </button>
                    </label>

                    {/* Forgot Password */}
                    <div className="flex justify-end mt-2">
                      <a
                        href="#"
                        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>

                    {/* Login Button */}
                    <div className="flex px-4 py-3 mt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className={`flex w-full items-center justify-center rounded-lg h-12 px-5 text-white text-base font-bold transition-colors ${
                          loading
                            ? "bg-blue-400 dark:bg-blue-500/50 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                        }`}
                      >
                        {loading ? "Logging in..." : "Login"}
                      </button>
                    </div>

                    {/* Signup Link */}
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                      Don’t have an account?{" "}
                      <a
                        href="/register"
                        className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Sign up
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
            {/* End Right Side */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
