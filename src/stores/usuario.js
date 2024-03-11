import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useUsuario = defineStore("usuario", () => {
  const router = useRouter();
  const errors = reactive({});
  const loading = ref(false);
  const usuarios = ref([]);
  const form = reactive({
    nome: "",
    email: "",
    senha: "",
    confirmar_senha: "",
    cargo_id: "",
    departamento_id: ""
  });

  function resetForm() {
    form.nome = "";
    form.email = "";
    form.senha = "";
    form.confirmar_senha = "";
    form.cargo_id = "";
    form.departamento_id = "";

    errors.value = {};
  }

  function getUsuarios() {
    return window.axios
      .get("usuarios")
      .then((response) => (usuarios.value = response.data.data));
  }

  function getFilterByDepartamento(departamento_id) {
    return window.axios
      .get('usuarios/searchUsuariosByDepartamentos/' + departamento_id)
      .then((response) => (usuarios.value = response.data.data));
  }

  function storeUsuario() {
    if (loading.value) return;

    loading.value = true;
    errors.value = {};
  
      
    window.axios
      .post("usuarios", form)
      .then(() => {
        router.push({ name: "usuarios.index" });
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors;
        }
      })
      .finally(() => (loading.value = false));
  
  }

  function updateUsuario(usuario) {
    if (loading.value) return;

    loading.value = true;
    errors.value = {};

    window.axios
      .put(`usuarios/${usuario.id}`, form)
      .then(() => {
        router.push({ name: "usuarios.index" });
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors;
        }
      })
      .finally(() => (loading.value = false));
  }

  function deleteUsuario(usuario) {
    window.axios.delete(`usuarios/${usuario.id}`).then(getUsuarios);
  }

  function getUsuario(usuario) {
    window.axios.get(`usuarios/${usuario.id}`).then((response) => {

      form.nome = response.data.data.nome;
      form.email = response.data.data.email;
      form.senha = "";
      form.cargo_id = response.data.data.cargo_id;
      form.departamento_id = response.data.data.departamento_id;

    });
  }

  return {
    form,
    errors,
    loading,
    resetForm,
    storeUsuario,
    usuarios,
    getUsuarios,
    getUsuario,
    updateUsuario,
    deleteUsuario,
    getFilterByDepartamento
  };
});