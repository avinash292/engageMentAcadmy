import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import { Topbar } from "./components";
import Sidebar from "./components/Sidebar";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
}));

const Main = (props) => {
  const { children } = props;

  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  const [openSidebar, setOpenSidebar] = useState(false);
  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const open = isMd ? false : openSidebar;

  return (
    <div
      className={clsx({
        [classes.root]: true,
      })}
    >
      <Topbar onSidebarOpen={handleSidebarOpen} />
      <Sidebar onClose={handleSidebarClose} open={open} variant="temporary" />
      <main>{children}</main>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
