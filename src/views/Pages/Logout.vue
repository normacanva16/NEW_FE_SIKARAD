<template></template>

<script>
import Cookies from "universal-cookie";
const cookies = new Cookies();
import swal from "sweetalert2";

export default {
  mounted() {
    cookies.remove("token");
    cookies.remove("roles");
    window.location.reload();
    this.$router.push("/");
    // swal({
    //   title: "Logout",
    //   text: "Anda yakin akan logout?",
    //   type: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#DD6B55",
    //   confirmButtonText: "Yakin !",
    //   cancelButtonText: "Batal",
    //   heightAuto: false,
    // }).then((result) => {
    //   if (result.value) {

    //   }
    // });
  },
};
</script>
