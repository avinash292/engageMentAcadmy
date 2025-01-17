/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import AuthService from "services/authService";
const useStyles = makeStyles((theme) => ({
  root: {},
  listItem: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  listItemIcon: {
    minWidth: "auto",
  },
  listItemLink: {
    textDecoration: "none",
  },
  closeIcon: {
    justifyContent: "flex-end",
    cursor: "pointer",
  },
  divider: {
    width: "100%",
  },
  countCircle: {
    background: theme.palette.secondary.main,
    borderRadius: "50%",
    marginLeft: theme.spacing(1),
    padding: theme.spacing(0.3, 1),
  },
}));

const SidebarNav = ({ onClose, className }) => {
  // const { pages, onClose, className, cartCount, ...rest } = props;
  const classes = useStyles();
  const userData = localStorage.getItem("user_data");
  // console.log("userData", userData);
  const logoutUser = () => {
    AuthService.logout();
  };
  return (
    <List className={clsx(classes.root, className)}>
      <ListItem className={classes.closeIcon} onClick={onClose}>
        <ListItemIcon className={classes.listItemIcon}>
          <CloseIcon fontSize="small" />
        </ListItemIcon>
      </ListItem>

      {AuthService.checkToken() ? (
        <div>
          <ListItem className={classes.listItem} onClick={onClose}>
            <Typography
              variant="h6"
              color="primary"
              component={Link}
              to="/"
              className={classes.listItemLink}
            >
              Home
            </Typography>
          </ListItem>
          <ListItem className={classes.listItem} onClick={onClose}>
            <Typography
              variant="h6"
              color="primary"
              className={classes.listItemLink}
              component={Link}
              to="/profile"
            >
              My Profile
            </Typography>
          </ListItem>
          {(JSON.parse(userData).role === "superadmin" ||
            JSON.parse(userData).role === "admin") && (
            <ListItem className={classes.listItem} onClick={onClose}>
              <Typography
                variant="h6"
                color="primary"
                className={classes.listItemLink}
                component={Link}
                to="/Clients"
              >
                {JSON.parse(userData).role === "superadmin"
                  ? "All Clients"
                  : "View my clients"}
              </Typography>
            </ListItem>
          )}

          {JSON.parse(userData).role === "superadmin" ? (
            <ListItem className={classes.listItem} onClick={onClose}>
              <Typography
                variant="h6"
                color="primary"
                className={classes.listItemLink}
                component={Link}
                to="/TeamMembers"
              >
                Team Members
              </Typography>
            </ListItem>
          ) : (
            ""
          )}
          {JSON.parse(userData).role === "user" ? (
            <>
              <ListItem className={classes.listItem} onClick={onClose}>
                <Typography
                  variant="h6"
                  color="primary"
                  className={classes.listItemLink}
                  component={Link}
                  to={`/lead/${JSON.parse(userData).user_id}/${
                    JSON.parse(userData).full_name
                  }`}
                >
                  All leads
                </Typography>
              </ListItem>
              <ListItem className={classes.listItem} onClick={onClose}>
                <Typography
                  variant="h6"
                  color="primary"
                  className={classes.listItemLink}
                  component={Link}
                  to={`/AccountSettings/${JSON.parse(userData).user_id}/${
                    JSON.parse(userData).full_name
                  }`}
                >
                  Account Settings
                </Typography>
              </ListItem>
            </>
          ) : (
            ""
          )}
          <ListItem className={classes.listItem}>
            <Typography
              variant="h6"
              color="primary"
              component="a"
              // href="/signin"
              className={classes.listItemLink}
              style={{ cursor: "pointer" }}
              onClick={logoutUser}
            >
              Logout
            </Typography>
          </ListItem>
        </div>
      ) : (
        <ListItem className={classes.listItem} onClick={onClose}>
          <Typography
            variant="h6"
            color="primary"
            // component="a"
            // href="/signin"
            className={classes.listItemLink}
            component={Link}
            to="/signin"
          >
            Sign In
          </Typography>
        </ListItem>
      )}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  products: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return { cartCount: state.cartCount };
};

export default connect(mapStateToProps)(SidebarNav);
