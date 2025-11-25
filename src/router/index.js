import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../components/page/LandingPage.vue";
import AboutPage from "../components/page/AboutPage.vue";
import DashboardPage from "../components/page/DashboardPage.vue";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: LandingPage,
    meta: { showNavbar: true }
  },
  {
    path: "/about",
    name: "About",
    component: AboutPage,
    meta: { showNavbar: false }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardPage,
    meta: { showNavbar: false } 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
