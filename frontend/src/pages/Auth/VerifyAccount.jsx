import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

const VerifyAccount = () => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyAccount, sendVerifyOtp } = useAuth();

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const hasSentInitialOtp = useRef(false);

  useEffect(() => {
    // Prevent double-sending in StrictMode or on re-renders
    if (hasSentInitialOtp.current) return;
    hasSentInitialOtp.current = true;

    // Automatically send OTP when user lands on this page
    const initialSend = async () => {
      const res = await sendVerifyOtp();
      if (res.success) {
        toast.info("A verification code has been sent to your email.");
      } else {
        toast.error(res.message || "Failed to send verification code.");
      }
    };
    initialSend();
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleResendOtp = async () => {
    const res = await sendVerifyOtp();
    if (res.success) {
      toast.success(res.message);
      setTimeLeft(600);
      setCanResend(false);
    } else {
      toast.error(res.message);
    }
  };

  const email = location.state?.email || "your email";
  const year = location.state?.year || "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    await toast.promise(
      async () => {
        const res = await verifyAccount(otp);
        if (!res.success) {
          throw new Error(res.message || "Verification failed");
        }
        return res;
      },
      {
        pending: "Verifying account...",
        success: {
          render({ data }) {
            setTimeout(() => navigate(`/profile/${year}`), 2000);
            return data.message || "Account verified successfully! 👌";
          },
        },
        error: {
          render({ data }) {
            return data.message || "Verification failed 🤯";
          },
        },
      }
    );
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
            Verify Account
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Otp send to {email}.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* OTP */}
          <div className="space-y-1">
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-slate-900 dark:text-gray-200"
            >
              Enter Otp
            </label>
            <input
              id="otp"
              type="text"
              required
              className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-sm placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-2 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600  text-sm font-medium shadow-lg shadow-indigo-500/30 transition-transform transform hover:-translate-y-0.5 text-white"
          >
            Verify Account
          </button>
        </form>

        {/* Timer */}
        <div className="mt-4 text-center">
          <p className="text-sm font-medium text-slate-500">
            Time remaining: <span className="text-indigo-500 font-mono">{formatTime(timeLeft)}</span>
          </p>
        </div>

        {/* Extra */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-400">
            Didn't receive code?{" "}
            <button
              onClick={handleResendOtp}
              disabled={!canResend}
              className={`font-medium transition ${
                canResend
                  ? "text-indigo-500 hover:text-indigo-400 cursor-pointer"
                  : "text-slate-500 cursor-not-allowed"
              }`}
            >
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
