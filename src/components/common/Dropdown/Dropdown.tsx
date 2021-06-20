import React, { useEffect, useRef, useState } from "react";
import "./Dropdown.scss";

export const Dropdown: React.FC<IDropdown> = ({
  data,
  className,
  onChange,
  placeholder,
  error,
  value,
  defaultValue,
}) => {
  const [isShow, setIsShow] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(placeholder);
  const ref = useRef<HTMLDivElement>(null);
  const handleSelectItem = (value: any) => {
    setSelectedLabel(value.name);
    setIsShow(false);
    return onChange(value);
  };
  useEffect(() => {
    if (defaultValue) {
      setSelectedLabel(defaultValue.name);
    }
  }, []);
  useEffect(() => {
    if (isShow) {
      const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsShow(false);
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [ref, isShow]);
  useEffect(() => {
    function handleSetLabel(value?: string) {
      setSelectedLabel(value);
    }
    if (value) {
      let selected = data.find((item) => item.id === value);
      handleSetLabel(selected?.name);
    }
  }, [value]);
  return (
    <div className={`dropdown ${className}`}>
      <div className="dropdown__header" onClick={() => setIsShow(!isShow)}>
        {selectedLabel}
      </div>
      {error !== "" ? <span className="dropdown__error">{error}</span> : null}
      <div
        className={`dropdown__body ${isShow ? "" : "dropdown__body--hidden"}`}
        ref={ref}
      >
        {data.map((item, index) => {
          return (
            <div
              className="dropdown__item"
              onClick={() => handleSelectItem(item)}
              key={index}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};
