import React from "react";
import { Header } from "../../components/common";
import "./BlankLayout.scss";

export const BlankLayout: React.FC<IBlankLayout> = ({ children }) => {
  return (
    <div className="blank-layout">
      <div className="blank-layout__header">
        <Header sidebar={false} />
      </div>

      <div className="blank-layout__children">{children}</div>
    </div>
  );
};
