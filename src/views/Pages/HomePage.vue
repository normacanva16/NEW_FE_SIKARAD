<template>
  <div>
    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-12 h-100 d-flex align-items-center justify-content-center">
          <div class="card rounded-3 text-black">
            <div class="text-center">
              <img :src="EkaPaksi" style="width: 100%; max-width: 100%;" alt="logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- footer -->
    <div class="footer">
      CopyRight &copy; {{ currentYear }} Pejuang
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

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10px;
  background-color: #1e210d;
  color: white;
  text-align: center;
}

.card {
  /* Additional styles for centering and fullscreen */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Set the height to 100% of the viewport height */
  margin: 0; /* Remove default margin */
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
