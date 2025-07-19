"use client";

import React, { useState } from "react";
import { useRegisterMutation } from "../../../../redux/API/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils"; // optional, if you're using `cn()` helper

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [register, { isLoading }] = useRegisterMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setSubmitError("Passwords don't match");
      return;
    }

    try {
      await register({
        username: formData.username,
        password: formData.password,
      }).unwrap();
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
    <div className="w-full sm:w-[50%] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 min-h-screen">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/20 shadow-lg">
            <Lock className="text-white" size={20} />
          </div>
          <h2 className="mt-3 text-xl font-bold text-white">
            Create Your Account
          </h2>
          <p className="text-blue-100 mt-1 text-sm">Join our community today</p>
        </div>

        {/* Form */}
        <div className="px-6 py-8">
          {/* Error message */}
          {submitError && (
            <div className="mb-4 flex items-start rounded-lg bg-red-100 p-3 text-red-800 text-sm justify-between">
              <p>{submitError}</p>
              <button
                onClick={() => setSubmitError("")}
                className="ml-2 text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </div>
          )}

          {/* Success message */}
          {submitSuccess && (
            <div className="mb-4 flex items-start rounded-lg bg-green-100 p-3 text-green-800 text-sm justify-between">
              <p>Registration successful! You can now log in.</p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:brightness-105"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Creating Account...
                </span>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
