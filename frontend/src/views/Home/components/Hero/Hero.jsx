import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery, Grid, Typography } from "@material-ui/core";
import { Image } from "components/atoms";
import { SectionHeader } from "components/molecules";

const useStyles = makeStyles((theme) => ({
  root: {},
  image: {
    boxShadow:
      "25px 60px 125px -25px rgba(80,102,144,.1), 16px 40px 75px -40px rgba(0,0,0,.2)",
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      maxWidth: 500,
    },
  },
  imageRight: {
    boxShadow:
      "25px 60px 125px -25px rgba(80,102,144,.1), 16px 40px 75px -40px rgba(0,0,0,.2)",
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      maxWidth: 500,
    },
    marginBottom: theme.spacing(2),
  },
}));

const Hero = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid
        container
        justifyContent="space-between"
        spacing={4}
        direction={isMd ? "row" : "column-reverse"}
      >
        <Grid
          item
          container
          justifyContent="flex-start"
          alignItems="center"
          xs={12}
          md={6}
          data-aos={"fade-up"}
        >
          <Image
            src="/images/illustrations/Best-Instagram-Automation-Tools-1.png"
            alt="TheFront Company"
            className={classes.image}
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          />
        </Grid>

        <Grid
          item
          container
          alignItems="center"
          xs={12}
          md={6}
          data-aos={"fade-up"}
        >
          {/* <Image
						src="/images/illustrations/sample-2.webp"
						alt="TheFront Company"
						className={classes.imageRight}
						data-aos="flip-right"
						data-aos-easing="ease-out-cubic"
						data-aos-duration="2000"
					/>
					<Image
						src="/images/illustrations/sample-2.webp"
						alt="TheFront Company"
						className={classes.imageRight}
						data-aos="flip-right"
						data-aos-easing="ease-out-cubic"
						data-aos-duration="2000"
					/> */}
          <SectionHeader
            title={
              <span>
                Automate your Instagram tasks
                <br />
                <Typography component="span" variant="inherit" color="primary">
                  with our cutting-edge automation bot.
                </Typography>
              </span>
            }
            subtitle="Our Instagram automation bot empowers you to streamline your tasks, save time, and boost your productivity. Experience hassle-free Instagram management like never before."
            align="left"
            disableGutter
            titleVariant="h3"
          />
        </Grid>
      </Grid>
    </div>
  );
};

Hero.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Hero;
