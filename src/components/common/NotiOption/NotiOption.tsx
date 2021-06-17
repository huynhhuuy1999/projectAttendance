import React from "react";
import { Color } from "../../../constants";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import "./NotiOption.scss";

export const NotiOption: React.FC<INotiOption> = ({
  btnLeft,
  btnRight,
  isShow,
  message,
  onClickBtnLeft,
  onClickBtnRight,
  setIsShow,
}) => {
  return (
    <Modal isShow={isShow} setIsShow={setIsShow}>
      <div className="noti-option__modal">
        <span className="noti-option__noti">{message}</span>
        <div className="noti-option__group-btn">
          <Button color={Color.Blue} onClick={onClickBtnLeft} width={100}>
            {btnLeft}
          </Button>
          <Button
            marginLeft={20}
            color={Color.Yellow}
            onClick={onClickBtnRight}
            width={100}
          >
            {btnRight}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
