import { Link, useHistory } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import testAvartar from "../../../assets/images/b20d01adf2eb02b55bfa.jpg";
import "./Header.scss";
import React from "react";
import { Avatar } from "../Avatar/Avatar";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { logout } from "../../../helper";
import { ImageAvatar } from "../../../constants/image";
export const Header: React.FC<IHeader> = ({ sidebar, openSideBar, isOpen }) => {
  const handleShowSideBar = () => {
    openSideBar();
  };
  const history = useHistory();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  console.log("currentUser", currentUser);
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
          {currentUser.id ? (
            // <Avatar image="https://picsum.photos/200/300" />
            <Avatar image={ImageAvatar} />
          ) : null}

          {currentUser.fullName ? (
            <span>{currentUser.fullName}</span>
          ) : (
            <span>Đăng nhập</span>
          )}
        </div>
        <div className="header__avatar-content">
          <div className="header__avatar-option">
            <a
              onClick={() => history.push("/updateadmin")}
              style={{ cursor: "pointer" }}
            >
              Thông tin
            </a>
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
