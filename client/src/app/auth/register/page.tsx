"use client";
import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CloseIcon from "@mui/icons-material/Close";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    remember: false,
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === "remember" ? checked : value,
    });
  };

  const validate = () => {
    let valid = true;
    const newErrors = {
      username: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          remember: formData.remember,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSubmitSuccess(true);
      setSubmitError("");
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Registration failed"
      );
      setSubmitSuccess(false);
    }
  };

  return (
    <main className="max-w-md mx-auto px-4 py-10">
      <div className="flex flex-col items-center">
        <div className="bg-purple-500 text-white rounded-full p-2 mb-2">
          <LockOutlinedIcon />
        </div>
        <h1 className="text-2xl font-semibold mb-4">Sign up</h1>

        {submitError && (
          <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span>{submitError}</span>
            <button
              onClick={() => setSubmitError("")}
              className="absolute top-2 right-2 text-red-700"
            >
              <CloseIcon fontSize="small" />
            </button>
          </div>
        )}

        {submitSuccess && (
          <div className="w-full bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            <span>Registration successful! You can now log in.</span>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="absolute top-2 right-2 text-green-700"
            >
              <CloseIcon fontSize="small" />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full mt-4 space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-purple-500 focus:border-purple-500"
            />
            {errors.username && (
              <p className="text-sm text-red-600 mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-purple-500 focus:border-purple-500"
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-purple-500 focus:border-purple-500"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-600 mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="flex items-center">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              checked={formData.remember}
              onChange={handleChange}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded shadow"
          >
            Sign Up
          </button>

          <div className="text-sm text-right mt-2">
            <a href="/login" className="text-purple-600 hover:underline">
              Already have an account? Sign in
            </a>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;
