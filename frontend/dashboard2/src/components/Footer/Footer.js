/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import styles from "assets/jss/material-dashboard-pro-react/components/footerStyle.js";

const useStyles = makeStyles(styles);
const useStyling = makeStyles((theme) => ({
  colour:{
    color:"black",
    '&:hover':{
      color:"blue"
    },
  },
}))

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Roboto',
      'serif',
      'Neonderthaw',
      'Dongle',
      'Roboto Slab'
    ].join(','),
  },
});

export default function Footer(props) {
  const classes = useStyles();
  const styling = useStyling();
  const { fluid, white, rtlActive } = props;
  var container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white,
  });
  var anchor =
    classes.a +
    cx({
      [" " + classes.whiteColor]: white,
    });
  var block = cx({
    [classes.block]: true,
    [classes.whiteColor]: white,
  });
  return (
    <footer className={classes.footer}>
      <div className={container}>
        <div className={classes.left}>
          <List className={classes.list}>
            {/* <ListItem className={classes.inlineBlock}>
              <a href="http://localhost:3000/admin/dashboard" className={block}>
                {rtlActive ? "الصفحة الرئيسية" : "Home"}
              </a>
            </ListItem> */}
            <ListItem className={classes.inlineBlock} style={{color:"black"}}>
              <a href="https://www.linkedin.com/company/curl-analytics"  target="_blank" className={block}>
                {rtlActive ? "شركة" : "About Company"}
              </a>
            </ListItem>
            {/* <ListItem className={classes.inlineBlock}>
              <a href="#portfolio" className={block}>
                {rtlActive ? "بعدسة" : "Portfolio"}
              </a>
            </ListItem> */}
            <ListItem className={classes.inlineBlock} style={{color:"black"}}>
              <a href="https://medium.com/@sovnature/introducing-sattva-b9c90c7288b1"
              target="_blank" className={block}>
                {rtlActive ? "مدونة" : "About Sattva"}
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right} style={{fontFamily:"sans-serif"}}>
          &copy; {1900 + new Date().getYear()}{" "}
            <a style={{fontWeight:"bold", color:"black"}}>
             {rtlActive ? "SattvaNFT" : "SattvaNFT"}
            </a>
            {rtlActive
            ? ", working to make nature Self-Sovereign"
            : ", working to make nature Self-Sovereign"}
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  fluid: PropTypes.bool,
  white: PropTypes.bool,
  rtlActive: PropTypes.bool,
};
