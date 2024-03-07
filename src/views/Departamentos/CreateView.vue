<script setup>
import { onBeforeUnmount } from "vue";
import { onMounted } from "vue";
import { useDepartamento } from "@/stores/departamento";
import { useCentroCusto } from "@/stores/centroCusto";

const storeCentroCusto = useCentroCusto();
const store = useDepartamento();

onBeforeUnmount(store.resetForm);
onMounted(storeCentroCusto.getCentrosCusto);
</script>
 
<template>
  <div class="container">
    <form @submit.prevent="store.storeDepartamento" novalidate>
      <div class="flex flex-col mx-auto md:w-96 w-full">
        <div class="card">
          <div class="card-body">
            <h1 class="text-2xl font-bold mb-4 text-center">Novo departamento</h1>
            <div class="flex flex-col gap-2 mb-4">
              <label for="titulo" class="required">Título</label>
              <input v-model="store.form.titulo" id="titulo" name="titulo" type="text" class="form-input"
                :disabled="store.loading" />
              <ValidationError :errors="store.errors" field="titulo" />
            </div>
            <div class="flex flex-col gap-2 mb-4">
              <label for="centro_custo_id" class="required">Centro de custo</label>
              <select v-model="store.form.centro_custo_id" class="form-input" :disabled="store.loading">
                <option value="">Selecione um centro de custo</option>
                <option v-for="centroCusto in storeCentroCusto.centrosCusto" :key="centroCusto.id"
                  :value="centroCusto.id">
                  {{ centroCusto.titulo }}
                </option>
              </select>
              <ValidationError :errors="store.errors" field="centro_custo_id" />
            </div>
            <div class="border-t h-[1px] my-6"></div>
            <div class="flex gap-2">
              <button type="submit" class="btn btn-primary w-full" :disabled="store.loading">
                <IconSpinner class="animate-spin" v-show="store.loading" />
                Salvar departamento
              </button>
              <RouterLink :to="{ name: 'departamentos.index' }" class="btn btn-secondary">
                Cancelar
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>