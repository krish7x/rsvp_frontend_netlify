import React, { Component } from "react";
import Navitem from "./SidebarItem";

export default class Navbar extends Component {
  state = {
    NavItemActive: "",
  };

  activeitem = (x) => {
    if (this.state.NavItemActive.length > 0) {
      document
        .getElementById(this.state.NavItemActive)
        .classList.remove("active");
    }
    this.setState({ NavItemActive: x }, () => {
      document.getElementById(this.state.NavItemActive).classList.add("active");
    });
  };
  render() {
    return (
      <nav>
        <ul>
          <Navitem
            className="home"
            item="First Page"
            tolink="/"
            activec={this.activeitem}
          />
          <Navitem
            item="Second Page"
            tolink="/second"
            activec={this.activeitem}
          />
          <Navitem
            item="Third Page"
            tolink="/third"
            activec={this.activeitem}
          />
        </ul>
      </nav>
    );
  }
}
