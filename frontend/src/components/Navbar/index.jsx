import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Globe, Bell, UserCircle2, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";

const NAV_LINKS = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Documents", to: "/upload" },
  { label: "Analysis", to: "/analysis" },
  { label: "Compare", to: "/compare" },
  { label: "Q&A", to: "/qa" },
  { label: "Profile", to: "/settings" },
];

function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-navy">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-royal text-xs font-bold text-white">
            AI
          </span>
          <span className="text-base font-bold text-white">NyayaSetu</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 shrink-0 md:flex">
          <Link
            to="/translate"
            className="flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/5"
            aria-label="Language and translation settings, currently English"
            title="Translate this document"
          >
            <Globe size={14} aria-hidden="true" />
            EN
          </Link>

          {isLoggedIn ? (
            <>
              <button
                className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 hover:bg-white/5"
                aria-label="Notifications, 1 unread"
              >
                <Bell size={16} aria-hidden="true" />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-danger" />
              </button>

              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="group flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-slate-200 hover:bg-danger/20 hover:text-danger"
                aria-label="Log out"
                title="Log out"
              >
                <UserCircle2 size={17} className="group-hover:hidden" aria-hidden="true" />
                <LogOut size={16} className="hidden group-hover:block" aria-hidden="true" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button as={Link} to="/login" variant="ghost" className="!text-slate-200 !px-3.5 !py-2 !text-sm hover:!text-white">
                Log In
              </Button>
              <Button as={Link} to="/register" variant="teal" className="!px-3.5 !py-2 !text-sm">
                Sign Up
              </Button>
            </div>
          )}
        </div>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10 md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-navy px-4 pb-5 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`rounded-lg px-3.5 py-3 text-base font-medium transition-colors ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4">
            <Link
              to="/translate"
              className="flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-slate-200"
              aria-label="Language and translation settings, currently English"
            >
              <Globe size={14} aria-hidden="true" />
              EN
            </Link>

            {isLoggedIn ? (
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="flex items-center gap-2 rounded-lg bg-white/10 px-3.5 py-2 text-sm font-medium text-slate-200"
              >
                <LogOut size={15} aria-hidden="true" /> Log out
              </button>
            ) : (
              <div className="flex flex-1 gap-2">
                <Button as={Link} to="/login" variant="ghost" className="flex-1 !text-slate-200 !px-3.5 !py-2 !text-sm">
                  Log In
                </Button>
                <Button as={Link} to="/register" variant="teal" className="flex-1 !px-3.5 !py-2 !text-sm">
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
