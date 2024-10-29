<template>
  <div class="">
    <h2
      class="text-4xl font-bold tracking-widest text-white uppercase font-poppins my-7"
    >
      TUS FAVORITOS DE
      <span class="tracking-tighter text-spotifyPink">SPOTIFY</span>
    </h2>

    <!--TopTracks-->
    <section class="container">
      <div
        class="flex justify-around text-white shadow-xl p-7 bg-blue rounded-xl max-h-auto"
      >
        <div
          class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
          v-if="topTracks.length > 0"
        >
          <button
            class="lg:w-8/12"
            v-for="(track, index) in topTracks"
            :key="track.id"
            @click="openModal(track, 'modalopen')"
          >
            <div class="group">
              <div
                class="relative p-2 transition-opacity duration-300 bg-black bg-opacity-75 opacity-75 group-hover:opacity-100"
              >
                <span
                  class="absolute group-hover:bg-spotifyGreen group-hover:scale-[1.05] transition-all duration-300 top-0 px-4 py-3 rounded-full -left-5 bg-spotifyPink"
                  >{{ index + 1 }}.</span
                >
                <img
                  :src="track.album.images[0].url"
                  alt=""
                  class="shadow-sm group-hover:scale-[1.05]mt-5 transition-all duration-300 rounded-md"
                />
                <h2>{{ track.artists[0].name }}</h2>
                <h3
                  class="pt-2 font-semibold tracking-wider line-clamp-1 font-poppins"
                >
                  {{ track.name }}
                </h3>
              </div>
            </div>
          </button>
        </div>
        <div class="lg:w-4/12" v-if="!topTracks.length">
          <button
            class="my-7 border-solid hover:bg-spotifyGreen hover:text-black font-poppins border-[2px] rounded-lg p-2 text-white font-bold uppercase tracking-widest hover:shadow-xl cursor-pointer transition-all duration-500"
            @click="fetchTopTracks"
          >
            Mis canciones favoritas
          </button>
        </div>
      </div>
    </section>
    <!--TopTracks-->

    <!--Cards-->
    <!-- <div class="container flex justify-center mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-7">
        <div v-for="track in topTracks" :key="track.id">
          <img :src="track.album.images[0].url" alt="" />
          <h3
            class="text-xl font-bold tracking-wider text-purple-800 uppercase"
          >
            {{ track.artists[0].name }}
          </h3>
          <h2>{{ track.name }}</h2>
          <p>Album</p>
          <p>{{ track.album.name }}</p>
        </div>
      </div>
    </div> -->
    <!--Cards-->

    <!-- <ul v-if="topTracks.length">
      <li v-for="track in topTracks" :key="track.id">
        {{ track.name }} - {{ track.artists[0].name }}
      </li>
    </ul> -->
    <div>
      <button
        @click="logout"
        class="p-4 my-4 text-white bg-red-500 rounded-lg shadow px-7"
      >
        Salir
      </button>
    </div>
  </div>
  <Modal :showModal="showModal" @update:showModal="showModal = $event">
    <template #default>
      <div class="flex gap-7">
        <div class="lg:w-2/4">
          <img
            :src="modalTrack.album?.images[1]?.url || 'ruta/imagen/default.png'"
            alt=""
          />
        </div>
        <div class="my-auto lg:w-2/4">
          <h3
            class="text-2xl font-bold tracking-widest uppercase text-spotifyPink"
          >
            {{ modalTrack.name }}
          </h3>
          <p class="text-xl text-spotifyDarkGray">
            {{ modalTrack.artists?.name || "Artista desconocido" }}
          </p>
          <p class="text-md text-spotifyBlue">
            {{ modalTrack.album?.name || "Álbum desconocido" }}
          </p>
          <div class="flex justify-center">
            <audio
              :src="modalTrack.preview_url || 'ruta/audio/default.mp3'"
              controls
            ></audio>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>
  
  <script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from "../config/config.js";

//Modal
import Modal from "../components/Modal.vue";
const showModal = ref(false);
const modalTrack = ref({});

const router = useRouter();

const accessToken = ref(""); // Almacena el token de acceso
const topTracks = ref([]);

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
    localStorage.setItem("access_token", data.access_token);
    accessToken.value = data.access_token; // Guarda el token en la referencia
  } else {
    console.error("Error obteniendo el token:", data);
  }
};

const fetchTopTracks = async () => {
  if (!accessToken.value) return;

  const response = await fetch("https://api.spotify.com/v1/me/top/tracks", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken.value,
    },
  });

  if (response.ok) {
    const data = await response.json();
    topTracks.value = data.items;
    console.log(topTracks.value, "contenido");
  } else {
    console.error(
      "Error fetching top tracks:",
      response.status,
      response.statusText
    );
  }
};

// Maneja el token de acceso al cargar
onMounted(() => {
  const storedToken = localStorage.getItem("access_token");
  if (storedToken) {
    accessToken.value = storedToken; // Si ya hay un token, lo usa
  }

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  if (code) {
    getSpotifyToken(code); // Obtiene el token si hay un código
  }
});

const logout = () => {
  // Elimina el token de localStorage
  localStorage.removeItem("access_token");
  // Redirige a la vista principal
  router.push("/");
};

//Funcion para abrir modal dependiendo de la id de la card clickeada
const openModal = (track) => {
  modalTrack.value = track; // Establece la pista seleccionada
  console.log(modalTrack.value, "modaltrack");
  showModal.value = true; // Abre el modal
};
</script>
  
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Prociono&display=swap");

.font-poppins {
  font-family: "Poppins", sans-serif;
}
.bg-blue {
  background: rgb(52, 94, 196);
  background: linear-gradient(
    157deg,
    rgba(52, 94, 196, 1) 32%,
    rgba(255, 255, 255, 1) 100%
  );
}
.line-clamp-1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 1;
}
</style>