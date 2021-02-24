import API_ENDPOINT from "../config";

const PetfulApiService = {
  getAllPets() {
    return fetch(`${API_ENDPOINT}/pets`)
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .catch((error) => console.error(error));
  },

  getCat() {
    return fetch(`${API_ENDPOINT}/cats`, {
      headers: {},
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .catch((error) => console.error(error));
  },

  adoptCat() {
    return fetch(`${API_ENDPOINT}/cats`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  getDog() {
    return fetch(`${API_ENDPOINT}/dogs`, {
      headers: {},
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .catch((error) => console.error(error));
  },

  adoptDog() {
    return fetch(`${API_ENDPOINT}/dogs`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  getPeople() {
    return fetch(`${API_ENDPOINT}/people`, {
      headers: {},
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .catch((error) => console.error(error));
  },

  postPeople(name) {
    return fetch(`${API_ENDPOINT}/people`, {
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
    return fetch(`${API_ENDPOINT}/people`, {
      method: "DELETE",
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  dequeuePet(pet) {
    return fetch(`${API_ENDPOINT}/pets`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ type: pet }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default PetfulApiService;
