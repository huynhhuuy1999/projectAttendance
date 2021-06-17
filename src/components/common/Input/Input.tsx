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
  error,
  disable,
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
        disabled={disable}
        // min={type === "date" ? "1997-01-01" : ""}
        // max={type === "date" ? "2030-12-31" : ""}
      />
      {error !== "" ? <span className="input__error">{error}</span> : null}
    </div>
  );
};
