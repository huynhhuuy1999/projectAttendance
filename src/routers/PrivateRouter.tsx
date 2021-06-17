import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { logout } from "../helper";
import { BlankLayout, SibarLayout } from "../layouts";
import { doGetCurrentUser } from "../redux/action";
import { useAppDispatch } from "../redux/store";
export const PrivateRouter: React.FC<IPrivateRouter> = ({
  component,
  exact,
  path,
  isHasSideBar,
}) => {
  const dispatch = useAppDispatch();
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
