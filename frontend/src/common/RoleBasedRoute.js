// src/common/RoleBasedRoute.js
import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import AuthService from "../services/authService";

const RoleBasedRoute = ({
  adminComponent: AdminComponent,
  userComponent: UserComponent,
  layout: Layout,
  ...rest
}) => {
  const userData = JSON.parse(localStorage.getItem("user_data"));
  const isAdmin =
    userData && (userData.role === "admin" || userData.role === "superadmin");

  return (
    <Route
      {...rest}
      render={(props) =>
        AuthService.checkRoute() ? (
          <Layout>
            {isAdmin ? (
              <AdminComponent {...props} />
            ) : (
              <UserComponent {...props} />
            )}
          </Layout>
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

RoleBasedRoute.propTypes = {
  adminComponent: PropTypes.any.isRequired,
  userComponent: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
};

export default RoleBasedRoute;
