<template>
  <div class="my-7">
    <h1 class="text-spotifyGreen">SpotifyApp</h1>
    <Formulario />
    <button
      class="p-4 my-4 text-white shadow bg-spotifyPink rounded-xl"
      @click="redirectToSpotify"
    >
      Login with Spotify
    </button>
    <p v-if="accessToken">Token: {{ accessToken }}</p>
  </div>
</template>
  
  <script setup>
import Formulario from "./Formulario.vue";

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router"; // Importa useRouter
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from "../config/config.js";

const accessToken = ref("");
const router = useRouter(); // Inicializa el router

const getSpotifyToken = async (authCode) => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: authCode,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const data = await response.json();
  if (data.access_token) {
    // Guarda el token en el almacenamiento local
    localStorage.setItem("access_token", data.access_token);
    // Redirige a la vista de TopTracks
    // router.push("/top-tracks"); // Redirige a TopTracks.vue
  }
};

const redirectToSpotify = () => {
  const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=user-top-read`;
  window.location.href = url;
};

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  if (code) {
    getSpotifyToken(code); // Obtiene el token si hay un código
  }
});
</script>
  