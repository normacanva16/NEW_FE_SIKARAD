<template>
  <header class="topnavbar-wrapper">
    <nav class="navbar topnavbar">
      <div class="navbar-header">
        <a class="navbar-brand" href="/admin-sikarad-peta">
          <div class="brand-logo-collapsed">
            <p class="text-bold text-white">SIKARAD</p>
          </div>
        </a>
      </div>
  
      <ul class="navbar-nav flex-row">
        <li class="nav-item">
          <b-container style="width: 100%; align-items: center">
            <b-row class="d-flex align-items-center">
              <b-col sm="*">
                <div>
                  <li class="nav-item d-none d-md-block" style="color: white">
                    <ToggleFullscreen
                      tag="A"
                      style="color: white"
                      class="nav-link"
                      href="#"
                    />
                  </li>
                </div>
              </b-col>
              <b-col sm="*">
                <div class="m-2">
                  <h5 style="color: white">Hi, {{ RelawanFullname }}</h5>
                </div>
              </b-col>
              <b-col sm="*">
                <div>
                  <b-nav-item-dropdown
                    class="dropdown-list"
                    no-caret
                    menuClass="animated flipInX"
                    right
                  >
                    <template slot="button-content">
                      <div>
                        <avatar
                          :fullname="RelawanFullname"
                          class="mr-2"
                          :size="30"
                        ></avatar>
                      </div>
                    </template>
                    <b-dropdown-item>
                      <div class="list-group">
                        <div
                          class="list-group-item list-group-item-action"
                        >
                          <div class="media">
                            <div class="media-body">
                              <p v-on:click="handleClickProfil()" class="m-0">
                                <i class="icon-user mr-1"></i> Profil
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="list-group-item list-group-item-action">
                          <div class="media">
                            <div class="media-body">
                              <p @click="() => handleClickLogout()" class="m-0">
                                <i
                                  class="fa fa-arrow-right-from-bracket mr-1"
                                ></i>
                                Keluar
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </b-dropdown-item>
                  </b-nav-item-dropdown>
                </div>
              </b-col>
            </b-row>
          </b-container>
        </li>
      </ul>
      <HeaderSearch :isOpen="navSearchOpen" :onClose.prevent="closeNavSearch" />
    </nav>
  </header>
</template>

<script>
import Avatar from "vue-avatar-component";
import { mapMutations } from "vuex";
import HeaderSearch from "@/components/Layout/HeaderSearch";
import ToggleFullscreen from "@/components/Common/ToggleFullscreen";
import swal from "sweetalert2";
import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();

export default {
  name: "Header",
  data: () => {
    return {
      usernameLogin: "",
      instansiEmail: "",
      instansiRoles: "",
      idRelawan: "",
      instansiRelawan: "",
      RelawanFullname: "",
      userPosisi: "",
      tokenUser: "",
      intansiId: "",
      email: "",
      username: "", // add a new data property to store the username
      form: {
        email: "",
        password: "",
      },
      navSearchOpen: false,
    };
  },
  components: {
    HeaderSearch,
    ToggleFullscreen,
    Avatar,
  },
  methods: {
    // username
    getUser() {
      this.idRelawan = cookies.get("user_id");
      this.usernameLogin = cookies.get("username");
      this.instansiEmail = cookies.get("email");
      this.instansiRoles = cookies.get("role_name");
      this.RelawanFullname = cookies.get("fullname");
      this.tokenUser = cookies.get("token");
    },

    // login name email
    login() {
      axios
        .post("/login", this.form)
        .then((response) => {
          const email = response.data.email;
          this.username = response.data.username;
          // Do other things after login success
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getToken() {
      this.token = cookies.get("token");
    },

    handleClickProfil() {
      this.$router.push(`/admin-profile/${this.idRelawan}`);
    },

    /**
     * Triggers a window resize event when clicked
     * for plugins that needs to be redrawed
     */
    resize: (e) => {
      // all IE friendly dispatchEvent
      var evt = document.createEvent("UIEvents");
      evt.initUIEvent("resize", true, false, window, 0);
      window.dispatchEvent(evt);
      // modern dispatchEvent way
      // window.dispatchEvent(new Event('resize'));
    },
    ...mapMutations(["toggleSetting"]),
    toggleOffsidebar() {
      this.toggleSetting("offsidebarOpen");
    },
    toggleOffcanvas() {
      this.toggleSetting("asideToggled");
    },
    toggleAsideCollapsed() {
      this.toggleSetting("isCollapsed");
      this.resize();
    },
    toggleUserBlock() {
      this.toggleSetting("showUserBlock");
    },
    toggleNavSearch() {
      this.navSearchOpen = !this.navSearchOpen;
    },
    closeNavSearch() {
      this.navSearchOpen = false;
    },
    handleClickLogout() {
      swal({
        title: "Keluar",
        text: "Anda yakin akan keluar?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yakin !",
        cancelButtonText: "Batal",
        heightAuto: false,
      }).then((result) => {
        if (result.value) {
          cookies.remove("user_id");
          cookies.remove("token");
          cookies.remove("roles");
          cookies.remove("username");
          cookies.remove("email");
          cookies.remove("fullname");

          // add think cookie
          cookies.remove("guest_id_marketing");
          cookies.remove("guest_id");
          cookies.remove("personalization_id");
          cookies.remove("guest_id_ads");
          // window.location.href = "/";
          this.$router.push("/");
        }
      });
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>

<style>
.brand-logo img {
  width: 120px;
  height: auto;
}
</style>
