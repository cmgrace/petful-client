//import Product from "../Product/Product";
import React, { Component } from "react";
import "./HomePage.css";

class HomePage extends Component {
  static defaultPorps = {
    history: { push: () => {} },
  };

  handleClickAdoption = () => {
    this.props.history.push("/pet");
  };
  render() {
    return (
      <>
        <div className="home">
          <div className="home__container">
            <img
              className="home__image"
              src={require("../images/homepage_pic.jpg")}
              alt="ad-img"
            />

            <div className="home__row">
              <h1>Welcome to Petful !</h1>
            </div>
            <div className="home__content">
              <p>
                Hi! We are here to help you find your lovely pet. Petful offers
                adoption for cats and dogs. Users and pets will be served as
                first in first out. Join our waiting list to get your journey
                started!
              </p>
            </div>
            <div className="home__button">
              <button
                type="button"
                className="button"
                onClick={this.handleClickAdoption}
              >
                Start your adoption
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default HomePage;
