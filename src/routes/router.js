import { createRouter, createWebHistory } from "vue-router";
import Auth from "../components/Auth.vue";
import TopTracks from "../pages/TopTrack.vue";

const routes = [
  { path: "/", component: Auth },
  { path: "/top-tracks", component: TopTracks },
  { path: "/callback", component: TopTracks },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
