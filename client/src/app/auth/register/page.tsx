"use client";

import React, { useState } from "react";
import { useRegisterMutation } from "../../../../redux/API/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [register, { isLoading }] = useRegisterMutation();
  //todo
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
        confirmPassword: formData.confirmPassword,
      }).unwrap();
      setSubmitSuccess(true);
      setSubmitError("");
      router.push("/main/dashboard");
    } catch (err: any) {
      setSubmitError(err?.data?.message || "An error occurred");
      console.log(err);
      setSubmitSuccess(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4 min-h-screen">
      <div className="w-full max-w-md bg-card shadow-lg rounded-lg overflow-hidden border border-border">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-slate-300 p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/10">
            <Lock className="text-primary-foreground" size={20} />
          </div>
          <h2 className="mt-4 text-xl font-bold text-primary-foreground">
            Create Your Account
          </h2>
          <p className="text-primary-foreground/80 mt-1 text-sm">
            Manage your systems easly
          </p>
        </div>

        {/* Form */}
        <div className="px-6 py-6">
          {/* Error message */}
          {submitError && (
            <div className="mb-4 flex items-start rounded-lg bg-destructive/10 p-3 text-destructive text-sm border border-destructive/20">
              <p className="flex-1">{submitError}</p>
              <button
                onClick={() => setSubmitError("")}
                className="ml-2 text-destructive hover:opacity-80"
              >
                ×
              </button>
            </div>
          )}

          {/* Success message */}
          {submitSuccess && (
            <div className="mb-4 flex items-start rounded-lg bg-emerald-50 dark:bg-emerald-900/20 p-3 text-emerald-600 dark:text-emerald-300 text-sm border border-emerald-200 dark:border-emerald-800">
              <p className="flex-1">
                Registration successful! You can now log in.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="ml-2 text-emerald-600 dark:text-emerald-400 hover:opacity-80"
              >
                ×
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-foreground">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 bg-card border-border focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 bg-card border-border focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-foreground">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 bg-card border-border focus:ring-primary focus:border-primary"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-slate-300 text-primary-foreground hover:from-primary/90 hover:to-blue-600/90"
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

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="font-medium text-primary hover:text-primary/80 hover:underline"
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
