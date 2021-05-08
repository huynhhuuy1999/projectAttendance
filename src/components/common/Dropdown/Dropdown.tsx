import React, { useEffect, useRef, useState } from "react";
import "./Dropdown.scss";

export const Dropdown: React.FC<IDropdown> = ({
  data,
  className,
  onChange,
}) => {
  const [isShow, setIsShow] = useState(false);
  const [selectedValue, setSelectedValue] = useState(data[0].value);
  const [selectedLabel, setSelectedLabel] = useState(data[0].label);
  const ref = useRef<HTMLDivElement>(null);
  const handleSelectItem = (value: any) => {
    setSelectedValue(value.value);
    setSelectedLabel(value.label);
    setIsShow(false);
    return onChange(value);
  };
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
  return (
    <div className={`dropdown ${className}`}>
      <div className="dropdown__header" onClick={() => setIsShow(!isShow)}>
        {selectedLabel}
      </div>
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
              {item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};
