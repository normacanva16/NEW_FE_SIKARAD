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
      v-model="modalEditProfile"
      title="Tambah Relawan"
      hide-footer
      size="xl"
      @hidden="resetField()"
    >
      <form @submit.prevent="submitForm">
        <div class="clearfix" v-if="loadingCreate === true">
          <b-spinner class="float-right" label="Floated Right"></b-spinner>
        </div>

        <b-row>
          <b-col sm="12">
            <label for="">
              <h4>
                <i class="fa-solid fa-address-book"></i> Informasi Identitas
              </h4>
            </label>
          </b-col>
          <b-col sm="6">
            <b-form-group label="Nama Lengkap" label-for="nama_lengkap">
              <b-form-input
                id="nama_lengkap"
                v-model="namaLengkap"
                placeholder="Masukkan nama lengkap"
              ></b-form-input>
              <b-form-text class="text-danger" v-if="errorNamaLengkap">
                Nama Lengkap Wajib Diisi!
              </b-form-text>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12">
            <label for="">
              <h4><i class="fa-solid fa-phone mr-1"></i> Kontak</h4>
            </label>
          </b-col>
          <b-col sm="6">
            <b-form-group label="Email" label-for="email">
              <b-form-input
                id="email"
                v-model="email"
                placeholder="Masukkan email"
                type="email"
              ></b-form-input>
              <b-form-text class="text-danger" v-if="errorEmail">
                Email Wajib Diisi!
              </b-form-text>
            </b-form-group>

            <b-form-group label="Password" label-for="password">
              <b-form-input
                id="password"
                v-model="password"
                placeholder="(Kosongkan Jika Tidak Ada Perubahan)"
                type="password"
              ></b-form-input>
              <b-form-text class="text-danger" v-if="errorPassword">
                Password Wajib Diisi!
              </b-form-text>
            </b-form-group>

            <b-form-group label="Telepon" label-for="telepon">
              <b-form-input
                id="telepon"
                v-model="telepon"
                placeholder="Masukkan nomor telepon"
                type="number"
              ></b-form-input>
              <b-form-text class="text-danger" v-if="errorTelepon">
                Telepon Wajib Diisi!
              </b-form-text>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
        </b-row>
        <b-row>
          <b-col sm="6">
            <b-form-group label="Username" label-for="user_name">
          <b-form-input
            id="user_name"
            v-model="userName"
            placeholder="Masukkan Username"
          ></b-form-input>
          <b-form-text class="text-danger" v-if="errorUserName">
            Username Darah Wajib Diisi!
          </b-form-text>
        </b-form-group>
          </b-col>
        </b-row>

        <b-button type="submit" variant="primary" :disabled="loadingCreate"
          >Submit</b-button
        >
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
import router from "@/router";
import axios from "axios";
import swal from "sweetalert2";
import Cookies from "universal-cookie";
import Multiselect from "vue-multiselect";
import Datepicker from "vuejs-datepicker";

const cookies = new Cookies();

export default {
  components: {
    Multiselect,
    Datepicker,
  },
  data() {
    return {
      detailRelawan: null,
      modalEditProfile: false,
      modalInputKesehatan: false,
      keyword: "",
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0,
      id: null,
      roles: null,
      namaLengkap: "",
      errorNamaLengkap: false,
      userName: "",
      errorUserName: false,
      namaPanggilan: "",
      tanggalLahir: "",
      errorTanggalLahir: false,
      email: "",
      errorEmail: false,
      password: "",
      errorPassword: false,
      telepon: "",
      errorTelepon: false,
      whatsapp: "",
      alamatRumah: "",
      alamatKantor: "",
      action: "create",
      loadingCreate: false,
      loadingImportExcel: false,
      token: null,
      roles: null,
    };
  },
  methods: {
    getToken() {
      this.token = cookies.get("token");
      this.roles = cookies.get("roles");
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
      this.modalEditProfile = true;

      axios.get(`${process.env.VUE_APP_URL}users/${id}/admin`).then((response) => { 
        let data = response.data.data;
        this.namaLengkap = data.fullname;
        this.userName = data.username;
        this.email = data.email;
        this.telepon = data.phone_number;
      });
    },

    batasNIK(e) {
      return String(e).substring(0, 16);
    },

    async submitForm() {
      // if (this.validation()) {
      const formData = new FormData();
      formData.append("fullname", this.namaLengkap);
      formData.append("email", this.email);
      formData.append("password", this.password);
      formData.append("phone_number", this.telepon);

      this.loadingCreate = true;
      if (this.id) {
        await axios
          .put(`${process.env.VUE_APP_URL}users/${this.id}/admin`, formData, { 
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            this.loadingCreate = false;
            swal({
              title: "Success",
              text: "Data Berhasil Disimpan",
              type: "success",
              timer: 2000,
            });
            this.modalEditProfile = false;
            this.getData();
            this.resetField();
          })
          .catch((error) => {
            this.loadingCreate = false;
            console.error(error);
            if (error.response.data.error_messages[0].msg) {
              swal("Server error!", error.response.data.error_messages[0].msg);
            } else {
              swal("Server error!", "Could not connect to the server!");
            }
          });
      } else {
        await axios
          .post(`${process.env.VUE_APP_URL}users/admin`, data, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            this.loadingCreate = false;

            swal({
              title: "Success",
              text: "Data Berhasil Disimpan",
              type: "success",
              timer: 2000,
            });
            this.getData();
            this.resetField();
            this.modalEditProfile = false;
          })
          .catch((error) => {
            this.loadingCreate = false;

            console.error(error);
            if (error.response.data.error_messages[0].msg) {
              swal("Server error!", error.response.data.error_messages[0].msg);
            } else {
              swal("Server error!", "Could not connect to the server!");
            }
          });
        // end validation
        // }
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
      if (this.judul === "") {
        this.errorJudul = true;
      } else {
        this.errorJudul = false;
      }

      if (this.file === "") {
        this.errorFile = true;
      } else {
        this.errorFile = false;
      }

      if (this.deskripsi === "") {
        this.errorDeskripsi = true;
      } else {
        this.errorDeskripsi = false;
      }

      if (this.tanggalData === "") {
        this.errorTanggalData = true;
      } else {
        this.errorTanggalData = false;
      }

      if (
        this.judul === "" ||
        this.file === "" ||
        this.tanggalData === "" ||
        this.deskripsi === ""
      ) {
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
    modalEditProfile: function (newData) {
      if (newData === true) {
     
      }
    },

    tanggalLahir: function (newData, oldData) {
      this.tanggalLahir = this.formattedDate(newData);
    },

    tanggalBerlakuPassport: function (newData, oldData) {
      this.tanggalBerlakuPassport = this.formattedDate(newData);
    },
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
