import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import {
  CreateClass,
  CreateCourse,
  DetailStudent,
  ListClass,
  ListCourses,
  ListStudent,
  ListTeacher,
  Login,
  ScheduleStudentPage,
  UpdateAdmin,
  UpdateStudent,
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
          component={<p>hello</p>}
          exact={true}
          path="/user"
          isHasSideBar={true}
        />
        <PrivateRouter
          component={<DetailStudent />}
          exact={true}
          path="/detailstudent"
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
          path="/updatestudent"
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
          path="/listclass"
          isHasSideBar={true}
        />
        <PrivateRouter
          component={<CreateClass />}
          exact={true}
          path="/createclass"
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
      </Switch>
    </Router>
  );
};
