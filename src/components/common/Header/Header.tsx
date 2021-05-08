import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import testAvartar from "../../../assets/images/b20d01adf2eb02b55bfa.jpg";
import "./Header.scss";
import React from "react";
import { Avatar } from "../Avatar/Avatar";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { spawn } from "node:child_process";
import { logout } from "../../../helper";
export const Header: React.FC<IHeader> = ({ sidebar, openSideBar, isOpen }) => {
  const handleShowSideBar = () => {
    openSideBar();
  };
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  return (
    <div className="header">
      {sidebar === false ? (
        <div></div>
      ) : (
        <Link
          to="#"
          className={
            isOpen ? "header__icon header__icon--active" : "header__icon"
          }
        >
          <FaIcons.FaBars
            onClick={() => handleShowSideBar()}
            className={isOpen === false ? "display" : "hidden"}
          />
        </Link>
      )}

      <div className="header__avatar">
        <div className="header__avatar-div">
          <Avatar image={testAvartar} />
          {currentUser.fullName ? (
            <span>{currentUser.fullName}</span>
          ) : (
            <span>Đăng nhập</span>
          )}
        </div>
        <div className="header__avatar-content">
          <div className="header__avatar-option">
            <a href="#">Thông tin</a>
          </div>
          <div className="header__avatar-option header__avatar-option--radius">
            <a href="" onClick={() => logout()}>
              Đăng xuất
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
