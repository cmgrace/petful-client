import React, { Component } from "react";
import "./Pet.css";
import PetfulApiService from "../service/petful-api-service";
import PetBox from "../PetBox/PetBox";

class Pet extends Component {
  state = { dog: [], cat: [], adoptable: true, people: [], name: "" };

  adoptButtonClicked() {
    console.log("click");
  }

  updateUserName = (newName) => {
    this.setState({ name: newName });
  };

  UpdateWaitingList = (name) => {
    this.setState({ people: [...this.state.people, name] });
  };

  handleClickSubmit = (e) => {
    e.preventDefault();
    const { name } = this.state;
    console.log(name);
    PetfulApiService.postPeople({ name: name })
      .then((res) => {
        console.log(res);
        this.UpdateWaitingList(res);
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  componentDidMount() {
    PetfulApiService.getCat().then((cat) => this.setState({ cat }));
    PetfulApiService.getDog().then((dog) => this.setState({ dog }));
    PetfulApiService.getPeople().then((people) => this.setState({ people }));
  }

  render() {
    return (
      <>
        <div className="pet__container">
          {this.state.cat && (
            <PetBox
              adoptButtonClicked={this.adoptButtonClicked}
              pet={this.state.cat}
              adoptable={this.state.adoptable}
            />
          )}
          {this.state.dog && (
            <PetBox
              adoptButtonClicked={this.adoptButtonClicked}
              pet={this.state.dog}
              adoptable={this.state.adoptable}
            />
          )}
        </div>
        <div className="pet__description">
          <p>
            Here are the pets available for adoption now, please join our
            waiting list if you are interested, you will be able to adopt when
            is your turn.
          </p>
        </div>
        <div className="pet__waitinglist">
          <ul>Current waiting list: {this.state.people}</ul>
          <form onSubmit={this.handleClickSubmit}>
            <h5>Your name:</h5>
            <input
              type="text"
              id="user_name"
              value={this.state.name}
              onChange={(e) => this.updateUserName(e.target.value)}
            />
            <br />
            <button type="submit" className="login__signInButton">
              Put me in waiting list
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Pet;
