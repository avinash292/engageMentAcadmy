import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Popover from "@material-ui/core/Popover";
import MenuList from "@material-ui/core/MenuList";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Image } from "components/atoms";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import AuthService from "services/authService";
import API from "../../../../axios/axiosApi";
import { SERVER_PATH, PROFILE_IMAGE_PATH } from "../../../../config";

const useStyles = makeStyles((theme) => ({
  root: {},
  flexGrow: {
    flexGrow: 1,
  },
  navigationContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toolbar: {
    maxWidth: theme.layout.contentWidth,
    width: "100%",
    margin: "0 auto",
    padding: theme.spacing(0, 2),
  },
  listItem: {
    cursor: "pointer",
    paddingTop: 0,
    paddingBottom: 0,
  },
  listItemText: {
    flex: "0 0 auto",
    whiteSpace: "nowrap",
    textDecoration: "none",
  },
  listItemButton: {
    whiteSpace: "nowrap",
  },
  iconButton: {
    padding: 0,
    "&:hover": {
      background: "transparent",
    },
  },
  logoContainer: {
    width: 100,
    height: 28,
    [theme.breakpoints.up("md")]: {
      width: 120,
      height: 32,
    },
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  popperStyle: {
    zIndex: 1,
  },
  avatar: {
    cursor: "pointer",
  },
  title: {},
}));

const Topbar = ({
  onSidebarOpen,
  cartCount,
  updateCartCount,
  profileData,
  ...rest
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [productsAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const openProducts = Boolean(productsAnchorEl);

  const decoded = AuthService.decodeAccessToken();
  const userDataLocal =
    localStorage.getItem("user_data") !== null &&
    localStorage.getItem("user_data") !== undefined
      ? JSON.parse(localStorage.getItem("user_data"))
      : decoded;
  const [userData, setUserData] = useState(userDataLocal);
  const [role] = useState(userDataLocal.role);
  const [id] = useState(userDataLocal.user_id);
  const [userName] = useState(userDataLocal.full_name);
  // console.log(decoded);
  const imageAssetPath = SERVER_PATH + PROFILE_IMAGE_PATH;
  const [imageSource] = useState(imageAssetPath + userData.profile_image);
  // const [imageSource, setImageSource] = useState(imageAssetPath + userData.profile_image);

  useEffect(() => {
    setUserData((userData) => ({ ...userData, ...profileData }));
  }, [profileData]);

  useEffect(() => {
    const isLoggedIn = AuthService.getAuth();
    if (isLoggedIn) {
      const fetchUserProfile = async () => {
        try {
          const response = await API.get("profile");
          if (response.data.success && response.data.data) {
            const profileDetails = response.data.data.profile_details;
            const profile = {
              full_name:
                profileDetails.first_name + " " + profileDetails.last_name,
              mobile: profileDetails.mobile,
            };
            setUserData((userData) => ({ ...userData, ...profile }));
          }
        } catch (error) {
          console.log("ERROR in fetchUserProfile : ", error);
        }
      };
      fetchUserProfile();
    }
  }, [updateCartCount]);

  const logoutUser = () => {
    AuthService.logout();
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      // setOpenProducts(false);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Toolbar disableGutters className={classes.toolbar} {...rest}>
      <div className={classes.logoContainer}>
        <a href="/" title="thefront">
          {/* <Typography className={classes.title} variant="h4">Posteresque</Typography> */}
          <Image
            className={classes.logoImage}
            src="/images/logos/logo.svg"
            alt="Engagement Academy"
            lazy={false}
          />
        </a>
      </div>
      <div className={classes.flexGrow} />
      <Hidden smDown>
        <List className={classes.navigationContainer}>
          {AuthService.checkToken() ? (
            <>
              {role === "admin" || role === "superadmin" ? ( // Conditionally render Campaigns
                <>
                  <ListItem className={classes.listItem}>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      className={classes.listItemText}
                      component={Link}
                      to="/TwilioKpiDashboard"
                    >
                      KPI Dashboard
                    </Typography>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      className={classes.listItemText}
                      component={Link}
                      to="/Clients"
                    >
                      {role === "superadmin"
                        ? "All Clients"
                        : "View my clients"}
                    </Typography>
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem className={classes.listItem}>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      className={classes.listItemText}
                      component={Link}
                      to={`/lead/${id}/${userName}`}
                    >
                      All Leads
                    </Typography>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      className={classes.listItemText}
                      component={Link}
                      to={`/contactList/${id}/${userName}`}
                    >
                      Contact List
                    </Typography>
                  </ListItem>
                </>
              )}
              <Avatar
                alt={userData.full_name}
                className={classes.avatar}
                // component={RouterLink}
                src={imageSource}
                // to="/profile"
                onClick={handleClick}
              >
                {userData && userData.full_name && userData.full_name[0]
                  ? userData.full_name[0]
                  : "U"}
              </Avatar>
            </>
          ) : (
            <ListItem className={classes.listItem}>
              <Typography
                variant="body1"
                color="textSecondary"
                className={classes.listItemText}
                component={Link}
                to="/signin"
              >
                Sign In
              </Typography>
            </ListItem>
          )}

          <Popover
            open={openProducts}
            anchorEl={productsAnchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <React.Fragment>
              <MenuList
                autoFocusItem={openProducts}
                id="menu-list-grow"
                onKeyDown={handleListKeyDown}
              ></MenuList>
            </React.Fragment>
          </Popover>

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <React.Fragment>
              <MenuItem component={Link} to="/profile" onClick={handleClose}>
                <ListItemIcon className={classes.listIcon}>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="My Profile" />
              </MenuItem>
              {role === "superadmin" ? (
                <MenuItem
                  component={Link}
                  to="/TeamMembers"
                  onClick={handleClose}
                >
                  <ListItemIcon className={classes.listIcon}>
                    <PeopleAltIcon />
                  </ListItemIcon>
                  <ListItemText primary="Team Members" />
                </MenuItem>
              ) : (
                ""
              )}
              {role === "user" ? (
                <MenuItem
                  component={Link}
                  to={`/AccountSettings/${id}/${userName}`}
                  onClick={handleClose}
                >
                  <ListItemIcon className={classes.listIcon}>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Account Settings" />
                </MenuItem>
              ) : (
                ""
              )}

              <Divider />
              <MenuItem onClick={logoutUser}>
                <ListItemIcon className={classes.listIcon}>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItem>
            </React.Fragment>
          </Popover>
        </List>
      </Hidden>
      <Hidden mdUp>
        <IconButton
          className={classes.iconButton}
          onClick={onSidebarOpen}
          aria-label="Menu"
        >
          <MenuIcon />
        </IconButton>
      </Hidden>
    </Toolbar>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};

export default Topbar;
