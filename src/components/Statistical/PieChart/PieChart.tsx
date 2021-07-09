import React from "react";
import { Pie } from "react-chartjs-2";
import "./PieChart.scss";

export const PieChart: React.FC<IPieChart> = ({ data, className, title }) => {
  return (
    <div className={`PieChart ${className}`}>
      <Pie type="" data={data} />
      <span className="PieChart__title">{title}</span>
    </div>
  );
};
