import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
// import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import { Image } from "components/atoms";
import { SectionHeader } from "components/molecules";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  placementGrid: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  placementGridItemMiddle: {
    margin: `0 ${theme.spacing(3)}px`,
  },
  coverImage: {
    boxShadow:
      "25px 60px 125px -25px rgba(80,102,144,.1), 16px 40px 75px -40px rgba(0,0,0,.2)",
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      maxWidth: 500,
    },
  },
  topGrid: {
    paddingBottom: theme.spacing(6),
    [theme.breakpoints.down("sm")]: {
      paddingBottom: theme.spacing(2),
    },
  },
}));

const AboutUs = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid container spacing={4} className={classes.topGrid}>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          xs={12}
          md={6}
          data-aos="fade-up"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <SectionHeader
                title={<span>About Us</span>}
                subtitle="InstagramAutomation was born from a deep appreciation for innovation, connectivity, and the desire to enhance everyday experiences. We understand the importance of capturing and commemorating life's highlights, whether it's memorable milestones, cherished connections, or significant achievements. Our mission is to provide a platform where users can seamlessly automate their Instagram tasks, transforming the way they engage with their audience and share their stories. With InstagramAutomation, users can not only streamline their processes but also add a touch of creativity and flair to their online presence. "
                align="right"
                fadeUp
                // disableGutter
                titleVariant="h3"
                subtitleVariant="subtitle1"
              />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.placementGrid}>
                <Button variant="outlined" color="primary">
                  Contact
                </Button>
                <Button variant="contained" color="primary">
                  Read More...
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          container
          justifyContent="flex-start"
          alignItems="center"
          xs={12}
          md={6}
          data-aos="fade-up"
        >
          <Image
            src="/images/illustrations/sample-3.webp"
            alt="..."
            className={classes.coverImage}
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid
          item
          container
          justifyContent="flex-start"
          alignItems="center"
          xs={12}
          md={6}
          data-aos="fade-up"
        >
          <Image
            src="/images/illustrations/images.jpeg"
            alt="..."
            className={classes.coverImage}
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          />
        </Grid>

        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          xs={12}
          md={6}
          data-aos="fade-up"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <SectionHeader
                title={<span>Fast & Efficient</span>}
                subtitle="InstagramAutomation is the product of our passion for simplifying and enhancing the Instagram experience. We recognize the significance of effortlessly managing and commemorating life's moments, from personal milestones to professional achievements. Our goal is to offer a comprehensive platform that empowers users to automate their Instagram activities, revolutionizing how they connect with their followers and narrate their journeys. With InstagramAutomation, users can streamline their tasks while infusing their online presence with creativity and style."
                align="left"
                fadeUp
                // disableGutter
                titleVariant="h3"
                subtitleVariant="subtitle1"
              />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.placementGrid}>
                <Button variant="contained" color="primary">
                  Design Now !
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

AboutUs.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default AboutUs;
