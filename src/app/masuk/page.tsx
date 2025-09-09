"use client";
import ThemeToggle from "@/components/themeToggle";
import { Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";
import { useRef, useState } from "react";
import { API, ENDPOINTS } from "../../../utils/config";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { alertError, alertSuccess } from "@/libs/alert";

interface FormData {
  email: string;
  password: string;
  recaptcha_token: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const [data, setData] = useState<FormData>({
    email: "",
    password: "",
    recaptcha_token: "",
  });
  const router = useRouter();
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const recaptchaRef = useRef<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = await recaptchaRef.current.executeAsync();
    recaptchaRef.current.reset();
    data.recaptcha_token = token;

    try {
      const response = await API.post(`${ENDPOINTS.USERS}/login`, {
        email: data.email,
        password: data.password,
        recaptcha_token: data.recaptcha_token,
      });

      if (response.status === 200) {
        await alertSuccess("Anda berhasil masuk!");
        console.log("Login successful:", response.data);
        Cookies.set("userToken", response.data.token, {
          expires: 1,
          path: "/",
          sameSite: "strict",
        });

        Cookies.set("authorization", response.data.role, {
          expires: 1,
          path: "/",
          sameSite: "strict",
        });
        router.push("/dashboard");
      } else {
        console.error("Login failed:", response.data);
      }
    } catch (error) {
      await alertError("Gagal masuk. Silakan coba lagi.");
      console.error("Login error:", error);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      <div className="hidden">
        <ThemeToggle />
      </div>
      <section className="flex items-center justify-center min-h-screen bg-background px-4">
        <div className="w-full max-w-md space-y-6 bg-white shadow-2xl p-6 md:p-10 rounded-xl">
          <div className="flex justify-center">
            <img
              src="/PrakerinID_ico.svg"
              alt="Logo"
              className="w-28 md:w-48"
            />
          </div>
          <h1 className="text-2xl font-bold text-center">Login</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <input
                  name="email"
                  placeholder="Masukan email kamu"
                  onChange={handleChange}
                  type="email"
                  id="email"
                  className="mt-1 block w-full p-3 px-12 border border-gray-300 rounded-xl"
                />
                <UserRound className="text-accent absolute left-4 top-3.5 w-5 h-5" />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Masukan password kamu"
                  className={`w-full px-12 py-3 border rounded-lg pr-12 focus:ring-2 outline-none transition-colors ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <LockKeyhole className="text-accent absolute left-4 top-3.5 w-5 h-5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-3"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-accent" />
                  ) : (
                    <Eye className="w-5 h-5 text-accent" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                className="h-4 w-4"
              />
              <label htmlFor="remember" className="text-sm">
                Remember me
              </label>
            </div>

            <ReCAPTCHA
              sitekey="6LejCYsrAAAAAI_2Pf0-3czAPUaswYA4_GZDaGiy"
              size="invisible"
              ref={recaptchaRef}
            />

            <button
              type="submit"
              className="w-full bg-accent text-white py-2 rounded-md hover:bg-accent/90 transition"
            >
              Login
            </button>

            <div className="text-center">
              <p className="text-sm">
                Belum memiliki akun?{" "}
                <Link href="/daftar" className="text-blue-500 hover:underline">
                  Daftar
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
