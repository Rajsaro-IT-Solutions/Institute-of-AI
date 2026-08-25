"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import AuthField from "@/features/authentication/components/AuthField";

type PasswordInputProps = {
  autoComplete?: string;
  error?: string;
  hint?: string;
  id?: string;
  label: string;
  name: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
};

export default function PasswordInput({
  autoComplete,
  error,
  hint,
  id,
  label,
  name,
  onBlur,
  onChange,
  placeholder,
  value,
}: Readonly<PasswordInputProps>) {
  const [visible, setVisible] = useState(false);

  return (
    <AuthField
      autoComplete={autoComplete}
      error={error}
      hint={hint}
      id={id}
      label={label}
      name={name}
      onBlur={onBlur}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      rightSlot={
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="text-slate-400 transition-colors hover:text-slate-600"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      }
      type={visible ? "text" : "password"}
      value={value}
    />
  );
}