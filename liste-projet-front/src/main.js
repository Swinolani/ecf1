import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import connexion from "./views/connexion.vue";
import inscription from "./views/inscription.vue";
import listeProjets from "./views/listeProjets.vue";
import App from "./App.vue";

import "./assets/main.css";

const store = createPinia();

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/connexion",
      component: connexion,
    },
    {
      path: "/inscription",
      component: inscription,
    },
    {
      path: "/",
      redirect: "/connexion",
    },
    {
      path: "/listeProjets",
      component: listeProjets,
    },
  ],
});

createApp(App).use(router).use(store).mount("#app");
