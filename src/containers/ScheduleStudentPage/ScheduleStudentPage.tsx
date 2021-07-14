import React, { useEffect } from "react";
import { useState } from "react";
import { number, string } from "yup/lib/locale";
import { ScheduleStudent } from "../../components";
import { Banner, Button, Dropdown } from "../../components/common";
import { Color, ROLE } from "../../constants";
import { doGetTimetableStudent } from "../../redux/action";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import "./ScheduleStudentPage.scss";

export const ScheduleStudentPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.currentUser);
  const timetableStudent = useAppSelector(
    (state) => state.student.timeTableStudent
  );
  const [year, setYear] = useState(2020);
  const [semester, setSemester] = useState(2);
  const handleViewListTimeTable = () => {
    dispatch(
      doGetTimetableStudent({
        userId: user.id,
        year: year,
        semester: semester,
      })
    );
  };

  useEffect(() => {
    if (user.id) {
      if (user.roles[0].id === ROLE.STUDENT) {
        dispatch(
          doGetTimetableStudent({
            userId: user.id,
            year: year,
            semester: semester,
          })
        );
      }
      if (user.roles[0].id === ROLE.PARENT) {
        dispatch(
          doGetTimetableStudent({
            userId: "17521284",
            year: year,
            semester: semester,
          })
        );
      }
    }
  }, [user]);

  const listSemester = [
    { name: "Học kì 1", id: 1 },
    { name: "Học kì 2", id: 2 },
  ];
  const listYear = [
    { name: "2018-2019", id: 2018 },
    { name: "2019-2020", id: 2019 },
    { name: "2020-2021", id: 2020 },
  ];
  return (
    <div className="schedule-student-ctn">
      <Banner title="Thời khóa biểu" />
      <div className="schedule-student-ctn__header">
        <div className="schedule-student-ctn__semester">
          <span>Học kì</span>
          <Dropdown
            placeholder="Chọn học kì"
            data={listSemester}
            className="schedule-student-ctn__dropdown"
            onChange={(value: any) => setSemester(value.id)}
            defaultValue={{ id: 2, name: "Học kì 2" }}
          />
        </div>
        <div className="schedule-student-ctn__year">
          <span>Năm học</span>
          <Dropdown
            placeholder="Chọn năm học"
            data={listYear}
            className="schedule-student-ctn__dropdown"
            onChange={(value: any) => setYear(value.id)}
            defaultValue={{ id: 2020, name: "2020-2021" }}
          />
        </div>
        <Button
          color={Color.Blue}
          className="schedule-student-ctn__btn"
          onClick={() => handleViewListTimeTable()}
        >
          Xem
        </Button>
      </div>
      <div className="schedule-student-ctn__schedule">
        <ScheduleStudent
          data={timetableStudent}
          // idStudent={user?.roles[0].id === ROLE.PARENT ? "17521284" : user.id}
          idStudent={
            user.id
              ? user.roles[0].id === ROLE.PARENT
                ? "17521284"
                : user.id
              : ""
          }
        />
      </div>
    </div>
  );
};
