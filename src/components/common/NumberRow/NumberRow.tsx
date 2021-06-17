import React, { useEffect, useState } from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import "./NumberRow.scss";

export const NumberRow: React.FC<INumberRow> = ({ changeNumber }) => {
  const [isShow, setIsShow] = useState(false);
  const [selected, setSelected] = useState(10);
  const handleSelectNumRow = (value: any) => {
    setSelected(value);
    setIsShow(false);
  };
  useEffect(() => {
    changeNumber(selected);
  }, [selected]);
  return (
    <div className="number-row">
      <div className="number-row__content">
        <div
          className={`number-row__header`}
          onClick={() => setIsShow(!isShow)}
        >
          {selected}
          <MdKeyboardArrowUp className="number-row__icon number-row__icon--up" />
          <MdKeyboardArrowDown className="number-row__icon number-row__icon--down" />
        </div>
        <div
          className={`number-row__body ${
            isShow === false ? "number-row__body--hidden" : ""
          }`}
        >
          <div
            className="number-row__item"
            onClick={() => handleSelectNumRow(10)}
          >
            10
          </div>
          <div
            className="number-row__item"
            onClick={() => handleSelectNumRow(15)}
          >
            15
          </div>
          <div
            className="number-row__item"
            onClick={() => handleSelectNumRow(20)}
          >
            20
          </div>
        </div>
      </div>
      {/* <span>Show</span> */}
    </div>
  );
};
