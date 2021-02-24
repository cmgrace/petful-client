import React, { Component } from "react";
import "./PetBox.css";

class PetBox extends Component {
  static defaultProps = {
    pet: {
      name: "",
      age: "",
      breed: "",
      description: "",
      gender: "",
      imageURL: "",
      story: "",
    },
  };

  render() {
    return (
      <div className="petbox">
        <p>
          <strong>Next available for adoption:</strong>
        </p>
        <br />
        <img src={this.props.pet.imageURL} alt="pic" />
        <div className="petbox__info">
          <p>Name: {`${this.props.pet.name}`}</p>
          <p>Age: {`${this.props.pet.age}`}</p>
          <p>Breed: {`${this.props.pet.breed}`}</p>
          <p>Description: {`${this.props.pet.description}`}</p>
          <p>Story: {`${this.props.pet.story}`}</p>
        </div>

        <button
          onClick={() => this.props.handleAdoptClick(this.props.type)}
          disabled={this.props.adoptable}
        >
          Adopt
        </button>
      </div>
    );
  }
}

export default PetBox;
