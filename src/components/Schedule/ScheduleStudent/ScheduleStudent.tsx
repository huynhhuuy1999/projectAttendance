import React from "react";
import "./ScheduleStudent.scss";

export const ScheduleStudent: React.FC<IScheduleStudent> = ({ data }) => {
  const listRender = () => {
    let contentTable = [];
    for (let lesson = 1; lesson <= 10; lesson++) {
      let contentRow = [];
      for (let day = 1; day <= 7; day++) {
        let flag = false;
        if (day === 1) {
          contentRow.push(
            <td className="schedule-student__lession">Tiết {lesson}</td>
          );
        } else {
          data.map((item: any) => {
            if (item.day === day) {
              let y = [...item.content];
              y.map((itemm, indexx) => {
                if (itemm.start < lesson && itemm.end >= lesson) flag = true;
                if (itemm.start === lesson) {
                  flag = true;
                  contentRow.push(
                    <td
                      rowSpan={itemm.end - itemm.start + 1}
                      key={indexx}
                      className="schedule-student__item"
                    >
                      {itemm.subject}
                    </td>
                  );
                }
              });
            }
          });
          if (!flag) {
            contentRow.push(<td></td>);
          }
        }
      }
      contentTable.push(<tr>{contentRow}</tr>);
    }
    return contentTable;
  };
  return (
    <div className="schedule-student">
      <table className="schedule-student__table">
        <thead>
          <tr className="schedule-student__header">
            <th>Thứ/Tiết</th>
            <th>Thứ 2</th>
            <th>Thứ 3</th>
            <th>Thứ 4</th>
            <th>Thứ 5</th>
            <th>Thứ 6</th>
            <th>Thứ 7</th>
          </tr>
        </thead>
        <tbody>{listRender()}</tbody>
      </table>
    </div>
  );
};
