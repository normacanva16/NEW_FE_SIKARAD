<template>
  <footer class="footer-container d-flex justify-content-center">
    <span>&copy; {{ tahunAktif }} - Pejuang</span>
  </footer>
</template>

<script>
export default {
  data: () => {
    return{
  };
  },
  computed: {
    tahunAktif() {
      return new Date().getFullYear();
    },
  },
};
</script>