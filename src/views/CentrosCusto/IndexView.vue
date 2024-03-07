<script setup>
import { onMounted } from "vue";
import { useCentroCusto } from "@/stores/centroCusto";

const store = useCentroCusto();

const deleteCentroCusto = (centroCusto) => {
  let deleteConfirmation = confirm("Tem certeza que deseja deletar esse centro de custo?");

  if (deleteConfirmation) {
    store.deleteCentroCusto(centroCusto)
  }
}

onMounted(store.getCentrosCusto);
</script>
 
<template>
  <div class="container">
    <div class="flex flex-col mx-auto col-4">
      <h1 class="text-2xl font-bold mb-4 text-center">Meus centros de custos</h1>

      <RouterLink :to="{ name: 'centrosCusto.create' }" class="btn btn-primary w-full">
        Novo centro de custo
      </RouterLink>
      <div class="border-t h-[1px] my-6"></div>
      <div class="card">
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="centroCusto in store.centrosCusto" :key="centroCusto.id">
                <th scope="row">{{ centroCusto.id }} </th>
                <td>{{ centroCusto.titulo }}</td>
                <td>
                  <RouterLink :to="{ name: 'centrosCusto.edit', params: { id: centroCusto.id } }"
                    class="btn btn-secondary text-sm">
                    Alterar
                  </RouterLink>
                  <button @click="deleteCentroCusto(centroCusto)" type="button"
                    class="btn text-white bg-red-600 hover:bg-red-500 text-sm" >
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