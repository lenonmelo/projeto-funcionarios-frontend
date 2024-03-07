<script setup>
import { onMounted } from "vue";
import { useDepartamento } from "@/stores/departamento";
import { useCentroCusto } from "@/stores/centroCusto";

const storeCentroCusto = useCentroCusto();
const store = useDepartamento();

const deleteDepartamento = (departamento) => {
  let deleteConfirmation = confirm("Tem certeza que deseja deletar esse departamento?");

  if (deleteConfirmation) {
    store.deleteDepartamento(departamento)
  }
}

const filtrarDepartamentos = () => {
  // Construa o filtro com base no centro de custo selecionado
  let centro_custo_id = store.form.centro_custo_id;

  if (centro_custo_id != "") {
    // Execute o endpoint de filtro
    store.getFilterByCentroCusto(centro_custo_id);
  } else {
    store.getDepartamentos();
  }
}

onMounted(store.getDepartamentos);
onMounted(storeCentroCusto.getAllCentrosCusto);
</script>
 
<template>
  <div class="container">
    <div class="flex flex-col mx-auto col-6">
      <h1 class="text-2xl font-bold mb-4 text-center">Meus departamentos</h1>

      <RouterLink :to="{ name: 'departamentos.create' }" class="btn btn-primary w-full">
        Novo departamento
      </RouterLink>
      <div class="border-t h-[1px] my-6"></div>

      <h1 class="text-2xl text-center">Filtro</h1>
      <div class="flex flex-col gap-2 mb-4">
        <label for="centro_custo_id">Centro de custo</label>
        <select v-model="store.form.centro_custo_id" class="form-input" :disabled="store.loading">
          <option value="">Selecione um centro de custo</option>
          <option v-for="centroCusto in storeCentroCusto.centrosCusto" :key="centroCusto.id" :value="centroCusto.id">
            {{ centroCusto.titulo }}
          </option>
        </select>
      </div>
      <button @click="filtrarDepartamentos" class="btn btn-primary w-full">
        Filtrar
      </button>
      <div class="border-t h-[1px] my-6"></div>
      <div class="card">
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Centro de custo</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="departamento in store.departamentos" :key="departamento.id">
                <th scope="row">{{ departamento.id }}</th>
                <td>{{ departamento.titulo }}</td>
                <td>{{ departamento.centro_custo }}</td>
                <td>
                  <RouterLink :to="{ name: 'departamentos.edit', params: { id: departamento.id } }"
                    class="btn btn-secondary text-sm">
                    Alterar
                  </RouterLink>
                  <button @click="deleteDepartamento(departamento)" type="button"
                    class="btn text-white bg-red-600 hover:bg-red-500 text-sm">
                    X
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>