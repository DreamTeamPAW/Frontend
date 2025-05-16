"use client";
import React, { useState } from "react";
import FormField from "@components/01-molecules/FormField";
import Button from "@components/00-atoms/Button";
import { User, Lock } from "@phosphor-icons/react/dist/ssr";
import { primaryButtonStyle, tertiaryTextLabelStyle } from "@/styles/classes";
import Link from "next/link";

import { login } from "@/services/authService";
import { useRouter } from "next/navigation";


const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    try {
      const response = await login({ email, password });

      setSuccess("Login successful! Redirecting...");
      setError(null);

      router.push("/home");

    } catch (err: any) {
      setError(err.message + ". Invalid email or password.");
      setSuccess(null);
    }

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email Field */}
      <FormField
        type="email"
        placeholder="Email"
        //className="w-s"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<User size={18} weight="fill" className="text-gray-500" />}
      />

      {/* Password Field */}
      <FormField
        type="password"
        placeholder="Password"
        //className="w-s"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={<Lock size={18} weight="fill" className="text-gray-500" />}
      />
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <Link href="/recovery" className={`${tertiaryTextLabelStyle} pl-1`}>Forgot password</Link>

      {/* Submit Button */}
      <Button type="submit" className={`${primaryButtonStyle} mt-4 w-lg`}>
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;
