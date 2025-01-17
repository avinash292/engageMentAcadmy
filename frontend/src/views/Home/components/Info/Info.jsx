import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { Image } from "components/atoms";
// import { SectionHeader } from 'components/molecules';

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
  lastGrid: {
    [theme.breakpoints.up("sm")]: {
      marginTop: "40%",
    },
  },
  title: {
    paddingBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      paddingBottom: theme.spacing(2),
    },
  },
  sectionItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Info = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      {/* <SectionHeader
				// label="Customization"
				title="Transform your space with wall art 100% personal to  you"
				subtitle="We aim to take care of you. Need help with installation, find a bug, or just need a clarifiction about our documentation? We'll be there to lend a helping hand."
				align="center"
				ctaGroup={[
					<Button variant="contained" color="primary" size="large">
						Start now
					</Button>,
					<Button variant="outlined" color="primary" size="large">
						Learn more
					</Button>,
				]}
			/> */}
      <Typography variant="h4" align="center" className={classes.title}>
        <b>Transform your space with wall art 100% personal to you</b>
      </Typography>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12} sm={4} className={classes.sectionItem}>
          <Image
            src="/images/logos/slack.svg"
            alt="TheFront Company"
            data-aos="fade-up"
          />
          <Typography variant="h6" align="center">
            <b>Fun & Easy Editor</b>
          </Typography>
          <Typography variant="subtitle2" align="center">
            Simplify your Instagram automation journey with our intuitive bot.
            Effortlessly manage your interactions, schedule posts, analyze data,
            and more. Streamline your Instagram presence and save valuable time!
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4} className={classes.sectionItem}>
          <Image
            src="/images/logos/mailchimp.svg"
            alt="TheFront Company"
            data-aos="fade-up"
          />
          <Typography variant="h6" align="center">
            <b>Live Preview</b>
          </Typography>
          <Typography variant="subtitle2" align="center">
            Experience seamless automation with our live previews, beautifully
            showcasing your Instagram actions. Instantly review and execute your
            automation strategies without any delays or uncertainty.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4} className={classes.sectionItem}>
          <Image
            src="/images/logos/dropbox.svg"
            alt="TheFront Company"
            data-aos="fade-up"
          />
          <Typography variant="h6" align="center">
            <b>Unique & Personal</b>
          </Typography>
          <Typography variant="subtitle2" align="center">
            Every automation we craft is tailored uniquely to your Instagram
            needs and preferences. Our automation solutions are ideal for
            streamlining your Instagram experience, whether it's for
            commemorating special moments or enhancing your online presence..
          </Typography>
        </Grid>
      </Grid>
      {/* <Grid container spacing={isMd ? 4 : 2}>
				<Grid item xs={12} sm={6}>
					<Grid container justif="center" alignItems="center">
						<Image
							src="/images/illustrations/dashboard-screenshot.jpg"
							alt="TheFront Company"
							className={classes.image}
							data-aos="fade-up"
						/>
					</Grid>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Grid
						container
						justif="center"
						alignItems="center"
						className={classes.lastGrid}
					>
						<Image
							src="/images/illustrations/dashboard-screenshot1.jpg"
							alt="TheFront Company"
							className={classes.image}
							data-aos="fade-up"
						/>
					</Grid>
				</Grid>
			</Grid> */}
    </div>
  );
};

Info.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Info;
