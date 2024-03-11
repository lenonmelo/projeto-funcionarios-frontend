import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useCentroCusto = defineStore("centroCusto", () => {
  const router = useRouter();
  const errors = reactive({});
  const loading = ref(false);
  const centrosCusto = ref([]);
  const form = reactive({
    titulo: ""
  });

  function resetForm() {
    form.titulo = "";
    
    errors.value = {};
  }

  function getCentrosCusto() {
    return window.axios
      .get("centrosCusto")
      .then((response) => (centrosCusto.value = response.data.data));
  }

  function getAllCentrosCusto() {
    return window.axios
      .get("centrosCusto/getAll")
      .then((response) => (centrosCusto.value = response.data.data));
  }

  function storeCentroCusto() {
    if (loading.value) return;

    loading.value = true;
    errors.value = {};

    window.axios
      .post("centrosCusto", form)
      .then(() => {
        router.push({ name: "centrosCusto.index" });
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors;
        }
      })
      .finally(() => (loading.value = false));
  }

  function updateCentroCusto(centroCusto) {
    if (loading.value) return;

    loading.value = true;
    errors.value = {};

    window.axios
      .put(`centrosCusto/${centroCusto.id}`, form)
      .then(() => {
        router.push({ name: "centrosCusto.index" });
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors;
        }
      })
      .finally(() => (loading.value = false));
  }

  function deleteCentroCusto(centroCusto) {
    window.axios.delete(`centrosCusto/${centroCusto.id}`).then(getCentrosCusto);
  }

  function getCentroCusto(centroCusto) {
    window.axios.get(`centrosCusto/${centroCusto.id}`).then((response) => {
      form.titulo = response.data.data.titulo;

    });
  }

  return {
    form,
    errors,
    loading,
    resetForm,
    storeCentroCusto,
    centrosCusto,
    getCentrosCusto,
    getCentroCusto,
    getAllCentrosCusto,
    updateCentroCusto,
    deleteCentroCusto
  };
});