<template>
  <section class="h-100 w-100">
    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-12 h-100 text-black">
          <div class="card rounded-3 text-black h-100">
            <div class="row g-0 h-100">
              <div class="col-lg-12 col-sm-12" style="background-color: #fff">
                <div class="card-body p-md-5">
                  <div class="row justify-content-center">
                    <div class="col-sm-12 col-lg-7">
                      <div class="mt-5">
                        <h4>Masuk</h4>
                      </div>
                      <form>
                        <div class="form-outline mb-4">
                          <input type="email" @keydown.enter="login" id="form2Example11" class="form-control" placeholder="Masukkan Username Atau Email" v-model="email" />
                        </div>
                        <b-form-text class="text-danger" v-if="errorEmail"> Username Harus Diisi! </b-form-text>

                        <div class="form-outline mb-4">
                          <!-- <input
                          type="password"
                          id="form2Example22"
                          placeholder="Masukkan Password"
                          @keydown.enter="login"
                          class="form-control"
                          v-model="password"
                        /> -->
                          <b-input-group>
                            <input @keydown.enter="login" :type="showPassword ? 'text' : 'password'" placeholder="Masukkan Password" class="form-control" v-model="password" />
                            <b-input-group-append style="cursor: pointer;">
                              <b-input-group-text @click="togglePasswordVisibility">
                                <i :class="['fas', showPassword ? 'fa-eye-slash' : 'fa-eye']"></i>
                              </b-input-group-text>
                            </b-input-group-append>
                          </b-input-group>
                        </div>
                        <b-form-text class="text-danger" v-if="errorPassword"> Password Harus Diisi! </b-form-text>

                        <div class="d-flex justify-content-around align-items-center mb-4">
                          <!-- Checkbox
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="form1Example3" />
                          <label class="form-check-label" for="form1Example3"> Tetap Masuk </label>
                        </div>
                        <button class="btn btn-link" @click="resetPassword">Lupa Password</button> -->
                        </div>

                        <div class="text-center pt-1 mb-5 pb-1">
                          <button type="button" @click="login" class="btn btn-primary btn-lg" style="width: 100%; padding-left: 2.5rem; padding-right: 2.5rem" :disabled="loading">
                            <div v-if="loading">
                              <b-spinner label="Spinning" small></b-spinner>
                              Harap Tunggu...
                            </div>
                            <div v-else>Masuk</div>
                          </button>
                          <button type="button" @click="onClickBack" class="btn btn-link btn-lg mt-2" style="width: 100%; padding-left: 2.5rem; padding-right: 2.5rem"><i class="fa-solid fa-arrow-left"></i> Kembali</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import VeeValidate from "vee-validate";
import axios from "axios";
import Cookies from "universal-cookie";
import swal from "sweetalert2";
const cookies = new Cookies();

Vue.use(VeeValidate, {
  fieldsBagName: "formFields", // fix issue with b-table
});

export default {
  data: () => ({
    email: "",
    errorEmail: false,
    username: "",
    password: "",
    errorPassword: false,
    showPassword: false,
    loading: false,
  }),
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    // back button
    onClickBack() {
      this.$router.push("/");
    },
    // login page
    login() {
      if (this.validation) {
        this.loading = true;
        let data = {
          "email/username": this.email,
          password: this.password,
        };
        axios
          .post(`${process.env.VUE_APP_URL}users/login`, data)
          .then((res) => {
            const cookies = new Cookies();
            cookies.set("user_id", res.data.data.user_id);
            cookies.set("token", res.data.data.token);
            cookies.set("roles", res.data.data.role_name);
            cookies.set("username", res.data.data.username);
            cookies.set("email", res.data.data.email);
            cookies.set("fullname", res.data.data.fullname);


            window.location.href = "/admin-sikarad-peta";

            window.location.reload();
            // this.loading = false;
          })
          .catch((e) => {
            if (e.response.data.message) {
              swal({
                title: "Kesalahan Server",
                text: e.response.data.message,
                type: "error",
              });
              this.loading = false;
            }
            if (e.response.data.error_messages[0].msg) {
              swal({
                title: "Kesalahan Server",
                text: e.response.data.error_messages[0].msg,
                type: "error",
              });
              this.loading = false;
            } else {
              swal({
                title: "Kesalahan Server",
                text: "Tidak dapat terhubung ke server",
                type: "error",
              });
              this.loading = false;
            }
            this.loading = false;
          });
      }
    },
    validation() {
      if (this.email === "") {
        this.errorEmail = true;
      } else {
        this.errorEmail = false;
      }

      if (this.password === "") {
        this.errorPassword = true;
      } else {
        this.errorPassword = false;
      }

      if (this.email === "" || this.password === "") {
        return false;
      } else {
        return true;
      }
    },
  },
  mounted() {
    let token = cookies.get("token");
    let role_id = cookies.get("roles");

    if (token) {
        window.location.href = "/admin-sikarad-peta";
      
    }
  },
  components: {
  },
};
</script>

<style>
.col-lg-6 {
  display: flex;
  align-items: center;
  justify-content: center;
}
.center {
  text-align: center;
}
.fullscreen {
  width: 100%;
  height: 100%;
}
.synergy-text {
  font-size: 90px;
  font-weight: bold;
}

.img-logo {
  width: auto;
  height: 15px;
  margin-bottom: 30px;
}

.synergy-text {
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
}

.synergy-small {
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 2rem;
}

.text-footer {
  font-size: 0.7rem;
}

@media only screen and (min-width: 991px) {
  .synergy-text {
    font-size: 90px;
    font-weight: bold;
  }

  .synergy-small {
    font-size: 30px;
  }

  .logo-footer {
    position: absolute;
    bottom: 0;
  }
  .img-logo {
    width: auto;
    height: 22px;
    margin-bottom: 30px;
  }
}
</style>
