import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { User, Bell, Globe, Lock, LogOut, Trash2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "preferences", label: "Preferences", icon: Globe },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
];

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });
  const [language, setLanguage] = useState("en");
  const [notifications, setNotifications] = useState({
    riskAlerts: true,
    weeklyDigest: true,
    productUpdates: false,
  });
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleProfileChange(e) {
    setProfile((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function saveProfile(e) {
    e.preventDefault();
    // Frontend-only for now — wire up to PATCH /api/users/me once the
    // Spring Boot backend exists.
    toast.success("Profile saved");
  }

  function toggleNotification(key) {
    setNotifications((n) => ({ ...n, [key]: !n[key] }));
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-5xl px-6 py-8">
        <h1 className="text-2xl font-bold text-navy">Profile &amp; Settings</h1>
        <p className="mt-1 text-slate-500">Manage your account, language, and notification preferences.</p>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
          {/* Tab nav */}
          <nav className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex shrink-0 items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors lg:w-full ${
                  activeTab === id
                    ? "bg-royal/10 text-royal"
                    : "text-slate-600 hover:bg-slate-50 hover:text-navy"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </nav>

          {/* Panel */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            {activeTab === "profile" && (
              <form onSubmit={saveProfile} className="space-y-5">
                <div className="flex items-center gap-4">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-royal/10 text-xl font-bold text-royal">
                    <User size={26} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-navy">Profile photo</p>
                    <p className="text-xs text-slate-400">
                      Not yet connected — swap for a real avatar once auth returns user data.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-navy">Full name</span>
                    <Input name="name" value={profile.name} onChange={handleProfileChange} placeholder="Your full name" />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-navy">Email address</span>
                    <Input name="email" type="email" value={profile.email} onChange={handleProfileChange} placeholder="you@example.com" />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="mb-1.5 block text-sm font-medium text-navy">Phone number</span>
                    <Input name="phone" type="tel" value={profile.phone} onChange={handleProfileChange} placeholder="+91 XXXXX XXXXX" />
                  </label>
                </div>

                <Button type="submit" variant="royal">Save changes</Button>
              </form>
            )}

            {activeTab === "preferences" && (
              <div className="space-y-5">
                <div>
                  <p className="text-sm font-medium text-navy">Preferred language</p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    Used for clause simplification and translation output.
                  </p>
                  <div className="mt-3 flex gap-2">
                    {[
                      { id: "en", label: "English" },
                      { id: "hi", label: "हिंदी" },
                      { id: "mr", label: "मराठी" },
                    ].map((l) => (
                      <button
                        key={l.id}
                        onClick={() => setLanguage(l.id)}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                          language === l.id
                            ? "bg-royal text-white"
                            : "border border-slate-300 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-5">
                {[
                  { key: "riskAlerts", label: "High-risk clause alerts", desc: "Notify me when a new document scores High or Critical risk." },
                  { key: "weeklyDigest", label: "Weekly digest", desc: "A summary of documents reviewed and questions asked this week." },
                  { key: "productUpdates", label: "Product updates", desc: "New features and platform announcements." },
                ].map((item) => (
                  <div key={item.key} className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5 last:border-none last:pb-0">
                    <div>
                      <p className="text-sm font-medium text-navy">{item.label}</p>
                      <p className="mt-0.5 text-xs text-slate-400">{item.desc}</p>
                    </div>
                    <button
                      role="switch"
                      aria-checked={notifications[item.key]}
                      aria-label={item.label}
                      onClick={() => toggleNotification(item.key)}
                      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                        notifications[item.key] ? "bg-royal" : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                          notifications[item.key] ? "translate-x-5" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-8">
                <form className="space-y-5">
                  <p className="text-sm font-medium text-navy">Change password</p>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Input type="password" placeholder="Current password" autoComplete="current-password" />
                    <Input type="password" placeholder="New password" autoComplete="new-password" minLength={8} />
                  </div>
                  <Button type="submit" variant="royal">Update password</Button>
                </form>

                <div className="border-t border-slate-100 pt-6">
                  <p className="text-sm font-medium text-navy">Session</p>
                  <Button variant="outline" className="mt-3" onClick={handleLogout}>
                    <LogOut size={16} /> Log out of this device
                  </Button>
                </div>

                <div className="rounded-xl border border-danger/20 bg-danger/5 p-5">
                  <p className="text-sm font-semibold text-danger">Delete account</p>
                  <p className="mt-1 text-xs text-slate-600">
                    Permanently deletes your account and every document you've uploaded. This cannot be undone.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-3 !border-danger/30 !text-danger hover:!bg-danger/10"
                    onClick={() => toast("Account deletion isn't wired up yet — frontend-only for now.")}
                  >
                    <Trash2 size={16} /> Delete my account
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
