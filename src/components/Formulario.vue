<template>
  <div class="mx-auto text-white rounded-lg my-7 bg-spotifyBlue p-7 w-fit">
    <h1 class="font-bold tracking-wider uppercase">
      Agrega tus credenciales de
      <span class="text-2xl font-bold tracking-wider text-spotifyGreen"
        >Spotify</span
      >
    </h1>
    <form @submit.prevent="handleSubmit">
      <div class="flex flex-col py-4 my-4 text-left">
        <label for="clientId">Client ID:</label>
        <input
          class="flex justify-center w-full mx-auto text-black shadow"
          type="text"
          id="clientId"
          v-model="clientId"
          required
        />
      </div>
      <div class="flex flex-col my-4 text-left">
        <label for="clientSecret">Client Secret:</label>
        <input
          class="flex justify-center w-full mx-auto text-black shadow"
          type="password"
          id="clientSecret"
          v-model="clientSecret"
          required
        />
      </div>
      <p class="my-4 text-sm">
        Si no tienes tus credenciales, haz click aqui para saber como obtenerlas
      </p>
      <button
        type="submit"
        class="flex justify-start p-4 my-4 text-black bg-white shadow rounded-xl"
      >
        Save Credentials
      </button>
    </form>
  </div>
</template>
  
  <script setup>
import { ref } from "vue";

const clientId = ref("");
const clientSecret = ref("");

const handleSubmit = () => {
  console.log("Client ID:", clientId.value);
  console.log("Client Secret:", clientSecret.value);
  // Aquí puedes guardar las credenciales o utilizarlas como necesites
};
</script>
  
  <style scoped>
/* Estilos opcionales */
</style>
  