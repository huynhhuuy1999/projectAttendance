import React, { useEffect } from "react";
import { useState } from "react";
import { number, string } from "yup/lib/locale";
import { ScheduleStudent } from "../../components";
import { Banner, Button, Dropdown } from "../../components/common";
import { Color } from "../../constants";
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
    dispatch(
      doGetTimetableStudent({
        userId: user.id,
        year: year,
        semester: semester,
      })
    );
  }, [user]);

  // console.log(timetableStudent);
  // useEffect(() => {
  //   if(timetableStudent){
  //     let newArrTimeTable = [];
  //     timetableStudent.timeTableCourses.map((item:IResponseTimeTableCourses)=>{
  //       let object = {
  //         day:item.dayOfWeek,
  //         content:[]
  //       }
  //     })
  //   }
  // }, [timetableStudent]);

  // const listTKB = [
  //   {
  //     day: 2,
  //     content: [
  //       { start: 2, end: 3, subject: "Hệ điều hành" },
  //       { start: 5, end: 8, subject: "Web" },
  //     ],
  //   },
  //   {
  //     day: 3,
  //     content: [
  //       { start: 1, end: 3, subject: "Hệ điều hành" },
  //       { start: 7, end: 9, subject: "Web" },
  //     ],
  //   },
  //   {
  //     day: 7,
  //     content: [{ start: 4, end: 9, subject: "Web" }],
  //   },
  // ];

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
            defaultValue={{ id: 1, name: "Học kì 1" }}
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
        <ScheduleStudent data={timetableStudent} />
      </div>
    </div>
  );
};
