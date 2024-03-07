import { createRouter, createWebHistory } from "vue-router";
 
function auth(to, from, next) {
  if (!localStorage.getItem("access_token")) {
    alert("Sessão expirou, favor realizar o login novamente")
    return next({ name: "login" });
  }
 
  next();
}
 
function guest(to, from, next) {
  if (localStorage.getItem("access_token")) {
    return next({ name: "usuarios.index" });
  }
 
  next();
}
 
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Auth/LoginView.vue"),
    },
    {
      path: "/login",
      name: "login",
      beforeEnter: guest,
      component: () => import("@/views/Auth/LoginView.vue"),
    },
    {
      path: "/profile",
      name: "profile.edit",
      beforeEnter: auth,
      component: () => import("@/views/Profile/EditView.vue"),
    },
    {
      path: "/profile/change-password",
      name: "profile.change-password",
      beforeEnter: auth,
      component: () => import("@/views/Profile/ChangePassword.vue"),
    },
    {
      path: "/cargos",
      name: "cargos.index",
      beforeEnter: auth,
      component: () => import("@/views/Cargos/IndexView.vue"),
    },
    {
      path: "/cargos/create",
      name: "cargos.create",
      beforeEnter: auth,
      component: () => import("@/views/Cargos/CreateView.vue"),
    },
    {
      path: "/cargos/:id/edit",
      name: "cargos.edit",
      beforeEnter: auth,
      component: () => import("@/views/Cargos/EditView.vue"),
    },
    {
      path: "/centrosCusto",
      name: "centrosCusto.index",
      beforeEnter: auth,
      component: () => import("@/views/CentrosCusto/IndexView.vue"),
    },
    {
      path: "/centrosCusto/create",
      name: "centrosCusto.create",
      beforeEnter: auth,
      component: () => import("@/views/CentrosCusto/CreateView.vue"),
    },
    {
      path: "/centrosCusto/:id/edit",
      name: "centrosCusto.edit",
      beforeEnter: auth,
      component: () => import("@/views/CentrosCusto/EditView.vue"),
    },

    {
      path: "/departamentos",
      name: "departamentos.index",
      beforeEnter: auth,
      component: () => import("@/views/Departamentos/IndexView.vue"),
    },
    {
      path: "/departamentos/create",
      name: "departamentos.create",
      beforeEnter: auth,
      component: () => import("@/views/Departamentos/CreateView.vue"),
    },
    {
      path: "/departamentos/:id/edit",
      name: "departamentos.edit",
      beforeEnter: auth,
      component: () => import("@/views/Departamentos/EditView.vue"),
    },
   
    {
      path: "/usuarios",
      name: "usuarios.index",
      beforeEnter: auth,
      component: () => import("@/views/Usuarios/IndexView.vue"),
    },
    {
      path: "/usuarios/create",
      name: "usuarios.create",
      beforeEnter: auth,
      component: () => import("@/views/Usuarios/CreateView.vue"),
    },
    {
      path: "/usuarios/:id/edit",
      name: "usuarios.edit",
      beforeEnter: auth,
      component: () => import("@/views/Usuarios/EditView.vue"),
    },

    {
      path: "/usuarios/importar",
      name: "usuarios.importar",
      beforeEnter: auth,
      component: () => import("@/views/Usuarios/ImportView.vue"),
    },

  ],
});
 
export default router;