import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";
import history from "../history";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: "5rem"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    fontFamily: "Pacifico, cursive",
    fontSize: "2.6rem"
  },
  whiteBtn: {
    color: "#fff !important",
    borderColor: "#fff !important",
    marginLeft: "10px"
  },
  menu :{
    top: '50px!important'
  },
  userIcon: {
    marginRight: "7px"
  }
}));

function MenuAppBar({ isAuthenticated, logout }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const user = JSON.parse(localStorage.getItem("user"))

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSettings = () => {
    history.push("/register", { settings: true });

    handleClose();
  };
  const handleEvents = () => {
    history.push("/");
    handleClose();
  };
  const handleLogout = () => {
    logout();
    handleClose();
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            freunder
          </Typography>
          {isAuthenticated ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle className={classes.userIcon} /> {user ? user.name : null}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
                className={classes.menu}
              >
                <MenuItem onClick={handleSettings}>Update user profile</MenuItem>
                <MenuItem onClick={handleEvents}>Events</MenuItem>
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <Link to="/login" style={{textDecoration: "none"}}>
                <Button variant="outlined" className={classes.whiteBtn}>
                  Log in
                </Button>
              </Link>
              <Link to="/register" style={{textDecoration: "none"}}>
                <Button variant="outlined" className={classes.whiteBtn}>
                  Register
                </Button>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { logout })(MenuAppBar);
