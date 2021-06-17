import React, { useEffect, useRef } from "react";
import "./Modal.scss";

export const Modal: React.FC<IModal> = ({
  children,
  isShow,
  className,
  setIsShow,
  backgroundColorOverlay,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isShow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isShow]);
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
    <div
      className={isShow ? "modal modal--show" : "modal"}
      style={{ backgroundColor: backgroundColorOverlay }}
    >
      <div className={`modal__container ${className}`} ref={ref}>
        {children}
      </div>
    </div>
  );
};
