import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import GoogleAuthButton from "@/components/GoogleAuthButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await toast.promise(
      async () => {
        const res = await login(email, password);
        if (!res.success) {
          throw new Error(res.message || "Login failed");
        }
        return res;
      },
      {
        pending: "Requesting...",
        success: {
          render({ data }) {
            if (!data.user || !data.user.year) {
              console.error("Login: Missing user year in data", data);
              setTimeout(() => navigate("/"), 2000);
              return data.message || "Login successfully! (Redirecting to home) 👌";
            }
            setTimeout(() => navigate(`/profile/${data.user.year}`), 2000);
            return data.message || "Login successfully! 👌";
          },
        },
        error: {
          render({ data }) {
            return data.message || "Login failed 🤯";
          },
        },
      },
    );
  };

  const handleGoogleSuccess = (result) => {
    const user = result.user;
    toast.success("Logged in with Google! 👌");
    setTimeout(() => {
      if (user?.year) {
        navigate(`/profile/${user.year}`);
      } else {
        navigate("/");
      }
    }, 1500);
  };

  const handleGoogleError = (msg) => {
    toast.error(msg || "Google login failed 🤯");
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{
        backgroundImage: `url("/background.svg")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full max-w-md bg-transparent md:backdrop-blur-xl border border-slate-700/70 rounded-2xl shadow-2xl px-8 py-10 relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 text-slate-400 hover:text-slate-900 dark:hover:text-white"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        {/* Header */}
        <div className="mb-8 text-center pt-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Login with your college credentials
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={(e) => handleSubmit(e)}>
          {/* Email */}
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-900 dark:text-gray-200"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="you@college.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-900 dark:text-gray-200"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-2 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600  text-sm font-medium shadow-lg shadow-indigo-500/30 transition-transform transform hover:-translate-y-0.5"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-slate-700/60" />
          <span className="text-xs text-slate-500 select-none">or</span>
          <div className="flex-1 h-px bg-slate-700/60" />
        </div>

        {/* Google Auth */}
        <GoogleAuthButton
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />

        {/* Extra */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-400">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-indigo-500 hover:text-indigo-400 font-medium transition"
            >
              Register
            </button>
          </p>
        </div>

        {/* Extra */}
        <p className="mt-6 text-[11px] text-center text-slate-500 dark:text-slate-400">
          By continuing, you agree to our{" "}
          <span className="text-slate-900 dark:text-white underline underline-offset-2 cursor-pointer">
            Terms
          </span>{" "}
          &{" "}
          <span className="text-slate-900 dark:text-white underline underline-offset-2 cursor-pointer">
            Privacy Policy
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
