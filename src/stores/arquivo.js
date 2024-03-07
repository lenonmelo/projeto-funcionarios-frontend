import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useArquivo = defineStore("arquivo", () => {
  const router = useRouter();
  const errors = reactive({});
  const loading = ref(false);

  const form = reactive({
    arquivo: "",

  });

  function resetForm() {
    form.arquivo = "";

    errors.value = {};
  }

  function importUsuarios(arquivo) {
    if (loading.value) return;

    loading.value = true;
    errors.value = {};
    form.arquivo = arquivo;

    window.axios
      .post("usuarios/importar", form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        let errosArray = response.data.erros;
        let errorsMessage = response.data.message + "!";

        errorsMessage += "\n\n As seguinte linhas deverão ser ajustada e importadas novamente. \n\n"
        errosArray.forEach(function (erros) {
          erros.forEach(function (erro) {
            errorsMessage += "Linha: " + erro.linha + " - Movito: " + erro.message + "\n";
          });

        });
        alert(errorsMessage);

        router.push({ name: "usuarios.index" });
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors;
        }
      })
      .finally(() => (loading.value = false));
  }

  return {
    form,
    errors,
    loading,
    resetForm,
    importUsuarios
  };
});