import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import Header from "./components/Header";
import ProductGalery from "./components/ProductGalery/ProductGalery";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import { connect } from "react-redux";
import * as actions from "./store/actions";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  
  render() {

    let routes = (
      <Switch>
        <Route exact path="/" component={ProductGalery} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Redirect to="/"></Redirect>
      </Switch>
    );

    if (this.props.isAdmin) {
      routes = (
        <Switch>
          <Route exact path="/" component={ProductGalery} />
          <Route path="/admin" component={AdminPanel} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Redirect to="/"></Redirect>
        </Switch>
      );
    }

    return (
      <BrowserRouter basename="/macro-app">
        <CssBaseline />
        <Header />
        <main>{routes}</main>
        {/* <Footer /> */}
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAdmin: state.userId === process.env.REACT_APP_ADMIN_ID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);