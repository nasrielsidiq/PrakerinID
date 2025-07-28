"use client";
import React, { useState, ChangeEvent, useRef } from 'react';
import { Upload, User, Mail, Lock, School, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { ENDPOINTS } from '../../../utils/config';
import ReCAPTCHA from 'react-google-recaptcha';

interface FormData {
  username: string;
  name: string;
  address: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: string; // Optional field for role selection
  image?: File | null;
  recaptcha_token: string; // For reCAPTCHA token
}

interface FormErrors {
  [key: string]: string | undefined;
}

interface PrakerinRegistrationFormProps {
  setShowForm: (value: string) => void;
}

const PrakerinRegistrationSekolahForm: React.FC<PrakerinRegistrationFormProps> = ({ setShowForm }) => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    name: '',
    address: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'school', // Default role
    recaptcha_token: '',
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const recaptchaRef = useRef<any>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);

      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  // const validateForm = (): boolean => {
  //   const newErrors: FormErrors = {};


  //   // if (!formData.username.trim()) {
  //   //   newErrors.username = 'Username is required';
  //   // } else if (formData.username.length < 3) {
  //   //   newErrors.username = 'Username must be at least 3 characters';
  //   // }

  //   // if (!formData.fullName.trim()) {
  //   //   newErrors.fullName = 'Full name is required';
  //   // }

  //   // if (!formData.school) {
  //   //   newErrors.school = 'Please select a school/university';
  //   // }

  //   // if (!formData.email.trim()) {
  //   //   newErrors.email = 'Email is required';
  //   // } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
  //   //   newErrors.email = 'Please enter a valid email address';
  //   // }

  //   // if (!formData.password) {
  //   //   newErrors.password = 'Password is required';
  //   // } else if (formData.password.length < 6) {
  //   //   newErrors.password = 'Password must be at least 6 characters';
  //   // }

  //   // if (!formData.confirmPassword) {
  //   //   newErrors.confirmPassword = 'Please confirm your password';
  //   // } else if (formData.password !== formData.confirmPassword) {
  //   //   newErrors.confirmPassword = 'Passwords do not match';
  //   // }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleSubmit = async (): Promise<void> => {
    // if (!validateForm()) return;

    setIsSubmitting(true);
    const token = await recaptchaRef.current.executeAsync();
    recaptchaRef.current.reset();
    formData.recaptcha_token = token

    try {
      // Simulate API call
      const response = await axios.post(ENDPOINTS.REGISTER, formData, {
        withCredentials: true,
        withXSRFToken: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if (response.status === 422) {
        const errorData = response.data;
        const newErrors: FormErrors = {};

        // Map backend validation errors to form errors
        for (const key in errorData) {
          if (errorData.hasOwnProperty(key)) {
            newErrors[key] = errorData[key].join(', ');
          }
        }

        setErrors(newErrors);
        return;
      }

      if (response.status === 200) {
        alert('Registration successful!');
        setShowForm(""); // Reset to initial form state
      } else {
        alert('Registration failed. Please try again.');
      }
      console.log('Form submitted:', {
        json: response.data,
        profileImage: formData.image
      });


      // // Reset form after successful submission
      // setFormData({
      //   username: '',
      //   fullName: '',
      //   school: '',
      //   email: '',
      //   password: '',
      //   confirmPassword: ''
      // });
      // setProfileImage(null);

      alert('Registration successful!');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Registration failed. Please try again.');
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
          <img src="PrakerinID_ico.svg" alt="" className="lg:w-50 mb-4 mx-auto" />
          <h2 className="text-2xl font-semibold text-gray-700">Daftar Sekolah Magang</h2>
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
                      <p className="text-sm text-gray-500">Klik untuk upload max (2mb)</p>
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors ${errors.username ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-500">{errors.username}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Sekolah<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Masukan Nama Sekolah anda"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors ${errors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                  )}
                </div>
              </div>

              {/* School and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Masukan alamat sekolah anda"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors appearance-none bg-white ${errors.school ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {/* <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div> */}
                  </div>
                  {errors.school && (
                    <p className="mt-1 text-sm text-red-500">{errors.school}</p>
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'
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
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors pr-12 ${errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Konfirmasi Password<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="password_confirmation"
                      value={formData.password_confirmation}
                      onChange={handleInputChange}
                      placeholder="Masukan Password anda disini"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors pr-12 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
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
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors font-medium flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ReCAPTCHA
                sitekey="6LejCYsrAAAAAI_2Pf0-3czAPUaswYA4_GZDaGiy"
                size="invisible"
                className="mb-4"
                ref={recaptchaRef}
              />
              <span>{isSubmitting ? 'Mendaftar...' : 'Daftar'}</span>
              {!isSubmitting && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        {/* <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            © 2025 Prakerin ID. All rights reserved.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default PrakerinRegistrationSekolahForm;