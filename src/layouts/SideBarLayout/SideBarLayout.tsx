import { useState } from "react";
import React from "react";
import { Header, SideBar } from "../../components/common";
import "./SideBarLayout.scss";

export const SibarLayout: React.FC<ISibarLayout> = ({ children }) => {
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  const handleOpenSidebar = () => {
    setIsShowSidebar(!isShowSidebar);
  };
  return (
    <div className="sidebar-layout">
      <div className="sidebar-layout__header">
        <Header
          sidebar={true}
          openSideBar={() => handleOpenSidebar()}
          isOpen={isShowSidebar}
        />
      </div>

      <SideBar isOpen={isShowSidebar} openSideBar={() => handleOpenSidebar()} />
      <div className="sidebar-layout__children">{children}</div>
    </div>
  );
};
