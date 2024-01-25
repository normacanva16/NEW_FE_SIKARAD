<template>
  <router-view />
</template>

<style lang="scss">
// Import Main styles for this application
@import "@/styles/bootstrap.scss";
@import "@/styles/app.scss";

.table-header-cell-class {
  background: #f7ec59 !important;
  color: rgb(0, 0, 0) !important;
}

.empty-data {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  width: 100%;
  color: #666;
  font-size: 16px;
  border: 1px solid #eee;
  border-top: 0;
}
</style>
