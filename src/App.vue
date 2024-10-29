<template>
  <section class="my-7">
    <div class="my-auto text-center">
      <h1 class="text-2xl font-bold uppercase text-spotifyGreen/85">
        Spotify <span class="tracking-widest text-spotifyGreen">APP</span>
      </h1>
      <router-view />
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  const token = localStorage.getItem("access_token");
  if (token) {
    // Si ya existe un token, redirige a /top-tracks
    router.push("/top-tracks");
  }
});
</script>

<style>
html {
  font-family: "Poppins", sans-serif;
  background-position: center;
  background-size: cover;
  background-image: url(https://images.pexels.com/photos/4151043/pexels-photo-4151043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2);
}
</style>
