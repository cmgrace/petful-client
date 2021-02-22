import API_ENDPOINT from "../config";

const PetfulApiService = {
  getCat() {
    return fetch(`${API_ENDPOINT}/cats`, {
      headers: {},
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .catch((error) => console.error(error));
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
      body: JSON.stringify(name),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default PetfulApiService;
