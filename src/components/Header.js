import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import Auth from "./Auth";
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: "10px",
    borderLeft: "1px dotted white",
    fontWeight: "500",
    '@media (max-width: 770px)': {
      fontSize: '12px'
    }
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  shop: {
    '@media (max-width: 770px)': {
      display: 'none'
    }
  },
}));

const Header = (props) => {
  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <ShoppingBasketIcon className={classes.icon} />
        <Button className={classes.button} variant="text" color="inherit" component={Link} to={"/"}>
          Home
        </Button>
        <Button
          className={classes.button}
          variant="text"
          color="inherit"
          component={Link}
          to={"/admin"}
          style={{ display: props.isAdmin ? "block" : "none" }}
        >
          Admin panel
        </Button>
        <Auth />
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state) => {
  return {
    isAdmin: state.userId === process.env.REACT_APP_ADMIN_ID
  };
}

export default connect(mapStateToProps, null)(Header);
