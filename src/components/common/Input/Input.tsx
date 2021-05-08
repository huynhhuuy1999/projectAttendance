import React from "react";
import "./Input.scss";

export const Input: React.FC<IInput> = ({
  isLabel,
  label,
  value,
  classNameInput,
  onChange,
  placeholder,
  type,
  classNameLabel,
  HTMLFor,
  autoComplete,
  id,
  name,
}) => {
  return (
    <div>
      {isLabel ? (
        <label className={`label ${classNameLabel}`} htmlFor={HTMLFor}>
          {label}
        </label>
      ) : (
        <></>
      )}
      <input
        id={id}
        autoComplete={autoComplete}
        type={type}
        value={value}
        name={name}
        className={`input ${classNameInput}`}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
