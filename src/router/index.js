import Vue from "vue";
import VueRouter from "vue-router";

// Layouts
import Layout from "@/components/Layout/Layout";
import LayoutHorizontal from "@/components/Layout/LayoutHorizontal";
import LayoutPage from "@/components/Layout/LayoutPage";
// Dashboard
// Admin RS

// Admin MDMC
const PetaAdminMDMC = () => import("@/views/AdminMDMC/Peta/PetaAdminMDMC.vue");
const TabelUserMDMC = () => import("@/views/AdminMDMC/User/TabelUserMDMC");
const TabelKotamaBalkpus = () => import("@/views/AdminMDMC/User/TabelKotamaBalkpus");

// Pages
const Error404 = () => import("@/views/Pages/404.vue");
const Error500 = () => import("@/views/Pages/500.vue");
const Lock = () => import("@/views/Pages/Lock.vue");
const Login = () => import("@/views/Pages/Login.vue");
const Logout = () => import("@/views/Pages/Logout.vue");
const Maintenance = () => import("@/views/Pages/Maintenance.vue");
const Register = () => import("@/views/Pages/Register.vue");
const HomePage = () => import("@/views/Pages/HomePage.vue");

// AKSI
const TabelAksi = () => import("@/views/Aksi/TabelAksi.vue");
const RekapitulasiPegawai = () => import("@/views/Aksi/RekapitulasiPegawai.vue");

// RELAWAN
const ProfileRelawan = () => import("@/views/Relawan/ProfileRelawan.vue");

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    // home page
    {
      path: "/",
      component: HomePage,
    },
    // Admin Pages
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: "/admin-sikarad-peta",
          component: PetaAdminMDMC,
        },
        {
          path: "/admin-sikarad-pegawai",
          component: TabelAksi,
        },
        {
          path: "/admin-sikarad-rekapitulasi",
          component: RekapitulasiPegawai,
        },
        {
          path: "/admin-sikarad-user",
          component: TabelUserMDMC,
        },
        {
          path: "/admin-sikarad-kotama-balakpus",
          component: TabelKotamaBalkpus,
        },
        // RELAWAN
        {
          path: "/admin-profile/:id",
          component: ProfileRelawan,
        },
      ],
    },
    // ADMIN ORGANISASI
    // login page
    {
      path: "/panel",
      component: Login,
    },
    // Horizontal Layout
    // User Pages
    {
      path: "/",
      component: LayoutPage,
      children: [
        {
          component: Login,
          path: "/panel",
        },
        {
          component: Logout,
          path: "/logout",
        },
        {
          component: Register,
          path: "/register",
        },
        {
          component: Lock,
          path: "/lock",
        },
        {
          component: Error404,
          path: "/notfound",
        },
        {
          component: Error500,
          path: "/error500",
        },
        {
          component: Maintenance,
          path: "/maintenance",
        },
      ],
    },
    {
      path: "*",
      redirect: "/notfound",
    },
  ],
});
