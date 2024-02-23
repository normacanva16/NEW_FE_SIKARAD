import Cookies from "universal-cookie";
const cookies = new Cookies();

const roles = cookies.get("roles");

let Menu = [];

// super admin
if (roles === "superadmin") {
  Menu = [
    // {
    //   heading: "Super Admin",
    // },

    // peta
    {
      name: "Peta",
      icon: "fa fa-location-dot",
      path: "/admin-sikarad-peta",
    },
    // aksi

    {
      name: "Data Personel",
      icon: "fa fa-people-group",
      path: "/admin-sikarad-pegawai",
    },
    {
      name: "Rekapitulasi Data",
      icon: "fa fa-chart-column",
      path: "/admin-sikarad-rekapitulasi",
    },
    // administrasi
    {
      name: "Master",
      icon: "fa fa-server",
      submenu: [
        {
          name: "User",
          path: "/admin-sikarad-user",
        },
        {
          name: "Kotama/Balakpus",
          path: "/admin-sikarad-kotama-balakpus",
        },
      ],
    },
    {
      name: "User Activity Log",
      icon: "fa fa-history",
      path: "/admin-sikarad-log",
    },
  ];
}

// admin relawan
if (roles === "admin") {
  Menu = [
    {
      name: "Peta",
      icon: "fa fa-location-dot",
      path: "/admin-sikarad-peta",
    },
    {
      name: "Data Personel",
      icon: "fa fa-people-group",
      path: "/admin-sikarad-pegawai",
    },
    {
      name: "Rekapitulasi Data",
      icon: "fa fa-chart-column",
      path: "/admin-sikarad-rekapitulasi",
    },
    {
      name: "Master",
      icon: "fa fa-server",
      submenu: [
        {
          name: "Kotama/Balakpus",
          path: "/admin-sikarad-kotama-balakpus",
        },
      ],
    },
    {
      name: "User Activity Log",
      icon: "fa fa-history",
      path: "/admin-sikarad-log",
    },
  ];
}

if (roles === "user") {
  Menu = [
    {
      name: "Peta",
      icon: "fa fa-location-dot",
      path: "/admin-sikarad-peta",
    },
    {
      name: "Data Personel",
      icon: "fa fa-people-group",
      path: "/admin-sikarad-pegawai",
    },
    {
      name: "Rekapitulasi Data",
      icon: "fa fa-chart-column",
      path: "/admin-sikarad-rekapitulasi",
    },
  ];
}
export default Menu;
