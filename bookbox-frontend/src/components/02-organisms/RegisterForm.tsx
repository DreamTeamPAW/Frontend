"use client";

import React, { useState } from "react";
import FormField from "../01-molecules/FormField";
import Button from "../00-atoms/Button";
import { User, Lock } from "@phosphor-icons/react/dist/ssr"; 
import { primaryButtonStyle, tertiaryTextLabelStyle} from "@/styles/classes";
import Link from "next/link";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Repeat Password:", repeatPassword);
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

        <Link href="/login" className = {`${tertiaryTextLabelStyle} pl-1`}>Already have an account? Log in</Link>
      {/* Submit Button */}
      <Button type="submit" className = {`${primaryButtonStyle} mt-4`}>
        Sign in
      </Button>
    </form>
  );
};

export default LoginForm;
