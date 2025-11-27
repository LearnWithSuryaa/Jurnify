import { createRouter, createWebHistory } from "vue-router";

import LandingPage from "../components/page/LandingPage.vue";
import AboutPage from "../components/page/AboutPage.vue";

import LoginPage from "../components/page/LoginPage.vue";
import RegisterPage from "../components/page/RegisterPage.vue";

// Dashboard parent + child pages
import DashboardLayout from "../components/dashboard/DashboardLayout.vue";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: LandingPage,
    meta: { showNavbar: true },
  },
  {
    path: "/about",
    name: "About",
    component: AboutPage,
    meta: { showNavbar: false },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
    meta: { showNavbar: false },
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
    meta: { showNavbar: false },
  },

  // Dashboard Routes
  {
    path: "/dashboard",
    component: DashboardLayout,
    meta: { requiresAuth: true, showNavbar: false },
    children: [
      {
        path: "",
        name: "DashboardHome",
        meta: { showFooter: false },
        component: () => import("../components/page/DashboardHomePage.vue"),
      },
      {
        path: "journey",
        name: "DashboardJourney",
        meta: { showFooter: false },
        component: () => import("../components/page/JourneyPage.vue"),
      },
      {
        path: "events",
        name: "DashboardEvents",
        meta: { showFooter: false },
        component: () => import("../components/page/EventsPage.vue"),
      },
      {
        path: "settings",
        name: "DashboardSettings",
        meta: { showFooter: false },
        component: () => import("../components/page/SettingsPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route Guard — Redirect kalau belum login
import { supabase } from "../lib/supabase";

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return next("/login");
  }
  next();
});

export default router;
