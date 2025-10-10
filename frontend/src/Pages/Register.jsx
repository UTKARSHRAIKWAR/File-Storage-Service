// import React, { useState } from "react";
// import api from "../axios";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     if (!name || !email || !password || !confirm) {
//       toast.error("Please fill all fields");
//       return;
//     }

//     if (password !== confirm) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     setLoading(true);
//     try {
//       const config = { headers: { "Content-type": "application/json" } };

//       const { data } = await api.post(
//         "/api/auth/register",
//         { name, email, password },
//         config
//       );

//       toast.success("Registration Successful", {
//         description: "Your account has been created!",
//         duration: 5000,
//       });

//       localStorage.setItem("userInfo", JSON.stringify(data));
//       setLoading(false);
//       navigate("/dashboard");
//     } catch (error) {
//       toast.error("Registration Failed", {
//         description: error.response?.data?.message || "Something went wrong!",
//         duration: 5000,
//       });
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="font-display min-h-screen flex flex-col bg-background-light dark:bg-background-dark overflow-x-hidden">
//       <div className="flex flex-1 justify-center py-5">
//         <div className="flex flex-col w-full max-w-[960px]">
//           <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen w-full">
//             {/* Left Side */}
//             <div
//               className="hidden md:flex w-full bg-center bg-no-repeat bg-cover"
//               style={{
//                 backgroundImage:
//                   "linear-gradient(to bottom right, #a8d8ff, #d8bfff)",
//               }}
//             ></div>

//             {/* Right Side */}
//             <div className="flex items-center justify-center p-8 bg-background-light dark:bg-background-dark">
//               <div className="w-full max-w-md">
//                 <div className="text-center mb-8">
//                   <span className="text-2xl font-bold text-gray-500 dark:text-gray-400">
//                     File Storage Service
//                   </span>
//                 </div>

//                 <div className="bg-white/70 dark:bg-black/30 backdrop-blur-xl p-8 rounded-xl shadow-lg">
//                   <div className="flex flex-wrap justify-between gap-3 p-4">
//                     <p className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] w-full text-center">
//                       Create Account
//                     </p>
//                   </div>

//                   <form onSubmit={onSubmit} className="flex flex-col gap-4 p-4">
//                     {/* Name */}
//                     <label className="flex flex-col">
//                       <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">
//                         Full Name
//                       </p>
//                       <input
//                         type="text"
//                         name="name"
//                         placeholder="Enter your name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                         className="form-input w-full rounded-lg text-slate-900 dark:text-white border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:border-primary focus:ring-2 focus:ring-primary h-12 p-4 placeholder:text-gray-400 dark:placeholder:text-gray-500"
//                       />
//                     </label>

//                     {/* Email */}
//                     <label className="flex flex-col">
//                       <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">
//                         Email Address
//                       </p>
//                       <input
//                         type="email"
//                         name="email"
//                         placeholder="Enter your email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                         className="form-input w-full rounded-lg text-slate-900 dark:text-white border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:border-primary focus:ring-2 focus:ring-primary h-12 p-4 placeholder:text-gray-400 dark:placeholder:text-gray-500"
//                       />
//                     </label>

//                     {/* Password */}
//                     <label className="flex flex-col">
//                       <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">
//                         Password
//                       </p>
//                       <input
//                         type="password"
//                         name="password"
//                         placeholder="Enter your password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                         className="form-input w-full rounded-lg text-slate-900 dark:text-white border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:border-primary focus:ring-2 focus:ring-primary h-12 p-4 placeholder:text-gray-400 dark:placeholder:text-gray-500"
//                       />
//                     </label>

//                     {/* Confirm Password */}
//                     <label className="flex flex-col">
//                       <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">
//                         Confirm Password
//                       </p>
//                       <input
//                         type="password"
//                         name="confirm"
//                         placeholder="Re-enter your password"
//                         value={confirm}
//                         onChange={(e) => setConfirm(e.target.value)}
//                         required
//                         className="form-input w-full rounded-lg text-slate-900 dark:text-white border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:border-primary focus:ring-2 focus:ring-primary h-12 p-4 placeholder:text-gray-400 dark:placeholder:text-gray-500"
//                       />
//                     </label>

//                     {/* Submit */}
//                     <div className="flex px-4 py-3 mt-4">
//                       <button
//                         type="submit"
//                         disabled={loading}
//                         className={`flex w-full items-center justify-center rounded-lg h-12 px-5 text-white text-base font-bold transition-colors ${
//                           loading
//                             ? "bg-primary/50 cursor-not-allowed"
//                             : "bg-primary hover:bg-primary/90"
//                         }`}
//                       >
//                         {loading ? "Creating Account..." : "Register"}
//                       </button>
//                     </div>

//                     {/* Login Link */}
//                     <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
//                       Already have an account?{" "}
//                       <a
//                         href="/login"
//                         className="text-primary hover:underline font-medium"
//                       >
//                         Login
//                       </a>
//                     </p>
//                   </form>
//                 </div>
//               </div>
//             </div>
//             {/* End Right Side */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useEffect, useState } from "react";
import api from "../axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirm) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const config = { headers: { "Content-type": "application/json" } };

      const { data } = await api.post(
        "/api/auth/register",
        { name, email, password },
        config
      );

      toast.success("Registration Successful", {
        description: "Your account has been created!",
        duration: 5000,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Registration Failed", {
        description: error.response?.data?.message || "Something went wrong!",
        duration: 5000,
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
                      Create Account
                    </p>
                  </div>

                  <form onSubmit={onSubmit} className="flex flex-col gap-4 p-4">
                    {/* Name */}
                    <label className="flex flex-col">
                      <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">
                        Full Name
                      </p>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="form-input w-full rounded-lg text-slate-900 dark:text-white border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 h-12 p-4 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      />
                    </label>

                    {/* Email */}
                    <label className="flex flex-col">
                      <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">
                        Email Address
                      </p>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-input w-full rounded-lg text-slate-900 dark:text-white border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 h-12 p-4 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      />
                    </label>

                    {/* Password */}
                    <label className="flex flex-col">
                      <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">
                        Password
                      </p>
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-input w-full rounded-lg text-slate-900 dark:text-white border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 h-12 p-4 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      />
                    </label>

                    {/* Confirm Password */}
                    <label className="flex flex-col">
                      <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">
                        Confirm Password
                      </p>
                      <input
                        type="password"
                        name="confirm"
                        placeholder="Re-enter your password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        required
                        className="form-input w-full rounded-lg text-slate-900 dark:text-white border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 h-12 p-4 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      />
                    </label>

                    {/* Submit */}
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
                        {loading ? "Creating Account..." : "Register"}
                      </button>
                    </div>

                    {/* Login Link */}
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                      Already have an account?{" "}
                      <a
                        href="/login"
                        className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Login
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

export default Register;
