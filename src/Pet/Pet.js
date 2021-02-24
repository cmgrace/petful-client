import React, { Component } from "react";
import "./Pet.css";
import PetfulApiService from "../service/petful-api-service";
import PetBox from "../PetBox/PetBox";

const names = [
  "Peter",
  "Roger",
  "Roger",
  "Steve",
  "Thomas",
  "Tim",
  "Ty",
  "Victor",
  "Walter",
];

const lastNames = [
  "Nugent",
  "Ortiz",
  "Orwig",
  "Ory",
  "Paiser",
  "Pak",
  "Pettigrew",
  "Quinn",
  "Quizoz",
  "Ramachandran",
  "Resnick",
  "Sagar",
  "Schickowski",
  "Schiebel",
  "Sellon",
  "Severson",
  "Shaffer",
  "Solberg",
  "Soloman",
];

class Pet extends Component {
  state = {
    pets: { cat: [], dog: [] },
    adoptable: true,
    people: [],
    name: "",
    adoptionMessage: false,
    waiting: false,
    inline: false,
    atFront: false,
    error: null,
  };

  componentDidMount() {
    PetfulApiService.getAllPets()
      .then((pets) => {
        this.setState({ pets });
      })
      .catch((error) => this.setState({ error }));
    PetfulApiService.getPeople().then((people) => this.setState({ people }));
  }

  fillQueue = () => {
    this.interval = setInterval(() => {
      let first = names[Math.floor(Math.random() * names.length)];
      let last = lastNames[Math.floor(Math.random() * lastNames.length)];

      PetfulApiService.postPeople(`${first} ${last}`).then(() => {
        PetfulApiService.getPeople()
          .then((people) => {
            this.setState({ people });
            if (this.state.people.length === 5) {
              this.setState({ adoptionMessage: true });
              clearInterval(this.interval);
            }
          })

          .catch((error) => this.setState({ error }));
      });
    }, 5000);
  };

  handleAdoptClick = (type) => {
    this.setState({ adoptionMessage: true });
    setTimeout(() => {
      PetfulApiService.dequeuePet(type)
        .then(() => {
          PetfulApiService.getAllPets()
            .then((pets) => {
              this.setState({ pets });
            })
            .catch((error) => this.setState({ error }));
        })
        .then(() => {
          PetfulApiService.deletePerson().then(() => {
            PetfulApiService.getPeople()
              .then((people) => {
                this.setState({
                  people,
                  name: "",
                  adoptionMessage: true,
                  adoptable: true,
                  waiting: true,
                  atFront: false,
                });
              })
              .catch((error) => {
                this.setState({ error });
              });
          });
        });
    }, 3000);
  };

  updateUserName = (newName) => {
    this.setState({ name: newName });
  };

  UpdateWaitingList = (name) => {
    this.setState({ people: [...this.state.people, name] });
  };

  dequeuePet = () => {
    let pets = ["cat", "dog"];
    let pet = pets[Math.floor(Math.random() * pets.length)];

    PetfulApiService.dequeuePet(pet).then(() => {
      PetfulApiService.getAllPets()
        .then((pets) => {
          this.setState({ pets });
        })
        .catch((error) => this.setState({ error }));
    });
  };
  moveQueue = () => {
    this.interval = setInterval(() => {
      PetfulApiService.deletePerson()
        .then(() => {
          this.dequeuePet();
        })
        .then(() => {
          PetfulApiService.getPeople()
            .then((people) => {
              this.setState({ people });
              if (people[0] === this.state.name) {
                this.setState({
                  adoptable: false,
                  atFront: true,
                  inline: false,
                });
                clearInterval(this.interval);
                this.fillQueue();
              }
            })
            .catch((error) => this.setState({ error }));
        });
    }, 5000);
  };

  handleClickSubmit = (e) => {
    e.preventDefault();
    const { name } = this.state;
    PetfulApiService.postPeople(name)
      .then(
        PetfulApiService.getPeople().then((people) =>
          this.setState({ people, waiting: true, inline: true })
        )
      )
      .catch((res) => {
        this.setState({ error: res.error });
      });

    this.moveQueue();
  };

  render() {
    return (
      <>
        <div className="pet__container">
          <PetBox
            handleAdoptClick={this.handleAdoptClick}
            pet={this.state.pets.cat[0]}
            type={"cat"}
            adoptable={this.state.adoptable}
          />

          <PetBox
            handleAdoptClick={this.handleAdoptClick}
            pet={this.state.pets.dog[0]}
            type={"dog"}
            adoptable={this.state.adoptable}
          />
        </div>
        <div className="pet__description">
          <p>
            Here are the pets available for adoption now, please join our
            waiting list if you are interested, you will be able to adopt when
            is your turn.
          </p>
          {this.state.atFront && this.state.adoptionMessage === false && (
            <h2 style={{ color: "green" }}>Your turn! Please choose a pet.</h2>
          )}
          {this.state.adoptionMessage && (
            <h2 style={{ color: "green" }}>
              Congratulations, your adoption was accepted!
            </h2>
          )}
          {this.state.inline && (
            <h2 style={{ color: "orange" }}>Please wait...</h2>
          )}
        </div>
        <div className="pet__waitinglist">
          <ul>Current waiting list: {this.state.people.join(",")}</ul>
          <form onSubmit={this.handleClickSubmit}>
            <h5>Your name:</h5>
            <input
              type="text"
              id="user_name"
              value={this.state.name}
              onChange={(e) => this.updateUserName(e.target.value)}
            />
            <br />
            <button
              type="submit"
              className="login__signInButton"
              disabled={this.state.waiting}
            >
              Put me in waiting list
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Pet;
