<template>
  <ContentWrapper>
    <div class="content-heading">
      <div>User</div>
    </div>
    <div class="container-fluid">
      <b-modal
        id="modal-tambah-user"
        ref="modal-tambah-user"
        title="Tambah User"
        hide-footer
        size="md"
        @hidden="resetField()"
      >
        <form @submit.prevent="submitForm">
          <div class="clearfix" v-if="loadingCreate === true">
            <b-spinner class="float-right" label="Floated Right"></b-spinner>
          </div>
          <b-row>
            <b-col>
              <b-form-group label="Tipe Akun" label-for="tipe_akun">
                <multiselect
                  :allow-empty="false"
                  v-model="tipeAkun"
                  :options="optionRoles"
                  id="tipe_akun"
                  :multiple="false"
                  :close-on-select="true"
                  :clear-on-select="false"
                  placeholder="Pilih tipe akun"
                  label="name"
                  track-by="id"
                >
                </multiselect>
                <b-form-text class="text-danger" v-if="errorTipeAkun">
                  Tipe Akun Wajib Diisi!
                </b-form-text>
              </b-form-group>
              <b-form-group label="Nama Admin" label-for="nama_admin">
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
                  placeholder="Masukkan password"
                  type="password"
                ></b-form-input>
                <b-form-text class="text-danger" v-if="errorPassword">
                  Password Akun Wajib Diisi!
                </b-form-text>
              </b-form-group>
            </b-col>
          </b-row>

          <b-button type="submit" variant="primary" :disabled="loadingCreate"
            >Submit</b-button
          >
        </form>
      </b-modal>
    </div>

    <div class="card mt-3">
      <div class="d-flex align-items-center justify-content-between">
        <div>
          <b-button v-b-modal.modal-tambah-user variant="primary" class="ml-3"
            ><i class="fa fa-plus" aria-hidden="true"></i> Tambah user</b-button
          >
        </div>
        <div>
          <div class="mt-3 col-sm-12 d-flex">
            <b-form-input
              v-model="keyword"
              placeholder="Masukkan keyword"
              @keydown.enter="onPressEnterSearch"
            ></b-form-input>
            <b-button @click="handleClickSearch" variant="primary"
              >Cari</b-button
            >
          </div>
        </div>
      </div>

      <div class="card-body">
        <div>
          <ve-table
            id="table"
            :columns="columns"
            :table-data="DataUser"
            :cell-style-option="cellStyleOption"
            :border-x="true"
            :border-y="true"
          />
          <div v-show="DataUser.length === 0" class="empty-data">
            Tidak ada data...
          </div>

          <div class="table-pagination">
            <ve-pagination
              :total="totalCount"
              :page-index="pageIndex"
              :page-size="pageSize"
              @on-page-number-change="pageNumberChange"
              @on-page-size-change="pageSizeChange"
            />
          </div>
        </div>
      </div>
    </div>
  </ContentWrapper>
</template>

<script>
import router from "@/router";
import axios from "axios";
import swal from "sweetalert2";
import VueEasytable from "vue-easytable";
import Vue from "vue";
import "vue-easytable/libs/theme-default/index.css";
import Cookies from "universal-cookie";
const cookies = new Cookies();
import Multiselect from "vue-multiselect";

Vue.use(VueEasytable);

export default {
  components: {
    VueEasytable,
    Multiselect,
  },
  data() {
    return {
      DataUser: [],
      optionRoles: [],
      optionInstansi: [],
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
      cellStyleOption: {
        headerCellClass: ({ column, rowIndex }) => {
          if (rowIndex === 0) {
            return "table-header-cell-class";
          }
        },
      },
      columns: [
        { field: "no", key: "no", title: "No", align: "left" },
        {
          field: "tipeakun",
          key: "nama",
          title: "Tipe Akun",
          align: "left",
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return <span>{row.mst_roles.name}</span>;
          },
        },
        { field: "fullname", key: "fullname", title: "Nama", align: "left" },
        {
          field: "username",
          key: "username",
          title: "Username",
          align: "left",
        },
        { field: "email", key: "email", title: "Email", align: "left" },
        {
          field: "",
          key: "status",
          title: "Status",
          align: "left",
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return (
              <span>
                {row.is_active === 1 ? (
                  <b-badge variant="primary">Active</b-badge>
                ) : (
                  <b-badge variant="danger">Not Active</b-badge>
                )}
              </span>
            );
          },
        },
        {
          field: "",
          key: "e",
          title: "Action",
          width: "",
          center: "left",

          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return (
              <span>
                &nbsp;
                <button
                  class="btn btn-outline-primary"
                  on-click={() => this.handleEditForm(row.id)}
                >
                  <i class="fa fa-pencil"></i>
                </button>
                &nbsp;
                <button
                  class="btn btn-outline-danger"
                  onClick={() => this.alertUser(row.id)}
                >
                  <i class="fa fa-trash"></i>
                </button>
              </span>
            );
          },
        },
      ],
    };
  },
  methods: {
    pageNumberChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.getData();
    },

    // page size change
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.getData();
    },

    getToken() {
      this.token = cookies.get("token");
    },
    handleEditForm(id) {
      this.action = "update";
      this.id = id;
      this.$refs["modal-tambah-user"].show("modal-tambah-user");

      axios
        .get(`${process.env.VUE_APP_URL}users/${id}/admin`)
        .then((response) => {
          this.tipeAkun = response.data.data.role_id[0];
          this.namaAdmin = response.data.data.fullname;
          this.userName = response.data.data.username;
          this.email = response.data.data.email;
          this.phone_number = response.data.data.phone_number;
          this.keteranganStatus = response.data.data.keterangan[0];
        });
    },

    handleClickSearch() {
      this.pageIndex = 1;

      this.getData();
    },

    onPressEnterSearch() {
      this.pageIndex = 1;

      this.getData();
    },
    alertUser(id) {
      swal({
        title: "Anda Yakin Hapus Data?",
        text: "Data yang dihapus tidak dapat kembali",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yakin !",
        cancelButtonText: "Batal",
        heightAuto: false,
      }).then((result) => {
        if (result.value) {
          this.deleteUser(id);
          swal({
            title: "Berhasil!",
            text: "Data Telah Dihapus.",
            type: "success",
            heightAuto: false,
          });
        }
      });
    },

    async deleteUser(id) {
      try {
        await axios.delete(`${process.env.VUE_APP_URL}users/${id}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.getData();
      } catch (error) {
        console.error(error);
      }
    },

    async getData() {
      this.loadingInstance.show();

      try {
        await axios
          .get(
            `${process.env.VUE_APP_URL}users/admin?page=${this.pageIndex}&size=${this.pageSize}&search=${this.keyword}`
          )
          .then((response) => {
            this.totalCount = response.data.data.totalData;
            let row = response.data.data.content;

            row.map((item, index) => {
              return (item.no =
                index + 1 + this.pageSize * (this.pageIndex - 1));
            });

            this.DataUser = row;
            this.loadingInstance.close();
          });
      } catch (error) {
        console.error(error);
        this.loadingInstance.close();

        swal("Kesalahan Server!", "Tidak dapat terhubung ke server!", error);
      }
    },

    async getOptionRoles() {
      try {
        await axios
          .get(`${process.env.VUE_APP_URL}mst-roles`)
          .then((response) => {
            this.optionRoles = response.data.data.content;
          });
      } catch (error) {
        console.error(error);
        swal("Kesalahan Server!", "Tidak dapat terhubung ke server!", error);
      }
    },

    // reset field
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

    // menambah data
    async submitForm() {
      if (this.validation()) {
        const data = {
          role_id: this.tipeAkun.id,
          fullname: this.namaAdmin,
          email: this.email,
          phone_number: this.phone_number,
          password: this.password ? this.password : "",
          username: this.userName
        };

        this.loadingCreate = true;

        if (this.id) {
          await axios
            .put(`${process.env.VUE_APP_URL}users/${this.id}/admin`, data, {
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
              });
              this.$refs["modal-tambah-user"].hide();
              this.getData();
              this.resetField();
            })
            .catch((error) => {
              this.loadingCreate = false;

              console.error(error);
              if (error.response.data.error_messages[0].msg) {
                swal(
                  "Server error!",
                  error.response.data.error_messages[0].msg
                );
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
              });
              this.getData();
              this.resetField();
              this.$refs["modal-tambah-user"].hide();
            })
            .catch((error) => {
              this.loadingCreate = false;

              console.error(error);
              if (error.response.data.error_messages[0].msg) {
                swal(
                  "Server error!",
                  error.response.data.error_messages[0].msg
                );
              } else {
                swal("Server error!", "Could not connect to the server!");
              }
            });
        }
      }
    },
    validation() {
      if (this.tipeAkun === "") {
        this.errorTipeAkun = true;
      } else {
        this.errorTipeAkun = false;
      }

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

      if (this.action === "create") {
        if (this.password === "") {
          this.errorPassword = true;
        } else {
          this.errorPassword = false;
        }
      }

      if (this.userName === "") {
        this.errorUserName = true;
      } else {
        this.errorUserName = false;
      }

      if (this.keterangan === "") {
        this.errorKeterangan = true;
      } else {
        this.errorKeterangan = false;
      }

      if (
        this.tipeAkun === "" ||
        this.namaAdmin === "" ||
        this.email === "" ||
        this.userName === "" ||
        this.keterangan === ""
      ) {
        return false;
      } else if (this.action === "create" && this.password === "") {
        return false;
      } else {
        return true;
      }
    },
  },
  computed: {
    requiredPassword: function () {
      return this.action === "create" ? true : false;
    },
  },
  mounted() {
    // Call the getData method when the component is mounted
    let token = cookies.get("token");
    if (!token) {
      this.$router.push("/panel");
    }
    this.loadingInstance = this.$veLoading({
      target: document.querySelector("#table"),
      name: "wave",
    });
    this.getData();
    this.getOptionRoles();
    this.getToken();
  },
  watch: {
    // whenever question changes, this function will run
    tipeAkun: function (newTipeAkun, oldTipeAkun) {
      if (oldTipeAkun !== null) {
        this.keterangan = null;
      }
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
