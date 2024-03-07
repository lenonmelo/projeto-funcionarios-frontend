import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
 
export const useDepartamento = defineStore("departamento", () => {
  const router = useRouter();
  const errors = reactive({});
  const loading = ref(false);
  const departamentos = ref([]);
  const form = reactive({
    titulo: "",
    centro_custo_id: "",
  });
 
  function resetForm() {
    form.titulo = "";
    form.centro_custo_id = "";
 
    errors.value = {};
  }
 
  function getDepartamentos() {
    return window.axios
      .get("departamentos")
      .then((response) => (departamentos.value = response.data.data));
  }

  function getAllDepartamentos() {
    return window.axios
      .get("departamentos/getAll")
      .then((response) => (departamentos.value = response.data.data));
  }

  function getFilterByCentroCusto(centro_custo_id) {
    return window.axios
      .get('departamentos/searchDepartamentosByCentroCusto/'+centro_custo_id)
      .then((response) => (departamentos.value = response.data.data));
  }

  function storeDepartamento() {
    if (loading.value) return;
 
     //Campos obrigatórios
     if (form.titulo == "") {
      alert("O campos Título é obrigatórios");
      loading.value = false;
      return false;
    }
    if (form.centro_custo_id == "") {
      alert("O campos Centro de custo é obrigatórios");
      loading.value = false;
      return false;
    }

    loading.value = true;
    errors.value = {};
 
    window.axios
      .post("departamentos", form)
      .then(() => {
        router.push({ name: "departamentos.index" });
      })
      .catch((error) => {
        if(error.response.data.status == 'error'){
          alert(error.response.data.message);
        }
      })
      .finally(() => (loading.value = false));
  }

  function updateDepartamento(departamento) {
    if (loading.value) return;

    //Campos obrigatórios
    if (form.titulo == "") {
      alert("O campos Título é obrigatórios");
      loading.value = false;
      return false;
    }
    if (form.centro_custo_id == "") {
      alert("O campos Centro de custo é obrigatórios");
      loading.value = false;
      return false;
    }
   
    loading.value = true;
    errors.value = {};
   
    window.axios
      .put(`departamentos/${departamento.id}`, form)
      .then(() => {
        router.push({ name: "departamentos.index" });
      })
      .catch((error) => {
        if(error.response.data.status == 'error'){
          alert(error.response.data.message);
        }
      })
      .finally(() => (loading.value = false));
  }

  function deleteDepartamento(departamento) {
    window.axios.delete(`departamentos/${departamento.id}`).then(getDepartamentos);
  }
   
  function getDepartamento(departamento) {
    window.axios.get(`departamentos/${departamento.id}`).then((response) => {
      form.titulo = response.data.data.titulo;
      form.centro_custo_id = response.data.data.centro_custo_id;
      
    });
  }
 
  return {
    form,
    errors,
    loading,
    resetForm,
    storeDepartamento,
    departamentos,
    getDepartamentos,
    getDepartamento,
    getAllDepartamentos,
    updateDepartamento,
    deleteDepartamento,
    getFilterByCentroCusto
  };
});