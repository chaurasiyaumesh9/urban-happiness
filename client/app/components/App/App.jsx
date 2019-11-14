import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;
    return (
      <>
        <Header />
        <main>{children}</main>
        <Footer />
      </>
    );
  }
}

export default withRouter(App);
