<script setup>
import { onMounted } from "vue";
import { useCargo } from "@/stores/cargo";

const store = useCargo();

const deleteCargo = (cargo) => {
  let deleteConfirmation = confirm("Tem certeza que deseja deletar esse cargo?");

  if (deleteConfirmation) {
    store.deleteCargo(cargo)
  }
}

onMounted(store.getCargos);
</script>
 
<template>
  <div class="container">
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Meus cargos</h1>

      <RouterLink :to="{ name: 'cargos.create' }" class="btn btn-primary w-full">
        Novo cargo
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
              <tr v-for="cargo in store.cargos" :key="cargo.id">
                <th scope="row">{{ cargo.id }}</th>
                <td>{{ cargo.titulo }}</td>
                <td>
                  <RouterLink :to="{ name: 'cargos.edit', params: { id: cargo.id } }" class="btn btn-secondary text-sm">
                    Alterar
                  </RouterLink>
                  <button @click="deleteCargo(cargo)" type="button"
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