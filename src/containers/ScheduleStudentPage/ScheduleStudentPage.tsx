import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScheduleStudent } from "../../components";
import { Banner, Button, Dropdown } from "../../components/common";
import { RootState } from "../../redux/rootReducer";
import { doGetTimetableStudent } from "../../redux/slice";
import "./ScheduleStudentPage.scss";

export const ScheduleStudentPage = () => {
  const dispatch = useDispatch();
  const timetableStudent = useSelector(
    (state: RootState) => state.user.timeTableStudent
  );
  const [timeTable, setTimeTable] = useState([]);
  useEffect(() => {
    dispatch(
      doGetTimetableStudent({
        userId: "17521224",
        year: 2020,
        semester: 2,
      })
    );
  }, []);
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
  const listTKB = [
    {
      day: 2,
      content: [
        { start: 2, end: 3, subject: "Hệ điều hành" },
        { start: 5, end: 8, subject: "Web" },
      ],
    },
    {
      day: 3,
      content: [
        { start: 1, end: 3, subject: "Hệ điều hành" },
        { start: 7, end: 9, subject: "Web" },
      ],
    },
    {
      day: 7,
      content: [{ start: 4, end: 9, subject: "Web" }],
    },
  ];
  const listSemester = [
    { label: "Học kì 1", value: 1 },
    { label: "Học kì 2", value: 2 },
  ];
  const listYear = [
    { label: "2019-2020", value: 1 },
    { label: "2020-2021", value: 2 },
  ];
  return (
    <div className="schedule-student-ctn">
      <Banner title="Thời khóa biểu" />
      <div className="schedule-student-ctn__header">
        <div className="schedule-student-ctn__semester">
          <span>Học kì</span>
          <Dropdown
            data={listSemester}
            className="schedule-student-ctn__dropdown"
            onChange={(value: any) => console.log(value)}
          />
        </div>
        <div className="schedule-student-ctn__year">
          <span>Năm học</span>
          <Dropdown
            data={listYear}
            className="schedule-student-ctn__dropdown"
            onChange={(value: any) => console.log(value)}
          />
        </div>
        <Button isSecondaryBtn={true} className="schedule-student-ctn__btn">
          Xem
        </Button>
      </div>
      <div className="schedule-student-ctn__schedule">
        <ScheduleStudent data={listTKB} />
      </div>
    </div>
  );
};
