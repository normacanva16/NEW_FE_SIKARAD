<template>
  <ContentWrapper>
    <div class="content-heading">
      <div>
        Detail User
        <div
          v-if="$router.history.current.query.peta === 'true' ? true : false"
        >
          <small
            ><b-button
              style="padding: 0"
              variant="link"
              @click="$router.go(-1)"
            >
              Peta
            </b-button>
            /
            {{ detailRelawan !== null ? detailRelawan.username : "-" }}
          </small>
        </div>
        <div v-else>
          <small
            ><b-button
              style="padding: 0"
              variant="link"
              @click="$router.go(-1)"
            >
              Kembali
            </b-button>
            /
            {{ detailRelawan !== null ? detailRelawan.username : "-" }}</small
          >
        </div>
      </div>
    </div>

    <div>
      <b-button
        variant="primary"
        class="mb-2"
        @click="handleEditForm(detailRelawan.id)"
      >
        Ubah Profile <i class="fa-solid fa-pencil ml-2"></i>
      </b-button>
    </div>
    <!-- modal input manual -->
    <b-modal
      id="modal-input-manual"
      ref="modal-input-manual"
      title="Tambah Relawan"
      hide-footer
      size="md"
      @hidden="resetField()"
    >
    <form>
          <div class="clearfix" v-if="loadingCreate === true">
            <b-spinner class="float-right" label="Floated Right"></b-spinner>
          </div>
          <b-row>
            <b-col>
              <b-form-group label="Nama" label-for="nama_admin">
                <b-form-input
                  id="nama_admin"
                  v-model="namaAdmin"
                  placeholder="Masukkan nama lengkap"
                ></b-form-input>
                <b-form-text class="text-danger" v-if="errorNamaAdmin">
                  Nama Admin Wajib Diisi!
                </b-form-text>
              </b-form-group>
              <b-form-group label="Email" label-for="email">
                <b-form-input
                  id="email"
                  v-model="email"
                  placeholder="Masukkan email"
                  type="email"
                ></b-form-input>
                <b-form-text class="text-danger" v-if="errorEmail">
                  Email Akun Wajib Diisi!
                </b-form-text>
              </b-form-group>
              <b-form-group label="Telepon" label-for="phone_number">
                <b-form-input
                  id="phone_number"
                  v-model="phone_number"
                  placeholder="Masukkan Telepon"
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Username" label-for="user_name">
                <b-form-input
                  id="user_name"
                  v-model="userName"
                  placeholder="Masukkan Username"
                ></b-form-input>
                <b-form-text class="text-danger" v-if="errorUserName">
                  Username Akun Wajib Diisi!
                </b-form-text>
              </b-form-group>
              <b-form-group label="Password" label-for="password">
                <b-form-input
                  id="password"
                  v-model="password"
                  placeholder="Kosongkan jika tidak ada perubahan"
                  type="password"
                ></b-form-input>
                <b-form-text class="text-danger" v-if="errorPassword">
                  Password Akun Wajib Diisi!
                </b-form-text>
              </b-form-group>
            </b-col>
          </b-row>

          <b-button variant="primary" @click="submitForm">
  Submit
</b-button>
        </form>
    </b-modal>

    <div class="card p-4">
      <div class="row">
        <div class="col-sm-6">
          <h4>
            <i class="fa-solid fa-address-book mr-1"></i>Informasi Identitas
          </h4>

          <div class="row">
            <div class="col-sm-4">Nama Lengkap</div>
            <div class="col-sm-1">:</div>
            <div class="col-sm-7">{{ detailRelawan.fullname }}</div>
          </div>

          <!-- username -->
          <div class="row">
            <div class="col-sm-4">Username</div>
            <div class="col-sm-1">:</div>
            <div v-if="detailRelawan.username === ''" class="col-sm-7"> - </div>
            <div v-else class="col-sm-7">{{ detailRelawan.username }}</div>
          </div>

          <div class="row">
            <div class="col-sm-4">Tipe Akun</div>
            <div class="col-sm-1">:</div>
            <div v-if="detailRelawan.mst_roles.name === ''" class="col-sm-7"> - </div>
            <div v-else class="col-sm-7">{{ detailRelawan.mst_roles.name }}</div>
          </div>

        </div>
        <div class="col-sm-6">
          <h4><i class="fa-solid fa-phone mr-1"></i>Kontak</h4>

          <div class="row">
            <div class="col-sm-4">Email</div>
            <div class="col-sm-1">:</div>
            <div class="col-sm-7">{{ detailRelawan.email }}</div>
          </div>

          <div class="row">
            <div class="col-sm-4">Telepon</div>
            <div class="col-sm-1">:</div>
            <div class="col-sm-7">{{ detailRelawan.phone_number }}</div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col mt-4">
          <b-button type="button" variant="primary" @click="$router.go(-1)"
            >Kembali</b-button
          >
        </div>
      </div>
    </div>
  </ContentWrapper>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default {
  components: {
  },
  data() {
    return {
      DataUser: [],
      optionRoles: [],
      optionInstansi: [],
      detailRelawan: null,
      keyword: "",
      loadingCreate: false,
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0,
      options: ["list", "of", "options"],
      id: null,
      tipeAkun: "",
      namaAdmin: "",
      email: "",
      phone_number: "",
      password: "",
      userName: "",
      keterangan: "",
      keteranganStatus: "",
      errorTipeAkun: false,
      errorNamaAdmin: false,
      errorEmail: false,
      errorPassword: false,
      errorUserName: false,
      errorKeterangan: false,
      token: null,
      action: "create",
    };
  },
  methods: {
    getToken() {
      this.token = cookies.get("token");
      this.roles = cookies.get("roles");
    },

    resetField() {
      this.id = null;
      this.tipeAkun = "";
      this.namaAdmin = "";
      this.email = "";
      this.phone_number = "";
      this.password = "";
      this.userName = "";
      this.keteranganStatus = "";
      this.keterangan = "";
      this.errorTipeAkun = false;
      this.errorNamaAdmin = false;
      this.errorEmail = false;
      this.errorPassword = false;
      this.errorUserName = false;
      this.errorKeterangan = false;
      this.action = "create";
    },

    formattedDate(oldDate) {
      let date = new Date(oldDate);

      // Get year, month, and day part from the date
      let year = date.toLocaleString("default", { year: "numeric" });
      let month = date.toLocaleString("default", { month: "2-digit" });
      let day = date.toLocaleString("default", { day: "2-digit" });

      // Generate yyyy-mm-dd date string
      return year + "-" + month + "-" + day;
    },

    handleEditForm(id) {
      this.action = "update";
      this.id = id;
      this.$refs["modal-input-manual"].show("modal-input-manual");

      axios.get(`${process.env.VUE_APP_URL}users/${id}/admin`).then((response) => { 
          this.namaAdmin = response.data.data.fullname;
          this.userName = response.data.data.username;
          this.email = response.data.data.email;
          this.phone_number = response.data.data.phone_number;
      });
    },

    async submitForm() {
      console.log("belummm")
  if (this.validation()) {
    console.log("masukkkkk")
    const data = {
      fullname: this.namaAdmin,
      email: this.email,
      phone_number: this.phone_number,
      password: this.password ? this.password : "",
      username: this.userName,
    };

    this.loadingCreate = true;

    try {
      await axios.put(
        `${process.env.VUE_APP_URL}users/${this.id}/user/profile`,
        data,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );

      swal({
        title: "Success",
        text: "Data Berhasil Disimpan",
        type: "success",
      });
      
      this.$refs["modal-input-manual"].hide();
      this.getData();
      this.resetField();
    } catch (error) {
      this.loadingCreate = false;

      console.error(error);
      if (error.response && error.response.data.error_messages[0].msg) {
        swal("Server error!", error.response.data.error_messages[0].msg);
      } else {
        swal("Server error!", "Could not connect to the server!");
      }
    }
  }
},


    async getData() {
      try {
        await axios
          .get(`${process.env.VUE_APP_URL}users/${this.$route.params.id}/admin`)
          .then((response) => {
            this.detailRelawan = response.data.data;
          });
      } catch (error) {
        console.error(error);
        swal("Kesalahan Server!", "Tidak dapat terhubung ke server!", error);
      }
    },

    validation() {
      if (this.namaAdmin === "") {
        this.errorNamaAdmin = true;
      } else {
        this.errorNamaAdmin = false;
      }

      if (this.email === "") {
        this.errorEmail = true;
      } else {
        this.errorEmail = false;
      }

      if (this.userName === "") {
        this.errorUserName = true;
      } else {
        this.errorUserName = false;
      }

      if (
        this.namaAdmin === "" ||
        this.email === "" ||
        this.userName === ""
      ) {
        return false;
      } else if (this.action === "create" && this.password === "") {
        return false;
      } else {
        return true;
      }
    },
  },

  mounted() {
    let token = cookies.get("token");
    if (!token) {
      swal({
        title: "Gagal",
        text: "Mohon Login Terlebih Dahulu",
        type: "warning",
        timer: 2000,
      });
      this.$router.push("/panel");
    }
    this.getToken();
    this.getData();
  },

  watch: {

  },
};
</script>

<style>
.vdp-datepicker .input-group input {
  background-color: white;
}
</style>

<style>
.button-border {
  border-width: 3px;
  border-color: darkgray;
  border-style: dashed;
  border-radius: 14px;
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
