import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import {
  CreateClass,
  CreateCourse,
  DetailStudent,
  DetailTeacher,
  ListAttendance,
  ListClass,
  ListClassTeaching,
  ListCourses,
  ListImageAttendance,
  ListStudent,
  ListTeacher,
  Login,
  ScheduleStudentPage,
  UpdateAdmin,
  UpdateStudent,
  UpdateTeacher,
} from "../containers";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";
export * from "./PrivateRouter";

export const Routers = () => {
  return (
    <Router>
      <Switch>
        <PublicRouter component={<Login />} exact={true} path="/" />
        <PrivateRouter
          component={<DetailStudent />}
          exact={true}
          path="/detailstudent/:idStudent"
          isHasSideBar={true}
        />
        <PrivateRouter
          component={<DetailTeacher />}
          exact={true}
          path="/detailteacher/:idTeacher"
          isHasSideBar={true}
        />
        <PrivateRouter
          component={<ListStudent />}
          exact={true}
          path="/liststudent"
          isHasSideBar={true}
        />
        <PrivateRouter
          component={<ScheduleStudentPage />}
          exact={true}
          path="/schedulestudent"
          isHasSideBar={true}
        />
        <PrivateRouter
          component={<UpdateStudent />}
          exact={true}
          path="/updatestudent/:idStudent?"
          isHasSideBar={true}
        />
        <PrivateRouter
          component={<UpdateTeacher />}
          exact={true}
          path="/updateteacher/:idTeacher?"
          isHasSideBar={true}
        />
        <PrivateRouter
          component={<ListCourses />}
          exact={true}
          path="/listcourses"
          isHasSideBar={true}
        />
        <PrivateRouter
          component={<CreateCourse />}
          exact={true}
          path="/createcourse"
          isHasSideBar={true}
        />
        <PrivateRouter
          component={<ListClass />}
          exact={true}
          path="/listclass/:idCourse?"
          isHasSideBar={true}
        />
        <PrivateRouter
          component={<CreateClass />}
          exact={true}
          path="/createclass/:idClass?"
          isHasSideBar={true}
        />
        <PrivateRouter
          component={<UpdateAdmin />}
          exact={true}
          path="/updateadmin"
          isHasSideBar={true}
        />
        <PrivateRouter
          component={<ListTeacher />}
          exact={true}
          path="/listteacher"
          isHasSideBar={true}
        />
        <PrivateRouter
          component={<ListAttendance />}
          exact={true}
          path="/listAttendance"
          isHasSideBar={true}
        />
        <PrivateRouter
          component={<ListImageAttendance />}
          exact={true}
          path="/listImageAttendance/:id"
          isHasSideBar={true}
        />
        <PrivateRouter
          component={<ListClassTeaching />}
          exact={true}
          path="/listclassteaching"
          isHasSideBar={true}
        />
      </Switch>
    </Router>
  );
};
