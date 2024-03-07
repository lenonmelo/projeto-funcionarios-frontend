import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
 
export const useCargo = defineStore("cargo", () => {
  const router = useRouter();
  const errors = reactive({});
  const loading = ref(false);
  const cargos = ref([]);
  const form = reactive({
    titulo: ""
  });
 
  function resetForm() {
    form.titulo = "";

    errors.value = {};
  }
 
  function getCargos() {
    return window.axios
      .get("cargos")
      .then((response) => (cargos.value = response.data.data));
  }
 
  function storeCargo() {
    if (loading.value) return;
 
    //Campos obrigatórios
    if (form.titulo == "") {
      alert("O campos Título é obrigatórios");
      loading.value = false;
      return false;
    }

    loading.value = true;
    errors.value = {};

    window.axios
      .post("cargos", form)
      .then(() => {
        router.push({ name: "cargos.index" });
      })
      .catch((error) => {
        if(error.response.data.status == 'error'){
          alert(error.response.data.message);
        }
      })
      .finally(() => (loading.value = false));
  }

  function updateCargo(cargo) {
    if (loading.value) return;
   
    //Campos obrigatórios
    if (form.titulo == "") {
      alert("O campos Título é obrigatórios");
      loading.value = false;
      return false;
    }
    
    loading.value = true;
    errors.value = {};
   
    window.axios
      .put(`cargos/${cargo.id}`, form)
      .then(() => {
        router.push({ name: "cargos.index" });
      })
      .catch((error) => {
        if(error.response.data.status == 'error'){
          alert(error.response.data.message);
        }
      })
      .finally(() => (loading.value = false));
  }

  function deleteCargo(cargo) {
    window.axios.delete(`cargos/${cargo.id}`).then(getCargos);
  }
   
  function getCargo(cargo) {
    window.axios.get(`cargos/${cargo.id}`).then((response) => {
      form.titulo = response.data.data.titulo;
      
    });
  }
 
  return {
    form,
    errors,
    loading,
    resetForm,
    storeCargo,
    cargos,
    getCargos,
    getCargo,
    updateCargo,
    deleteCargo
  };
});