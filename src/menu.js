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
      name: "Data Pegawai",
      icon: "fa fa-parachute-box",
      path: "/admin-sikarad-aksi",
    },
    // administrasi
    {
      name: "Master",
      icon: "fa fa-user-tie",
      submenu: [
        {
          name: "User",
          icon: "fa fa-user",
          path: "/admin-sikarad-user",
        },
        {
          name: "Kotama/Balakpus",
          icon: "fa fa-people-group",
          path: "/admin-sikarad-kotama-balakpus",
        },
      ],
    },
  ];
}

// admin relawan
if (roles === "admin" || roles === "user") {
  Menu = [
    {
      name: "Peta",
      icon: "fa fa-location-dot",
      path: "/admin-sikarad-peta",
    },
    {
      name: "Data Pegawai",
      icon: "fa fa-parachute-box",
      path: "/admin-sikarad-aksi",
    }
  ];
}
export default Menu;
