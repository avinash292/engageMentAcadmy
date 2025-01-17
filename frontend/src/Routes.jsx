// src/Routes.js
import React from "react";
import { Switch, Redirect, Router } from "react-router-dom";
import { RouteWithLayout } from "./common";
import { Main as MainLayout, Minimal as MinimalLayout } from "./layouts";
import history from "./utils/history";
import UnauthenticatedRoute from "./common/UnauthenticatedRoute";
import AuthenticatedRoute from "./common/AuthenticatedRoute";
import RoleBasedRoute from "./common/RoleBasedRoute";

import {
  SignUp,
  NotFound as NotFoundView,
  SignIn,
  Profile,
  ForgotPassword,
  ResetPassword,
  Dashboard,
  UsersList,
  NumbersList,
  ContactList,
  CreateContactList,
  Campaigns,
  CreateCampaign,
  AddNewClient,
  CallLogDetail,
  TwilioDashboard,
  TeamMembers,
  AssignClients,
  AccountSettings,
} from "./views";

history.listen((location) => {
  setTimeout(() => {
    if (location.action === "POP") {
      return;
    }
    window.scrollTo(0, 0);
  });
});

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Redirect exact from="/" to="/TwilioKpiDashboard" />
        <AuthenticatedRoute
          exact
          path="/TwilioKpiDashboard"
          component={TwilioDashboard}
          layout={MainLayout}
        />
        <RoleBasedRoute
          exact
          path="/Clients"
          adminComponent={UsersList}
          userComponent={Dashboard}
          layout={MainLayout}
        />
        <RoleBasedRoute
          exact
          path="/Clients/:user_id/:name"
          adminComponent={UsersList}
          userComponent={Dashboard}
          layout={MainLayout}
        />

        <RoleBasedRoute
          exact
          path="/TeamMembers"
          adminComponent={TeamMembers}
          layout={MainLayout}
        />

        <RoleBasedRoute
          exact
          path="/dashboard/:id/:userName"
          adminComponent={Dashboard} // Ensuring admin can access the user dashboard
          userComponent={Dashboard}
          layout={MainLayout}
        />

        <AuthenticatedRoute
          exact
          path="/addClient/:action"
          component={AddNewClient}
          layout={MainLayout}
        />
        <AuthenticatedRoute
          exact
          path="/addMember/:action"
          component={AddNewClient}
          layout={MainLayout}
        />

        <AuthenticatedRoute
          exact
          path="/CallLogDetail/:id/:campaignName"
          component={CallLogDetail}
          layout={MainLayout}
        />
        <AuthenticatedRoute
          exact
          path="/editClient/:id/:action"
          component={AddNewClient}
          layout={MainLayout}
        />
        <AuthenticatedRoute
          exact
          path="/editMember/:id/:action"
          component={AddNewClient}
          layout={MainLayout}
        />
        <AuthenticatedRoute
          exact
          path="/lead/:id/:name"
          component={NumbersList}
          layout={MainLayout}
        />
        <AuthenticatedRoute
          exact
          path="/AccountSettings/:id/:name"
          component={AccountSettings}
          layout={MainLayout}
        />
        <AuthenticatedRoute
          exact
          path="/AssignClients/:userId/:name"
          component={AssignClients}
          layout={MainLayout}
        />

        <AuthenticatedRoute
          exact
          path="/lead/:id/:name/:contactList/:contactListName"
          component={NumbersList}
          layout={MainLayout}
        />
        <AuthenticatedRoute
          exact
          path="/lead/:id/:name/:contactList/:contactListName/:campaignName"
          component={NumbersList}
          layout={MainLayout}
        />

        <AuthenticatedRoute
          exact
          path="/CreateContactList/:id/:name"
          component={CreateContactList}
          layout={MainLayout}
        />

        <AuthenticatedRoute
          exact
          path="/editContactList/:id/:name/:contact_list_id"
          component={CreateContactList}
          layout={MainLayout}
        />
        <AuthenticatedRoute
          exact
          path="/contactList/:id/:name"
          component={ContactList}
          layout={MainLayout}
        />

        <AuthenticatedRoute
          exact
          path="/Campaigns"
          component={Campaigns}
          layout={MainLayout}
        />
        <AuthenticatedRoute
          exact
          path="/Campaigns/:id/:name"
          component={Campaigns}
          layout={MainLayout}
        />
        <AuthenticatedRoute
          exact
          path="/CreateCampaign/:id/:name"
          component={CreateCampaign}
          layout={MainLayout}
        />
        <AuthenticatedRoute
          exact
          path="/CreateCampaign"
          component={CreateCampaign}
          layout={MainLayout}
        />
        <AuthenticatedRoute
          exact
          path="/TwilioKpiDashboard"
          component={TwilioDashboard}
          layout={MainLayout}
        />
        <AuthenticatedRoute
          exact
          path="/editCampaign/:campaignid/:id/:name"
          component={CreateCampaign}
          layout={MainLayout}
        />

        <AuthenticatedRoute
          exact
          path="/profile"
          component={Profile}
          layout={MainLayout}
        />
        <UnauthenticatedRoute
          exact
          path="/signin"
          component={SignIn}
          layout={MainLayout}
        />
        <UnauthenticatedRoute
          exact
          path="/signup"
          component={SignUp}
          layout={MainLayout}
        />
        <UnauthenticatedRoute
          exact
          path="/forgot-password"
          component={ForgotPassword}
          layout={MainLayout}
        />
        <UnauthenticatedRoute
          exact
          path="/reset-password/:hash"
          component={ResetPassword}
          layout={MainLayout}
        />
        <RouteWithLayout
          component={NotFoundView}
          exact
          layout={MinimalLayout}
          path="/not-found"
        />
        <Redirect to="/not-found" status="404" />
      </Switch>
    </Router>
  );
};

export default Routes;
