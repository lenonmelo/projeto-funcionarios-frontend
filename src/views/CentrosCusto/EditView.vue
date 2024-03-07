<script setup>
import { watchEffect, onBeforeUnmount } from "vue";
import { useCentroCusto } from "@/stores/centroCusto";
import { useRoute } from "vue-router";

const store = useCentroCusto();
const route = useRoute();

onBeforeUnmount(store.resetForm);

watchEffect(async () => {
  store.getCentroCusto({ id: route.params.id });
});
</script>
 
<template>
  <div class="container">
    <form @submit.prevent="store.updateCentroCusto({ id: route.params.id })" novalidate>
      <div class="flex flex-col mx-auto md:w-96 w-full">
        <div class="card">
          <div class="card-body">
            <h1 class="text-2xl font-bold mb-4 text-center">Alterar centro de custo</h1>
            <div class="flex flex-col gap-2 mb-4">
              <label for="titulo" class="required">Título</label>
              <input v-model="store.form.titulo" id="titulo" name="titulo" type="text" class="form-input"
                :disabled="store.loading" />
              <ValidationError :errors="store.errors" field="titulo" />
            </div>
            <div class="border-t h-[1px] my-6"></div>
            <div class="flex gap-2">
              <button type="submit" class="btn btn-primary w-full" :disabled="store.loading">
                <IconSpinner class="animate-spin" v-show="store.loading" />
                Atualizar centro de custo
              </button>
              <RouterLink :to="{ name: 'centrosCusto.index' }" class="btn btn-secondary">
                Cancelar
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>