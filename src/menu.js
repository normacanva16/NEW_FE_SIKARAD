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
      name: "Pegawai",
      icon: "fa fa-people-group",
      submenu: [
        {
          name: "Rekapitulasi Pegawai",
          path: "/admin-sikarad-rekapitulasi",
        },
        {
          name: "Tabel Data Pegawai",
          path: "/admin-sikarad-pegawai",
        },
      ],
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
      name: "Pegawai",
      icon: "fa fa-people-group",
      submenu: [
        {
          name: "Rekapitulasi Pegawai",
          path: "/admin-sikarad-rekapitulasi",
        },
        {
          name: "Tabel Data Pegawai",
          path: "/admin-sikarad-pegawai",
        },
      ],
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
      name: "Pegawai",
      icon: "fa fa-people-group",
      submenu: [
        {
          name: "Rekapitulasi Pegawai",
          path: "/admin-sikarad-rekapitulasi",
        },
        {
          name: "Tabel Data Pegawai",
          path: "/admin-sikarad-pegawai",
        },
      ],
    },
  ];
}
export default Menu;
