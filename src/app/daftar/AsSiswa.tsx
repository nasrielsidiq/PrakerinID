"use client";
import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import { Upload, User, Mail, Lock, School, Eye, EyeOff } from "lucide-react";
import { API, ENDPOINTS } from "../../../utils/config";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { json } from "stream/consumers";

interface FormData {
  username: string;
  name: string;
  school_id: string;
  email: string;
  password: string;
  password_confirmation: string;
  recaptcha_token: string;
  role: string;
  image?: File | null;
}

interface SchoolData {
  id: string;
  name: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

interface PrakerinRegistrationFormProps {
  setShowForm: (value: string) => void;
}

const PrakerinRegistrationSiswaForm: React.FC<
  PrakerinRegistrationFormProps
> = ({ setShowForm }) => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    name: "",
    school_id: "",
    email: "",
    password: "",
    password_confirmation: "",
    recaptcha_token: "",
    role: "student",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showpassword_confirmation, setShowpassword_confirmation] =
    useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const recaptchaRef = useRef<any>(null);
  const [schoolNames, setSchoolNames] = useState<SchoolData[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await API.get(ENDPOINTS.USERS, {
        params: { role: "school" },
      });

      if (response.status === 200) {
        // setSchoolNames(response.data.data);
        console.log(response.data.data);
        console.log("School names fetched successfully");
      } else {
        console.error("Failed to fetch school names");
      }
    }
    fetchData();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB");
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
      console.log(file);

      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleSubmit = async (): Promise<void> => {
    setIsSubmitting(true);
    const token = await recaptchaRef.current.executeAsync();
    recaptchaRef.current.reset();
    formData.recaptcha_token = token;
    try {
      // Simulate API call
      // await new Promise(resolve => setTimeout(resolve, 1000));

      const response = await axios.post(ENDPOINTS.REGISTER, formData, {
        withCredentials: true,
        withXSRFToken: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("Registration successful!");
        setShowForm(""); // Reset to initial form state
      } else {
        alert("Registration failed. Please try again.");
      }
      console.log("Form submitted:", {
        json: response.data,
        profileImage: formData.image,
      });
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        const errorData = error.response.data.errors;
        const newErrors: FormErrors = {};
        for (const key in errorData) {
          if (errorData.hasOwnProperty(key)) {
            newErrors[key] = errorData[key][0];
          }
        }
        setErrors(newErrors);
        return;
      }

      console.error("Submission error:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = (): void => {
    setShowForm(""); // Kembali ke halaman pilih form
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <img
            src="PrakerinID_ico.svg"
            alt=""
            className="lg:w-50 mb-4 mx-auto"
          />
          <h2 className="text-2xl font-semibold text-gray-700">
            Daftar Siswa Magang
          </h2>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Photo Upload */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tambah Foto
              </label>
              <div className="relative">
                <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-gray-400 mb-2 mx-auto" />
                      <p className="text-sm text-gray-500">
                        Klik untuk upload max (2mb)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="lg:col-span-2 space-y-4">
              {/* Username and Full Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Masukan Username anda disini"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors ${
                      errors.username ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.username}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Masukan Nama anda disini"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>
              </div>

              {/* School and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Asal Sekolah / Universitas
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="school_id"
                      value={formData.school_id}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors appearance-none bg-white ${
                        errors.school_id ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Pilih Sekolah/Univ anda</option>
                      {schoolNames &&
                        schoolNames.map((school, key) => (
                          <option key={key} value={school.id}>
                            {school.name}
                          </option>
                        ))}
                      <option value="other">Lainnya</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.school_id && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.school_id}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Masukan Email anda disini"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Password and Confirm Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Masukan Password anda disini"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors pr-12 ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Konfirmasi Password<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showpassword_confirmation ? "text" : "password"}
                      name="password_confirmation"
                      value={formData.password_confirmation}
                      onChange={handleInputChange}
                      placeholder="Masukan Password anda disini"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors pr-12 ${
                        errors.password_confirmation
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowpassword_confirmation(!showpassword_confirmation)
                      }
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
                    >
                      {showpassword_confirmation ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password_confirmation && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password_confirmation}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              disabled={isSubmitting}
            >
              Kembali
            </button>
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY as string}
              size="invisible"
              className="mb-4"
              ref={recaptchaRef}
            />
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors font-medium flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? "Mendaftar..." : "Daftar"}</span>
              {!isSubmitting && (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrakerinRegistrationSiswaForm;
