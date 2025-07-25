"use client";
import ThemeToggle from "@/components/themeToggle";
import axios from "axios";
import { Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ENDPOINTS } from "../../../utils/config";

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
        recaptcha_token: ""
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const recaptchaRef = useRef<any>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (!validateForm()) return;
        e.preventDefault();
        console.log(data);

        const token = await recaptchaRef.current.executeAsync();
        recaptchaRef.current.reset();
        data.recaptcha_token = token


        // await axios.get(ENDPOINTS.COOKIES, {
        //     withCredentials: true, // Ensure cookies are sent with the request
        //     // withXSRFToken: true, // Include XSRF token if needed
        // }).then((response) => {
        //     console.log("Cookies set successfully:", response);
        // }).catch((error) => {
        //     console.error("Error setting cookies:", error);
        // });

        const response = await axios.post(ENDPOINTS.LOGIN, {
            email: data.email,
            password: data.password,
            recaptcha_token: data.recaptcha_token
        }, {
            withCredentials: true,
            withXSRFToken: true,
        });
        if (response.status === 200) {
            // Handle successful login, e.g., redirect to dashboard or show success message
            console.log("Login successful:", response.data);
        } else {
            // Handle login error, e.g., show error message
            console.error("Login failed:", response.data);
        }
        console.log(data);

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
    }

    return (
        <>
            <div className="hidden">
                <ThemeToggle />
            </div>
            <section className="flex items-center justify-center min-h-screen">
                <div className="space-y-5 bg-background shadow-2xl md:p-10 rounded-xl flex flex-col items-center md:min-w-100">
                    <img src="PrakerinID_ico.svg" alt="" className="lg:w-50 " />
                    <h1 className="text-2xl font-bold">Login</h1>
                    <form className=" md:min-w-75 w-100" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium">Email</label>
                            <div className="flex-1 relative">
                                <input name="email" placeholder="Masukan username kamu disini" onChange={handleChange} type="email" id="email" className="mt-1 block w-full p-3 px-12 border border-gray-300 rounded-xl" />
                                <UserRound className="text-accent absolute left-4 top-3.5 w-5 h-5" />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                            )}
                        </div>
                        <div className=" mb-8">
                            <label htmlFor="password" className="block text-sm font-medium">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    placeholder="Masukan Password anda disini"
                                    className={`w-full px-12 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors pr-12 ${errors.password ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                <LockKeyhole className="text-accent absolute left-4 top-3.5 w-5 h-5" />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5 text-accent" /> : <Eye className="w-5 h-5 text-accent" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                            )}
                        </div>
                        <input type="checkbox" name="rember" className="me-2 mt-4" id="" />Remember me
                        <ReCAPTCHA
                            sitekey="6LejCYsrAAAAAI_2Pf0-3czAPUaswYA4_GZDaGiy"
                            size="invisible"
                            className="mb-4"
                            ref={recaptchaRef}
                        />
                        <button type="submit" className="w-full bg-accent text-white py-2 rounded-md">Login</button>
                        <div className="mt-4">
                            <p className="text-sm ">
                                Belum memilik akun? <Link href="/daftar" className="text-blue-500">Daftar</Link>
                            </p>
                        </div>
                    </form>
                </div >
            </section >
        </>
    )
}