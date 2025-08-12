"use client";

import React, { useState } from "react";
import { useLoginMutation } from "../../../../redux/API/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    try {
      await login({
        username: formData.username,
        password: formData.password,
      }).unwrap();
      setSubmitSuccess(true);
      const date = new Date();
      date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000); // 1 day
      document.cookie = `auth-token=true; expires=${date.toUTCString()}; path=/`;
      router.push("/main/dashboard");
    } catch (err: any) {
      setSubmitError(err?.data?.message);
      setSubmitSuccess(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4 min-h-screen bg-gradient-to-r from-background to-slate-700">
      <div className="w-full max-w-md bg-card/90 backdrop-blur-sm shadow-xl rounded-lg overflow-hidden border border-border/20">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-slate-400 p-8 text-center relative">
          <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/10 backdrop-blur-sm">
            <Lock className="text-primary-foreground" size={24} />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-primary-foreground">
            Welcome Back
          </h2>
          <p className="text-primary-foreground/80 mt-2 text-sm">
            Sign in to your account
          </p>
        </div>

        {/* Form */}
        <div className="px-6 py-6">
          {/* Error message */}
          {submitError && (
            <div className="mb-4 flex items-center rounded-lg bg-destructive/10 p-4 text-destructive text-sm border border-destructive/20">
              <AlertCircle className="mr-2 h-5 w-5" />
              <p className="flex-1">{submitError}</p>
              <button
                onClick={() => setSubmitError("")}
                className="ml-2 text-destructive hover:opacity-80"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* Success message */}
          {submitSuccess && (
            <div className="mb-4 flex items-center rounded-lg bg-emerald-50 dark:bg-emerald-900/20 p-4 text-emerald-600 dark:text-emerald-300 text-sm border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="mr-2 h-5 w-5" />
              <p className="flex-1">Login successful! Redirecting...</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-foreground/80">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 bg-background border-border/50 focus:border-primary/50 focus:ring-primary/20"
                required
                autoFocus
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-foreground/80">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 bg-background border-border/50 focus:border-primary/50 focus:ring-primary/20"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-slate-300 text-primary-foreground hover:from-primary/90  shadow-md hover:shadow-primary/20 transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="mr-2 h-4 w-4 animate-spin text-white"
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
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a
              href="/auth/register"
              className="font-medium text-primary hover:text-primary/80 hover:underline transition-colors"
            >
              Create account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
