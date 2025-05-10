import React from "react";
import IconInputField from "../00-atoms/IconInputField";

interface FormFieldProps {
  label?: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  icon,
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <IconInputField
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        icon={icon}
      />
    </div>
  );
};

export default FormField;