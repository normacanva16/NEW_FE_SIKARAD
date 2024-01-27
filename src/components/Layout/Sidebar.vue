<template>
  <aside class="aside-container">
    <!-- START Sidebar (left)-->
    <div class="aside-inner">
      <nav class="sidebar" data-sidebar-anyclick-close="">
        <!-- START sidebar nav-->
        <ul class="sidebar-nav mt-3">
          <template v-for="item in Menu">
            <!-- Heading -->
            <li class="nav-heading">
              <span>{{ $t(item.translate) || item.heading }}</span>
            </li>
            <!-- Single Menu -->
            <router-link
              tag="li"
              :to="item.path"
              active-class="active"
              v-if="!item.submenu"
            >
              <a :title="tr(item.translate, item.name)">
                <span
                  v-if="item.label"
                  :class="'float-right badge badge-' + item.label.color"
                  >{{ item.label.value }}</span
                >
                <em :class="item.icon"></em>
                <span>{{ tr(item.translate, item.name) }}</span>
              </a>
            </router-link>
            <!-- Menu With Subitems -->
            <li
              :class="routeActiveClass(getSubRoutes(item))"
              v-if="item.submenu"
            >
              <a
                :title="tr(item.translate, item.name)"
                @click.prevent="toggleItemCollapse(item.name)"
                href
              >
                <span
                  v-if="item.label"
                  :class="'float-right badge badge-' + item.label.color"
                  >{{ item.label.value }}</span
                >
                <em :class="item.icon"></em>
                <span>{{ tr(item.translate, item.name) }}</span>
              </a>
              <b-collapse
                tag="ul"
                class="sidebar-nav sidebar-subnav"
                id="item.name"
                v-model="collapse[item.name]"
              >
                <li class="sidebar-subnav-header">
                  {{ tr(item.translate, item.name) }}
                </li>
                <template v-for="sitem in item.submenu">
                  <router-link tag="li" :to="sitem.path" active-class="active">
                    <a :title="tr(sitem.translate, sitem.name)">
                      <span
                        v-if="sitem.label"
                        :class="'float-right badge badge-' + sitem.label.color"
                        >{{ sitem.label.value }}</span
                      >
                      <span>{{ tr(sitem.translate, sitem.name) }}</span>
                    </a>
                  </router-link>
                </template>
              </b-collapse>
            </li>
          </template>
        </ul>
        <!-- END sidebar nav-->
      </nav>
    </div>
    <!-- END Sidebar (left)-->
  </aside>
</template>

<script>
import { mapState } from "vuex";
import SidebarRun from "./Sidebar.run.js";
import Menu from "../../menu.js";
import Cookies from "universal-cookie";
import swal from "sweetalert2";
const cookies = new Cookies();

export default {
  name: "Sidebar",
  data() {
    return {
      usernameLogin: "",
      instansiLogin: "",
      email: "",
      username: "", // add a new data property to store the username
      form: {
        email: "",
        password: "",
      },
      Menu,
      collapse: this.buildCollapseList(),
    };
  },
  mounted() {
    SidebarRun(this.$router, this.closeSidebar.bind(this)), this.getToken();
    this.getUser();
  },
  computed: {
    ...mapState({
      showUserBlock: (state) => state.setting.showUserBlock,
    }),
  },
  watch: {
    $route(to, from) {
      this.closeSidebar();
    },
  },
  methods: {
    closeSidebar() {
      this.$store.commit("changeSetting", {
        name: "asideToggled",
        value: false,
      });
    },
    getUser() {
      this.usernameLogin = cookies.get("username");
      this.instansiLogin = cookies.get("instansi_name");
    },
    buildCollapseList() {
      /** prepare initial state of collapse menus. Doesnt allow same route names */
      let collapse = {};
      Menu.filter(({ heading }) => !heading).forEach(
        ({ name, path, submenu }) => {
          collapse[name] = this.isRouteActive(
            submenu ? submenu.map(({ path }) => path) : path
          );
        }
      );
      return collapse;
    },
    getSubRoutes(item) {
      return item.submenu.map(({ path }) => path);
    },
    // translate a key or return default values
    tr(key, defaultValue) {
      return key ? this.$t(key, { defaultValue: defaultValue }) : defaultValue;
    },
    isRouteActive(paths) {
      paths = Array.isArray(paths) ? paths : [paths];
      return paths.some((p) => this.$route.path.indexOf(p) > -1);
    },
    routeActiveClass(paths) {
      return { active: this.isRouteActive(paths) };
    },
    toggleItemCollapse(collapseName) {
      for (let c in this.collapse) {
        if (this.collapse[c] === true && c !== collapseName)
          this.collapse[c] = false;
      }
      this.collapse[collapseName] = !this.collapse[collapseName];
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
  },
};
</script>
