<template>
  <div>
    <b-navbar toggleable="sm" type="light" variant="white" sticky="true">

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div class="">
      <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-12 h-100 text-black">
          <div class="card rounded-3 text-black h-100">
            <div class="text-center">
                    <img :src="EkaPaksi" style="width: 101%" alt="logo" />
                  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- footer -->
    <div class="mt-4">
      <div class="mb-4 text-center">
        <div
          style="
            padding: 10px;
            background-color: #1e210d;
            width: 100%;
            color: white;
          "
        >
          CopyRight &copy; {{ currentYear }} Pejuang
        </div>
      </div>
    </div>
    <div>
      <a class="float" @click="(e) => scrollToTop(e)">
        <i class="fa fa-arrow-up my-float" aria-hidden="true"></i>
      </a>
    </div>
  </div>
</template>

<script>
import EkaPaksi from "./../../../public/img/mdmc/sikarad_homepage.png";
import Cookies from "universal-cookie";
import DatePicker from "vue2-datepicker";
import axios from "axios";
import swal from "sweetalert2";
import Multiselect from "vue-multiselect";

import "vue2-datepicker/index.css";
const cookies = new Cookies();

export default {
  data() {
    return {
      isSidebarVisible: false,
      EkaPaksi,
      tokenUser: "",
    };
  },
  components: {
    DatePicker,
    Multiselect,
  },
  methods: {
    // login page
    onClickLogin() {
      this.$router.push("/login");
    },
    //   scroll
    scrollToTop(e) {
      e.preventDefault();
      let element = document.getElementById("top");
      element.scrollIntoView({ top: 0, behavior: "smooth" });
    },
    scrollMeTo(refName) {
      var element = this.$refs[refName];
      const offset = 1000;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      this.tabActive = refName;
      element.scrollIntoView({ top: offsetPosition, behavior: "smooth" });
    },
  },

  mounted() {
  },
};
</script>

<style>
body {
  background-color: #f8f9fa;
}

/* @media (min-width: 991.98px) {
  main {
    padding-left: 240px;
  }
} */

/* Sidebar 
.sidebar-home {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  padding: 58px 0 0;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 5%), 0 2px 10px 0 rgb(0 0 0 / 5%);
  width: 240px;
  z-index: 9999;
}
*/
/*@media (max-width: 991.98px) {
  .sidebar-home {
    width: 100%;
  }
}*/

/* .sidebar-home .active {
  border-radius: 5px;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
}
*/
/*.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto;
   Scrollable contents if viewport is shorter than content. 
}*/

/*.float {
  position: fixed;
  width: 40px;
  height: 40px;
  bottom: 40px;
  right: 40px;
  background-color: #0c9;
  color: #fff;
  border-radius: 50px;
  text-align: center;
  box-shadow: 2px 2px 3px #999;
  z-index: 21;
  cursor: pointer;
}*/
/*
.float:hover {
  color: #fff;
}

.my-float {
  margin-top: 13px;
}

.button-menu {
  color: white;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  margin-top: 2px;
}

.button-menu:hover {
  color: white;
  text-decoration: none;
  cursor: pointer;
  margin-top: 2px;
}
*/
ul {
  list-style-type: none;
  text-align: start;
}

.minus-padding {
  padding-left: 4em;
  padding-right: 4em;
}

@media only screen and (max-width: 600px) {
  .minus-padding {
    padding-left: 1em;
    padding-right: 1em;
  }
}

.text-child {
  font-size: xx-small;
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
