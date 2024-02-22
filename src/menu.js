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
      name: "Personel",
      icon: "fa fa-people-group",
      submenu: [
        {
          name: "Tabel Data Personel",
          path: "/admin-sikarad-pegawai",
        },
        {
          name: "Rekapitulasi Personel",
          path: "/admin-sikarad-rekapitulasi",
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
      name: "Personel",
      icon: "fa fa-people-group",
      submenu: [
        {
          name: "Tabel Data Personel",
          path: "/admin-sikarad-pegawai",
        },
        {
          name: "Rekapitulasi Personel",
          path: "/admin-sikarad-rekapitulasi",
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
      name: "Personel",
      icon: "fa fa-people-group",
      submenu: [
        {
          name: "Tabel Data Personel",
          path: "/admin-sikarad-pegawai",
        },
        {
          name: "Rekapitulasi Personel",
          path: "/admin-sikarad-rekapitulasi",
        },
      ],
    },
  ];
}
export default Menu;
