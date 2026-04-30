import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { patients } from "../data/patients";
import { Moon, Sun, Eye, EyeOff, Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const { login } = useAuth();
  const { dark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // 🔥 AUTO LOGIN (ROLE FIXED)
  useEffect(() => {
    const saved = localStorage.getItem("rememberUser");

    if (saved) {
      const user = JSON.parse(saved);
      login(user);

      if (user.role === "doctor") navigate("/doctor");
      else if (user.role === "pharmacist") navigate("/pharmacist");
      else navigate("/patient");
    }
  }, []);

  const handleLogin = () => {
    setError("");

    if (!email || !password) {
      setError("Email ve şifre zorunlu");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const foundUser = patients.find(
        (p) =>
          p.email.toLowerCase() === email.trim().toLowerCase() &&
          p.password === password.trim()
      );

      if (!foundUser) {
        setError("Kullanıcı bulunamadı");
        setLoading(false);
        return;
      }

      login(foundUser);

      // 🔥 REMEMBER ME
      if (remember) {
        localStorage.setItem("rememberUser", JSON.stringify(foundUser));
      } else {
        localStorage.removeItem("rememberUser");
      }

      // 🔥 ROLE BASED NAVIGATION
      if (foundUser.role === "doctor") {
        navigate("/doctor");
      } else if (foundUser.role === "pharmacist") {
        navigate("/pharmacist");
      } else {
        navigate("/patient");
      }

    }, 800);
  };

  return (
    <div className="min-h-screen flex">

      {/* 🌙 DARK MODE */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className="w-12 h-12 flex items-center justify-center
          rounded-full backdrop-blur-xl
          bg-white/70 dark:bg-gray-800/70
          shadow-lg border border-white/30 dark:border-gray-700
          hover:scale-110 active:scale-95 transition-all duration-300"
        >
          {dark ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-[#6FA9B7]" />
          )}
        </button>
      </div>

      {/* SOL */}
      <div className="hidden md:flex w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200"
          alt="doctor"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/30"></div>

        <div className="absolute bottom-10 left-10 text-white max-w-sm">
          <h1 className="text-3xl font-bold leading-snug">
            Sağlığınızı Dijitalleştirin
          </h1>

          <p className="mt-3 text-sm opacity-90">
            Akıllı reçete yönetimi, hasta takibi ve hızlı erişim ile
            sağlık süreçlerinizi kolaylaştırın.
          </p>
        </div>
      </div>

      {/* LOGIN */}
      <div className="w-full md:w-1/2 flex items-center justify-center
      bg-[#F5F7F9] dark:bg-gray-900 transition">

        <div className="w-96 bg-white dark:bg-gray-800
        p-8 rounded-2xl shadow-md">

          {/* TITLE */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Health System
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Akıllı sağlık yönetimi
            </p>
          </div>

          {/* EMAIL */}
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email adresiniz"
            className={`w-full p-3 mb-3 rounded-lg border
            ${error ? "border-red-500" : "border-gray-200 dark:border-gray-700"}
            bg-white dark:bg-gray-700 text-black dark:text-white`}
          />

          {/* PASSWORD */}
          <div className="relative mb-2">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifre"
              className={`w-full p-3 pr-10 rounded-lg border
              ${error ? "border-red-500" : "border-gray-200 dark:border-gray-700"}
              bg-white dark:bg-gray-700 text-black dark:text-white`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* REMEMBER */}
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="accent-[#6FA9B7]"
              />
              Beni hatırla
            </label>

            <span className="text-xs text-[#6FA9B7] cursor-pointer hover:underline">
              Şifremi unuttum
            </span>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-[#6FA9B7] hover:bg-[#5a95a3]
            text-white p-3 rounded-lg transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Yükleniyor...
              </>
            ) : (
              "Giriş Yap"
            )}
          </button>

          <p className="text-center text-xs text-gray-400 mt-6">
            © 2026 Health App
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;