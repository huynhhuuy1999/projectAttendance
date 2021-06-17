import React from "react";
import { Modal } from "../Modal/Modal";
import { HiCheckCircle } from "react-icons/hi";
import "./NotiSuccess.scss";
import { Color } from "../../../constants";
import { Button } from "../Button/Button";

export const NotiSuccess: React.FC<INotiSuccess> = ({
  isShow,
  setIsShow,
  message,
  onClick,
}) => {
  return (
    <Modal isShow={isShow} setIsShow={setIsShow}>
      <div className="noti-success__modal">
        <p className="noti-success__noti-success">{message}</p>
        <HiCheckCircle
          color={Color.Blue}
          className="noti-success__icon"
          size={30}
        />
        <Button color={Color.Blue} width={100} onClick={onClick}>
          Xong
        </Button>
      </div>
    </Modal>
  );
};
