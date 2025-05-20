"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "@components/01-molecules/FormField";
import Button from "@components/00-atoms/Button";
import { User, Lock } from "@phosphor-icons/react/dist/ssr";
import { primaryButtonStyle, tertiaryTextLabelStyle } from "@/styles/classes";
import Link from "next/link";
import { register } from "@/services/authService"
import { toast } from "react-toastify";


const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !username || !password || !repeatPassword) {
      toast.error("All fields must be filled.");
      return;
    }

    if (password !== repeatPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await register({
        email,
        username,
        password,
      });
      router.push("/login");
    } catch (err: any) {
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

      {/* Username Field */}
      <FormField
        type="username"
        placeholder="Username"
        //className="w-s"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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

      {/*Repeat Password Field */}
      <FormField
        type="password"
        placeholder="Repeat password"
        //className="w-s"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        icon={<Lock size={18} weight="fill" className="text-gray-500" />}
      />

      <Link href="/login" className={`${tertiaryTextLabelStyle} pl-1`}>Already have an account? Log in</Link>
      {/* Submit Button */}
      <Button type="submit" className={`${primaryButtonStyle} mt-4 w-lg`}>
        Sign in
      </Button>
    </form>
  );
};

export default RegisterForm;
