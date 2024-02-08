<template>
  <h1>connexion</h1>
  <form @submit.prevent="submitConnexion">
    <input
      type="text"
      name="pseudo"
      id="pseudo"
      v-model="pseudo"
      placeholder="Votre pseudo"
    /><br />
    <input
      type="password"
      name="password"
      id="password"
      v-model="password"
      placeholder="Mot de passe"
    /><br />
    <input type="submit" value="Se connecter" />
  </form>
  <strong v-if="errorMessage" style="color: red">{{ errorMessage }}</strong>
  <p>
    Pas encore inscrit ?
    <router-link to="/inscription" tag="a">Inscription</router-link>
  </p>
</template>
<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
let pseudo = "";
let password = "";

let errorMessage = ref("");
function submitConnexion() {
  axios
    .post("http://localhost:3000/connexion", {
      pseudo: pseudo,
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
}
</script>
