import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import GoogleAuthButton from "@/components/GoogleAuthButton";

const YEARS = [
  { label: "FE", sublabel: "First Year", color: "from-violet-500 to-indigo-500" },
  { label: "SE", sublabel: "Second Year", color: "from-indigo-500 to-blue-500" },
  { label: "TE", sublabel: "Third Year", color: "from-blue-500 to-cyan-500" },
  { label: "BE", sublabel: "Final Year", color: "from-cyan-500 to-teal-500" },
];

// ─── Google Profile Setup Step ───────────────────────────────────
const GoogleProfileSetup = ({ onSubmit, loading }) => {
  const [setupName, setSetupName] = useState("");
  const [callSign, setCallSign] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!setupName.trim() || !callSign.trim() || !selectedYear) return;
    onSubmit({ name: setupName.trim(), callSign: callSign.trim(), year: selectedYear });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-semibold tracking-tight">One last step!</h2>
        <p className="mt-2 text-sm text-slate-400">
          Complete your profile to get started
        </p>
      </div>

      {/* Name */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-900 dark:text-gray-200">
          Full Name
        </label>
        <input
          type="text"
          required
          disabled={loading}
          placeholder="John Doe"
          value={setupName}
          onChange={(e) => setSetupName(e.target.value)}
          className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition disabled:opacity-50"
        />
      </div>

      {/* Call Sign */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-900 dark:text-gray-200">
          Call Sign
          <span className="ml-2 text-[11px] font-normal text-slate-500">
            — This is your UID
          </span>
        </label>
        <input
          type="text"
          required
          maxLength={10}
          disabled={loading}
          placeholder="e.g. jdoe42"
          value={callSign}
          onChange={(e) => setCallSign(e.target.value)}
          className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition disabled:opacity-50"
        />
        <p className="text-[11px] text-slate-500 mt-1 text-right">{callSign.length}/10</p>
      </div>

      {/* Year grid */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-900 dark:text-gray-200">
          Academic Year
        </label>
        <div className="grid grid-cols-4 gap-2">
          {YEARS.map(({ label, color }) => (
            <button
              key={label}
              type="button"
              disabled={loading}
              onClick={() => setSelectedYear(label)}
              className={`
                relative rounded-xl p-0.5
                bg-gradient-to-br ${color}
                transition-all duration-150
                ${selectedYear === label ? "scale-[1.04] shadow-lg" : "opacity-50 hover:opacity-80"}
                disabled:pointer-events-none
              `}
            >
              <div className={`
                rounded-[10px] py-2 text-center text-sm font-semibold
                transition-colors duration-150
                ${selectedYear === label
                  ? "bg-slate-800 text-white"
                  : "bg-slate-900 text-slate-300 group-hover:bg-slate-800"}
              `}>
                {label}
              </div>
            </button>
          ))}
        </div>
        {!selectedYear && (
          <p className="text-[11px] text-slate-500">Select your current year to continue.</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || !setupName.trim() || !callSign.trim() || !selectedYear}
        className="w-full mt-2 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600 text-white text-sm font-medium shadow-lg shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none"
      >
        {loading ? "Saving..." : "Finish Setup"}
      </button>
    </form>
  );
};

// ─── Main SignUp Component ───────────────────────────────────────
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [year, setYear] = useState("");

  // For the Google → profile setup flow
  const [step, setStep] = useState("form"); // "form" | "profile-setup"
  const [googleUser, setGoogleUser] = useState(null);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { signUp, updateUserInfo } = useAuth();

  // ── Normal sign-up ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    await toast.promise(
      async () => {
        const res = await signUp(name, email, password, year);
        if (!res.success) {
          throw new Error(res.message || "Registration failed");
        }
        return res;
      },
      {
        pending: "Registering...",
        success: {
          render({ data }) {
            setTimeout(() => navigate("/verify-account", { state: { email, year } }), 2000);
            return data.message || "Registered successfully! 👌";
          },
        },
        error: {
          render({ data }) {
            return data.message || "Registration failed 🤯";
          },
        },
      }
    );
  };

  // ── Google sign-up success ──
  const handleGoogleSuccess = (result) => {
    const user = result.user;
    if (user?.year) {
      // Already has a year → go straight to profile
      toast.success("Signed up with Google! 👌");
      setTimeout(() => navigate(`/profile/${user.year}`), 1500);
    } else {
      // New Google user → show profile setup screen
      setGoogleUser(user);
      setStep("profile-setup");
    }
  };

  const handleGoogleError = (msg) => {
    toast.error(msg || "Google signup failed 🤯");
  };

  // ── Profile setup submit after Google signup ──
  const handleProfileSetup = async ({ name, callSign, year }) => {
    setSaving(true);
    try {
      const result = await updateUserInfo({ name, callSign, year });
      if (result.success) {
        toast.success(`Welcome aboard, ${name}! 🎉`);
        setTimeout(() => navigate(`/profile/${year}`), 1500);
      } else {
        toast.error(result.message || "Failed to save profile");
      }
    } catch (err) {
      toast.error("Failed to save profile");
    } finally {
      setSaving(false);
    }
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
        {/* Back button — hidden on year-picker so user cannot bypass it */}
        {step === "form" && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 text-slate-400 hover:text-slate-900 dark:hover:text-white"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}

        {step === "profile-setup" ? (
          // ── Google Profile Setup Screen ──
          <div className="pt-2">
            <GoogleProfileSetup onSubmit={handleProfileSetup} loading={saving} />
          </div>
        ) : (
          // ── Sign-up Form ──
          <>
            {/* Header */}
            <div className="mb-8 text-center pt-2">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Sign up with your college credentials
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="space-y-1">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-900 dark:text-gray-200"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

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

              {/* Year dropdown */}
              <div className="space-y-1">
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-slate-900 dark:text-gray-200"
                >
                  Year
                </label>
                <select
                  id="year"
                  required
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-100 border border-slate-300 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value="" disabled>
                    Select year
                  </option>
                  <option value="FE">FE</option>
                  <option value="SE">SE</option>
                  <option value="TE">TE</option>
                  <option value="BE">BE</option>
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full mt-2 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600 text-sm font-medium shadow-lg shadow-indigo-500/30 transition-transform transform hover:-translate-y-0.5 text-white"
              >
                Sign Up
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
              label="Sign up with Google"
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />

            {/* Extra */}
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-400">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-indigo-500 hover:text-indigo-400 font-medium transition"
                >
                  Login
                </button>
              </p>
            </div>

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
          </>
        )}
      </div>
    </div>
  );
};

export default SignUp;
