"use client";

import React, { useState } from "react";
import FormField from "../01-molecules/FormField";
import Button from "../00-atoms/Button";
import { User, Lock } from "@phosphor-icons/react/dist/ssr"; 
import { primaryButtonStyle, tertiaryTextLabelStyle} from "@/styles/classes";
import Link from "next/link";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
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
        <Link href="/recovery" className = {`${tertiaryTextLabelStyle} pl-1`}>Forgot password</Link>
      {/* Submit Button */}
      <Button type="submit" className = {`${primaryButtonStyle} mt-4`}>
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;
