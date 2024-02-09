<template>
  <div>
    <h1>Bienvenue dans vos liste de projet {{ pseudoRecup }}</h1>

    <h2>Créer un nouveau projet</h2>
    <form @submit.prevent="submitProjet">
      <input
        type="text"
        name="nom"
        id="nom"
        v-model="nom"
        placeholder="Nom du projet"
      /><br />
      <textarea
        name="description"
        id="description"
        v-model="description"
        cols="30"
        rows="10"
        placeholder="Description"
      ></textarea
      ><br />
      <input type="submit" value="Créer" />
    </form>
    <strong v-if="message" style="color: green">{{ message }}</strong>
    <hr />
    <h2>Liste des projets</h2>
    <ul>
      <li v-for="(projet, index) in listeProjets" :key="index">
        Projet {{ index }} -
        <form @submit.prevent="updateOrDelete">
          Nom
          <input
            type="text"
            name="nomModif"
            class="inputModif"
            :value="projet.pro_nom"
            readonly
          />
          - Description :
          <input
            type="text"
            name="descModif"
            class="inputModif"
            :value="projet.pro_desc"
            readonly
          />
          <input
            type="submit"
            value="Modifier"
            id="modifier"
            class="button"
            style="background-color: yellow"
          />
          <input
            type="submit"
            value="Supprimer"
            class="button"
            style="background-color: red"
          />
        </form>
      </li>
    </ul>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
let listeProjets = ref([]);
let nom = ref("");
let description = ref("");
let message = ref("");
// Pas utilisé
let nomModif = ref("");
let descModif = ref("");
// ------------
const nomToken = localStorage.getItem("token");
let pseudoRecup = "";

function parseJwt(token) {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

//Fonction pour mettre a jour en direct la liste des projets sur la page
async function updateListeProjets() {
  try {
    const response = await axios.get("http://localhost:3000/listeProjets", {
      params: {
        pseudo: parseJwt(nomToken).infoPseudoUser,
        nom: nom.value,
      },
      headers: {
        Authorization: "Bearer " + nomToken,
        "Content-Type": "application/json",
      },
    });
    listeProjets.value = response.data;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des projets :",
      error
    );
  }
}

function submitProjet() {
  axios
    .post("http://localhost:3000/listeProjets", {
      pseudo: parseJwt(nomToken).infoPseudoUser,
      nom: nom.value,
      description: description.value,
    })
    .then((response) => {
      message.value = response.data.message;

      updateListeProjets();
    })
    .catch((error) => {
      console.error(error);
    });
  nom.value = "";
  description.value = "";
}

//Fonction non utilisé
function updateOrDelete(event) {
  const form = event.target;

  const inpuTarget = event.submitter;

  if (inpuTarget.value === "Modifier") {
    event.preventDefault();

    form.querySelectorAll("input.inputModif").forEach((input) => {
      input.style.border = "1px solid black";
      input.removeAttribute("readonly");
      input.style.backgroundColor = "white";
      input.style.cursor = "auto";
    });
    inpuTarget.value = "valider";
    inpuTarget.style.backgroundColor = "green";
  } else if (inpuTarget.value === "Valider") {
    axios
      .put("http://localhost:3000/listeProjets", {
        pseudo: parseJwt(nomToken).infoPseudoUser,
        nomModif: nomModif.value,
        descModif: descModif.value,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    axios
      .delete(`http://localhost:3000/listeProjets/${nom.value}`, {
        params: {
          pseudo: parseJwt(nomToken).infoPseudoUser,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
// -----------------------------------------------
async function mounted() {
  try {
    pseudoRecup = parseJwt(nomToken).infoPseudoUser;
    // Récupérer la liste des projets au chargement initial du composant
    await updateListeProjets();
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des projets :",
      error
    );
  }
}
mounted();
</script>

<style scoped>
.inputModif {
  outline: none;
  border: none;
  cursor: default;
  background-color: #f2f2f2;
}
.button {
  outline: none;
  border: 1px solid black;
  margin: 0 5px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}
</style>
