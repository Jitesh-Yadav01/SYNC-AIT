import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building, User, ChevronRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import axios from "axios";
import ClubSelectDropdown from "./ClubSelectDropdown";
import { useAuth } from "@/context/AuthContext";

const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

const AuthSelection = () => {
  const navigate = useNavigate();
  const { user, authLoading, isAdmin } = useAuth();
  const [selectedClub, setSelectedClub] = useState("");
  const [showClubSelect, setShowClubSelect] = useState(false);
  const [role, setRole] = useState("admin"); // "admin" | "member"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Auto-redirect if already authenticated
  useEffect(() => {
    if (authLoading) return;
    if (isAdmin) { navigate('/profile/Admin', { replace: true }); return; }
    if (user?.year) { navigate(`/profile/${user.year}`, { replace: true }); return; }
  }, [authLoading, user, isAdmin]);

  if (authLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center" style={{ backgroundImage: `url("/background.svg")`, backgroundRepeat: "no-repeat", backgroundPosition: "center top", backgroundSize: "cover" }}>
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white" />
      </div>
    );
  }

  const handleOrganisationSelect = () => {
    setShowClubSelect(true);
  };

  const handleApplicantSelect = () => {
    navigate("/login", { state: { role: "Applicant" } });
  };

  const handleClubSubmit = async (e) => {
    e.preventDefault();
    if (!selectedClub) {
      toast.error("Please select an organisation.");
      return;
    }
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
    if (!password) {
      toast.error("Please enter your password.");
      return;
    }

    setLoading(true);
    try {
      await toast.promise(
        axios.post(
          `${API}/api/admin/login`,
          { club: selectedClub, email, password },
          { withCredentials: true }
        ).then((res) => {
          if (res.data?.success === false) {
            throw Object.assign(new Error(res.data?.message || "Login failed"), { response: res });
          }
          return res;
        }),
        {
          pending: "Logging in...",
          success: {
            render({ data }) {
              setTimeout(() => navigate("/profile/Admin"), 1500);
              return data?.data?.message || "Logged in successfully! 👌";
            },
          },
          error: {
            render({ data }) {
              return (
                data?.response?.data?.message ||
                data?.message ||
                "Login failed 🤯"
              );
            },
          },
        }
      );
    } finally {
      setLoading(false);
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
      <div className="w-full max-w-md bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl px-8 py-10 relative overflow-visible">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 text-slate-400 hover:text-white transition-colors"
          onClick={() =>
            showClubSelect ? setShowClubSelect(false) : navigate("/")
          }
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="mb-8 text-center pt-4">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-3">
            {showClubSelect ? "Organisation Login" : "Choose Your Path"}
          </h1>
          <p className="text-sm text-slate-400 max-w-[280px] mx-auto leading-relaxed">
            {showClubSelect
              ? "Select your organisation and sign in"
              : "Tell us how you want to interact with the Community"}
          </p>
        </div>

        {!showClubSelect ? (
          <div className="space-y-4">
            <button
              onClick={handleOrganisationSelect}
              className="w-full group relative flex items-center gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-left"
            >
              <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-105 transition-transform">
                <Building className="h-5 w-5 text-slate-300" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-white">
                  Enter Organisation
                </h3>
                <p className="text-sm text-slate-400">Login as Admin or Member</p>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-500 group-hover:text-white transition-colors" />
            </button>

            <button
              onClick={handleApplicantSelect}
              className="w-full group relative flex items-center gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-left mt-4"
            >
              <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-105 transition-transform">
                <User className="h-5 w-5 text-slate-300" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-white">
                  Become Applicant
                </h3>
                <p className="text-sm text-slate-400">Apply for positions</p>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-500 group-hover:text-white transition-colors" />
            </button>
          </div>
        ) : (
          <div className="animate-in slide-in-from-right-4 duration-300">
            <form onSubmit={handleClubSubmit} className="space-y-5">
              {/* Club Dropdown */}
              <div className="space-y-2 relative z-50">
                <label className="text-sm font-medium text-slate-300 ml-1">
                  Organisation
                </label>
                <ClubSelectDropdown
                  selectedClub={selectedClub}
                  onSelect={setSelectedClub}
                />
              </div>

              {/* Role Toggle */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">
                  Role
                </label>
                <div className="flex rounded-xl border border-white/10 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setRole("admin")}
                    className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                      role === "admin"
                        ? "bg-white text-black"
                        : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("member")}
                    className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                      role === "member"
                        ? "bg-white text-black"
                        : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    Member
                  </button>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="org-email"
                  className="text-sm font-medium text-slate-300 ml-1"
                >
                  Email
                </label>
                <input
                  id="org-email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@organisation.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="org-password"
                  className="text-sm font-medium text-slate-300 ml-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="org-password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-11 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={loading || !selectedClub}
                  className="w-full py-3 rounded-xl bg-white text-black text-sm font-semibold hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        )}

        <p className="mt-8 text-xs text-center text-slate-500">
          By proceeding, you agree to Nexus{" "}
          <span className="text-slate-400 cursor-pointer">Terms</span>
        </p>
      </div>
    </div>
  );
};

export default AuthSelection;
