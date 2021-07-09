import React from "react";
import { Modal } from "../Modal/Modal";
import "./NotiFail.scss";
import { Color } from "../../../constants";
import { Button } from "../Button/Button";
import { IoMdCloseCircleOutline } from "react-icons/io";

export const NotiFail: React.FC<INotiSuccess> = ({
  isShow,
  setIsShow,
  message,
  onClick,
}) => {
  return (
    <Modal isShow={isShow} setIsShow={setIsShow}>
      <div className="noti-fail__modal">
        <p className="noti-fail__noti-fail">{message}</p>
        <IoMdCloseCircleOutline
          color={Color.Red}
          className="noti-fail__icon"
          size={30}
        />
        <Button color={Color.Blue} width={100} onClick={onClick}>
          Xong
        </Button>
      </div>
    </Modal>
  );
};
