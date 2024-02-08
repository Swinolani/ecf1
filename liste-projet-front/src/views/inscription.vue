<template>
  <h1>inscription</h1>
  <form @submit.prevent="submitInscription">
    <input
      type="text"
      name="pseudo"
      id="pseudo"
      v-model="pseudo"
      placeholder="Votre pseudo"
    /><br />
    <input
      type="email"
      name="email"
      id="email"
      v-model="email"
      placeholder="Votre email"
    /><br />
    <input
      type="password"
      name="password"
      id="password"
      v-model="password"
      placeholder="Mot de passe"
    /><br />
    <input type="submit" value="Inscription" />
  </form>

  <strong v-if="errorMessage" style="color: red">{{ errorMessage }}</strong>
  <p>
    Déjà inscrit ?
    <router-link to="/connexion" tag="a">Connectez vous ici</router-link>
  </p>
</template>
<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
let pseudo = "";
let password = "";
let email = "";

let errorMessage = ref("");
function submitInscription() {
  axios
    .post("http://localhost:3000/inscription", {
      pseudo: pseudo,
      email: email,
      password: password,
    })
    .then((response) => {
      errorMessage.value = response.data.message;
      if (response.data.message == undefined) {
        localStorage.setItem("token", response.data.token);
        router.push("/listeProjets");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  pseudo = "";
  password = "";
  email = "";
}
</script>
