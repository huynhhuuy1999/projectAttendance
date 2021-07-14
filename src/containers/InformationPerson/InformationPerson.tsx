import React, { useEffect, useState } from "react";
import { Banner } from "../../components/common";
import { ROLE } from "../../constants";
import { doGetOneParent } from "../../redux/action";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import "./InformationPerson.scss";

export const InformationPerson = () => {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const [role, setRole] = useState(0);
  const [idParent, setIdParent]: any = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentUser.id) {
      if (currentUser.roles[0].id === ROLE.STUDENT) {
        setIdParent(currentUser.parentId);
      }
      setRole(currentUser.roles[0].id);
    }
  }, [currentUser]);
  useEffect(() => {
    if (role === ROLE.STUDENT && idParent) {
      dispatch(doGetOneParent(idParent));
    }
  }, [role, idParent]);
  return (
    <div className="InformationPerson">
      <Banner title="Thông tin cá nhân" />
      <div className="InformationPerson__content">
        <div className="InformationPerson__item">
          <span className="bold">Mã ID:</span>
          <span className="margin-left">{currentUser.id}</span>
        </div>
        <div className="InformationPerson__item">
          <span className="bold">Họ tên:</span>
          <span className="margin-left">{currentUser.fullName}</span>
        </div>
        <div className="InformationPerson__item">
          <span className="bold">Số điện thoại:</span>
          <span className="margin-left">{currentUser.phone}</span>
        </div>
        <div className="InformationPerson__item">
          <span className="bold">Email:</span>
          <span className="margin-left">{currentUser.email}</span>
        </div>
        <div className="InformationPerson__item">
          <span className="bold">Địa chỉ:</span>
          <span className="margin-left">{currentUser.address}</span>
        </div>
        {role === ROLE.PARENT ? null : (
          <>
            <div className="InformationPerson__item">
              <span className="bold">Họ tên phụ huynh:</span>
              <span className="margin-left"></span>
            </div>
            <div className="InformationPerson__item">
              <span className="bold">Số điện thoại:</span>
              <span className="margin-left">SV0001</span>
            </div>
            <div className="InformationPerson__item">
              <span className="bold">Email phụ huynh:</span>
              <span className="margin-left">SV0001</span>
            </div>
            <div className="InformationPerson__item">
              <span className="bold">Địa chỉ phụ huynh:</span>
              <span className="margin-left">SV0001</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
