import React, { FC } from "react";
import { Loader } from "../Loader/Loader";
import { Modal } from "../Modal/Modal";
import "./LoaderModal.scss";

export const LoaderModal: FC<ILoaderModal> = ({ isShow, color }) => {
  return (
    <Modal className="loader-modal" isShow={isShow}>
      <Loader color={color} />
    </Modal>
  );
};
