import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./sidebarData.js";
import "./Sidebar.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer/index.js";
export const SideBar: React.FC<ISideBar> = ({ isOpen, openSideBar }) => {
  const [categoryAccount, setCategoryAccount] = useState("");
  // const history = useHistory();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  // console.log("currentUser", currentUser);
  useEffect(() => {
    if (currentUser.roles) {
      setCategoryAccount(currentUser.roles[0].name);
    }
  }, [currentUser.roles]);
  const Role = () => {
    let x = [];
    if (categoryAccount === "") return "";
    else {
      if (categoryAccount === "ROLE_ADMIN") {
        x = SidebarData.admin;
      } else {
        if (categoryAccount === "ROLE_STUDENT") {
          x = SidebarData.student;
        } else {
          if (categoryAccount === "ROLE_TEACHER") {
            x = SidebarData.teacher;
          } else {
            x = SidebarData.parent;
          }
        }
      }
    }
    return x.map(function (item, index) {
      return (
        <li
          key={index}
          className={item.cName}
          // onClick={() => history.push(item.path)}
        >
          <Link to={item.path}>
            <span>{item.title}</span>
          </Link>
        </li>
      );
    });
  };
  return (
    <nav className={isOpen ? "sidebar sidebar--active" : "sidebar"}>
      <ul className="sidebar__list" onClick={openSideBar}>
        <li className="sidebar__toggle">
          <Link to="#" className="sidebar__icon">
            <AiIcons.AiOutlineClose />
          </Link>
        </li>
        {Role()}
      </ul>
    </nav>
  );
};
