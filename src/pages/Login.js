import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { patients } from "../data/patients";
import { Moon, Sun, Eye, EyeOff, Loader2, Activity } from "lucide-react";

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
      if (remember) {
        localStorage.setItem("rememberUser", JSON.stringify(foundUser));
      } else {
        localStorage.removeItem("rememberUser");
      }

      if (foundUser.role === "doctor") navigate("/doctor");
      else if (foundUser.role === "pharmacist") navigate("/pharmacist");
      else navigate("/patient");
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f3f4f6] dark:bg-gray-950 p-4 md:p-8">
      
      {/* 🌙 DARK MODE TOGGLE */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 transition-transform hover:scale-110 active:scale-95"
        >
          {dark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-[#1589a0]" />}
        </button>
      </div>

      {/* MAIN CARD CONTAINER - Derin Gölge Efekti Eklendi */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row overflow-hidden rounded-[2.5rem] bg-white dark:bg-gray-900 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)]">
        
        {/* LEFT SIDE: IMAGE & BRANDING */}
        <div className="hidden md:flex w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=2070&auto=format&fit=crop"
            alt="Healthcare System"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Görsel Üstü Özel Renk Geçişi (Overlay) */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1589a0]/90 via-[#0d4d5a]/70 to-[#083b44]/60"></div> 
          
          <div className="relative z-10 p-14 flex flex-col justify-between h-full text-white">
            <div>
              <Activity className="w-12 h-12 mb-8 opacity-90" />
              <h1 className="text-4xl font-bold leading-tight tracking-tight">
                Sağlığınızı <br /> Dijitalleştirin
              </h1>
              <p className="mt-6 text-lg opacity-85 font-light leading-relaxed max-w-sm">
                Akıllı reçete yönetimi ve hasta takibi ile sağlık süreçlerinizi geleceğe taşıyın.
              </p>
            </div>
            
            <div className="text-sm opacity-60 italic tracking-wide">
              "Tıbbi teknolojide yeni nesil çözüm ortağınız."
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: LOGIN FORM */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-white dark:bg-gray-900">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight">
              Health System
            </h2>
            <p className="text-gray-400 dark:text-gray-500 mt-2 font-medium">
              Lütfen hesabınıza giriş yapın
            </p>
          </div>

          <div className="space-y-6">
            {/* EMAIL */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 ml-1">E-posta</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@mail.com"
                className={`w-full p-4 rounded-2xl border transition-all outline-none text-sm
                ${error ? "border-red-500 bg-red-50 dark:bg-red-900/10" : "border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-[#1589a0] focus:bg-white dark:focus:bg-gray-800"}
                text-gray-900 dark:text-white font-medium`}
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 ml-1">Şifre</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full p-4 pr-12 rounded-2xl border transition-all outline-none text-sm
                  ${error ? "border-red-500 bg-red-50 dark:bg-red-900/10" : "border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-[#1589a0] focus:bg-white dark:focus:bg-gray-800"}
                  text-gray-900 dark:text-white font-medium`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1589a0] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* REMEMBER & FORGOT */}
            <div className="flex items-center justify-between text-[13px] py-1 font-medium">
              <label className="flex items-center gap-2 cursor-pointer group text-gray-500 dark:text-gray-400">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#1589a0] focus:ring-[#1589a0] accent-[#1589a0]"
                />
                <span className="group-hover:text-gray-700 dark:group-hover:text-white transition-colors">Beni hatırla</span>
              </label>
              <button className="text-[#1589a0] hover:text-[#127286] transition-colors">
                Şifremi unuttum
              </button>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl text-xs font-semibold text-center border border-red-100 dark:border-red-900/30">
                {error}
              </div>
            )}

            {/* LOGIN BUTTON - Hover Büyüme ve Özel Mavi Renk */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-[#1589a0] hover:bg-[#127286] text-white p-4 rounded-2xl font-bold text-base shadow-lg shadow-[#1589a0]/30 
              transition-all duration-300 hover:scale-[1.03] active:scale-95 disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Giriş Yapılıyor...
                </>
              ) : (
                "Sisteme Giriş Yap"
              )}
            </button>
          </div>

          <div className="mt-auto pt-12 text-center">
            <p className="text-gray-500 dark:text-gray-500 text-sm font-medium">
              Henüz bir hesabınız yok mu? <span className="text-[#1589a0] font-bold cursor-pointer hover:underline underline-offset-4 decoration-2">Kaydolun</span>
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-600 mt-6 tracking-widest uppercase">
              © 2026 Health App - Her hakkı saklıdır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;