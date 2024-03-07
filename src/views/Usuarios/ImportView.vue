<script setup>
import { onBeforeUnmount } from "vue";
import { useArquivo } from "@/stores/arquivo";

const store = useArquivo();

onBeforeUnmount(store.resetForm);
</script>
 
<template>
  <div class="container">
    <div class="flex flex-col mx-auto col-5">
      <div class="card">
        <div class="card-body">
          <h1 class="text-2xl font-bold mb-4 text-center">Importar lista de usuários</h1>
          <div class="flex flex-col gap-2 mb-4">
            <label for="arquivo" class="required">Arquivo</label>
            <input type="file" id="arquivo" name="arquivo" class="form-input" :disabled="store.loading"
              accept="application/csv" ref="files" />
            <ValidationError :errors="store.errors" field="arquivo" />
          </div>
          <div class="border-t h-[1px] my-6"></div>
          <p><b>O conteudo do arquivo .csv deverá ser da seguinte maneira:</b></p>
          <br>
          <p><b>"Nome";"Email";"Senha";"Cargo";"Departamento"</b></p>
          <p>"usuario1";"usario1@teste.com.br";"123456";"Programador";"Soluções digitais"</p>
          <div class="border-t h-[1px] my-6"></div>
          <div class="flex gap-2">
            <button class="btn btn-primary w-full" :disabled="store.loading" @click="sendFile">
              Importar usuários
            </button>
            <RouterLink :to="{ name: 'usuarios.index' }" class="btn btn-secondary">
              Cancelar
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    async sendFile() {
      let store = new useArquivo();
      let dataForm = new FormData();
      for (let file of this.$refs.files.files) {
        if (file.type != 'text/csv') {
          alert("O arquivo deve ser de extenção .CSV");
          return false;
        }
        store.importUsuarios(file);
      }
    },
  },
};
</script>
