import "./style.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./routes/router";

// Crea una instancia de Pinia
const pinia = createPinia();

// Inicializa la aplicación con Pinia y el router
createApp(App)
  .use(pinia) // Agrega Pinia aquí
  .use(router) // Agrega el router
  .mount("#app");
