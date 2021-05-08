import React from "react";
import { Route } from "react-router-dom";
import { BlankLayout } from "../layouts";
export const PublicRouter: React.FC<IPublicRouter> = ({
  component,
  exact,
  path,
}) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => {
        return (
          <>
            <BlankLayout>{component}</BlankLayout>
          </>
        );
      }}
    />
  );
};
