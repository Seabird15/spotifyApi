import { defineStore } from "pinia";
import { ref } from "vue";

export const useSpotifyStore = defineStore("spotify", () => {
  const clientId = ref("");
  const clientSecret = ref("");
  const accessToken = ref("");

  const setCredentials = (id, secret) => {
    clientId.value = id;
    clientSecret.value = secret;
  };

  const setAccessToken = (token) => {
    accessToken.value = token;
  };

  return {
    clientId,
    clientSecret,
    accessToken,
    setCredentials,
    setAccessToken,
  };
});
