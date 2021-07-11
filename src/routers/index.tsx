import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import {
  CreateClass,
  CreateCourse,
  DetailStudent,
  DetailTeacher,
  HistoryAttendance,
  ListAttendance,
  ListClass,
  ListClassTeaching,
  ListCourses,
  ListImageAttendance,
  ListStudent,
  ListTeacher,
  Login,
  ScheduleStudentPage,
  StatisticalClass,
  UpdateAdmin,
  UpdateStudent,
  UpdateTeacher,
  ListParent,
  CreateParent,
  DetailParent,
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
          path="/liststudent/:idClass?"
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
        <PrivateRouter
          component={<StatisticalClass />}
          exact={true}
          path="/statisticalClass"
          isHasSideBar={true}
        />
        <PrivateRouter
          component={<HistoryAttendance />}
          exact={true}
          path="/historyAttendance/:idStudent/:idClass"
          isHasSideBar={true}
        />
        <PrivateRouter
          component={<ListParent />}
          exact={true}
          path="/listparent"
          isHasSideBar={true}
        />
        <PrivateRouter
          component={<CreateParent />}
          exact={true}
          path="/createparent/:idParent?"
          isHasSideBar={true}
        />
        <PrivateRouter
          component={<DetailParent />}
          exact={true}
          path="/detailparent/:idParent"
          isHasSideBar={true}
        />
      </Switch>
    </Router>
  );
};
