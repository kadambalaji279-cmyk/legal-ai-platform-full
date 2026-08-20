import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [mode, setMode] = useState(
    location.pathname === "/register" ? "register" : "login"
  );
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    setMode(location.pathname === "/register" ? "register" : "login");
  }, [location.pathname]);

  const isLogin = mode === "login";

  function switchMode(nextMode) {
    navigate(nextMode === "login" ? "/login" : "/register");
  }

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    login();
    navigate("/dashboard");
  }

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-3/5 flex-col justify-center overflow-hidden bg-navy px-16 lg:flex">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-secondary/40" />

        <div className="relative">
          <Link to="/" className="text-base font-bold text-white">
            NyayaSetu
          </Link>

          <h1 className="mt-10 max-w-md text-4xl font-extrabold leading-tight text-white">
            Understand every clause before you sign.
          </h1>

          <p className="mt-5 max-w-sm text-slate-300">
            Trusted risk &amp; fairness analysis for rental, loan, property
            and employment agreements.
          </p>

          <div className="mt-10 flex w-full max-w-xs items-center gap-3 rounded-2xl bg-white p-4 shadow-xl">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brandgreen/10 text-brandgreen">
              <CheckCircle2 size={18} />
            </span>
            <div>
              <p className="text-sm font-semibold text-navy">
                Deposit Refund Clause Found
              </p>
              <p className="text-xs text-slate-500">Confidence 96%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-16 lg:w-2/5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mx-auto w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold text-navy">
            {isLogin ? "Welcome back" : "Create your account"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {isLogin
              ? "Sign in to continue to your dashboard"
              : "Start analysing legal documents in minutes"}
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy">
                  Full name
                </label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy">
                Email address
              </label>
              <Input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="block text-sm font-medium text-navy">
                  Password
                </label>
                {isLogin && (
                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-royal hover:underline"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <Input
                name="password"
                type="password"
                placeholder="••••••••••"
                value={form.password}
                onChange={handleChange}
                required
                minLength={8}
              />
            </div>

            <Button type="submit" variant="royal" className="w-full">
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Or continue with
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" type="button">
              Google
            </Button>
            <Button variant="outline" type="button">
              DigiLocker
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            {isLogin ? "New here?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => switchMode(isLogin ? "register" : "login")}
              className="font-semibold text-royal hover:underline"
            >
              {isLogin ? "Create an account" : "Sign in"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Auth;
