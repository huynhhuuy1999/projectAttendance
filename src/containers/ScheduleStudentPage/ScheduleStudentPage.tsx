import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScheduleStudent } from "../../components";
import { Banner, Button, Dropdown } from "../../components/common";
import { Color } from "../../constants";
import { doGetTimetableStudent } from "../../redux/action";
import { RootState } from "../../redux/rootReducer";
import "./ScheduleStudentPage.scss";

export const ScheduleStudentPage = () => {
  const dispatch = useDispatch();
  const timetableStudent = useSelector(
    (state: RootState) => state.student.timeTableStudent
  );
  // const [timeTable, setTimeTable] = useState([]);
  useEffect(() => {
    dispatch(
      doGetTimetableStudent({
        userId: "17521284",
        year: 2020,
        semester: 2,
      })
    );
  }, []);
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
    { name: "2019-2020", id: 1 },
    { name: "2020-2021", id: 2 },
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
            onChange={(value: any) => console.log(value)}
          />
        </div>
        <div className="schedule-student-ctn__year">
          <span>Năm học</span>
          <Dropdown
            placeholder="Chọn năm học"
            data={listYear}
            className="schedule-student-ctn__dropdown"
            onChange={(value: any) => console.log(value)}
          />
        </div>
        <Button color={Color.Blue} className="schedule-student-ctn__btn">
          Xem
        </Button>
      </div>
      <div className="schedule-student-ctn__schedule">
        <ScheduleStudent data={timetableStudent} />
      </div>
    </div>
  );
};
