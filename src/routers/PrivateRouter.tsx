import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { logout } from "../helper";
import { BlankLayout, SibarLayout } from "../layouts";
import { doGetCurrentUser } from "../redux/slice";
export const PrivateRouter: React.FC<IPrivateRouter> = ({
  component,
  exact,
  path,
  isHasSideBar,
}) => {
  const dispatch = useDispatch();
  const tokenLogin = window.localStorage.getItem("TOKEN");
  useEffect(() => {
    dispatch(doGetCurrentUser());
  }, []);
  return (
    <Route
      exact={exact}
      path={path}
      render={() => {
        if (!tokenLogin) {
          logout();
        }
        return (
          <>
            {isHasSideBar ? (
              <SibarLayout>{component}</SibarLayout>
            ) : (
              <BlankLayout>{component}</BlankLayout>
            )}
          </>
        );
      }}
    />
  );
};
