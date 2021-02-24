import REACT_APP_API_BASE from "../config";

const PetfulApiService = {
  getAllPets() {
    return fetch(`${REACT_APP_API_BASE}/pets`)
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .catch((error) => console.error(error));
  },

  getCat() {
    return fetch(`${REACT_APP_API_BASE}/cats`, {
      headers: {},
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .catch((error) => console.error(error));
  },

  adoptCat() {
    return fetch(`${REACT_APP_API_BASE}/cats`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  getDog() {
    return fetch(`${REACT_APP_API_BASE}/dogs`, {
      headers: {},
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .catch((error) => console.error(error));
  },

  adoptDog() {
    return fetch(`${REACT_APP_API_BASE}/dogs`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  getPeople() {
    return fetch(`${REACT_APP_API_BASE}/people`, {
      headers: {},
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .catch((error) => console.error(error));
  },

  postPeople(name) {
    return fetch(`${REACT_APP_API_BASE}/people`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  deletePerson() {
    return fetch(`${REACT_APP_API_BASE}/people`, {
      method: "DELETE",
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  dequeuePet(pet) {
    return fetch(`${REACT_APP_API_BASE}/pets`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ type: pet }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default PetfulApiService;
