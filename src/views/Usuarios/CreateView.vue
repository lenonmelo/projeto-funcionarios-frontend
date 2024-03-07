<script setup>
import { onMounted } from "vue";
import { onBeforeUnmount } from "vue";
import { useUsuario } from "@/stores/usuario";
import { useDepartamento } from "@/stores/departamento";
import { useCargo } from "@/stores/cargo";

const storeCargo = useCargo();
const storeDepartamento = useDepartamento();
const store = useUsuario();

onBeforeUnmount(store.resetForm);
onMounted(storeDepartamento.getDepartamentos);
onMounted(storeCargo.getCargos);
</script>
 
<template>
  <div class="container">
    <form @submit.prevent="store.storeUsuario" novalidate>
      <div class="flex flex-col mx-auto md:w-96 w-full">
        <div class="card">
          <div class="card-body">
            <h1 class="text-2xl font-bold mb-4 text-center">Novo usuário</h1>
            <div class="flex flex-col gap-2 mb-4">
              <label for="nome" class="required">Nome</label>
              <input v-model="store.form.nome" id="nome" name="nome" type="text" class="form-input"
                :disabled="store.loading" />
              <ValidationError :errors="store.errors" field="nome" />
            </div>

            <div class="flex flex-col gap-2 mb-4">
              <label for="cargo_id" class="required">Cargo</label>
              <select v-model="store.form.cargo_id" class="form-input" :disabled="store.loading">
                <option value="">Selecione um cargo</option>
                <option v-for="cargo in storeCargo.cargos" :key="cargo.id" :value="cargo.id">
                  {{ cargo.titulo }}
                </option>
              </select>
              <ValidationError :errors="store.errors" field="cargo_id" />
            </div>

            <div class="flex flex-col gap-2 mb-4">
              <label for="departamento_id" class="required">Departamento</label>
              <select v-model="store.form.departamento_id" class="form-input" :disabled="store.loading">
                <option value="">Selecione um departamento</option>
                <option v-for="departamento in storeDepartamento.departamentos" :key="departamento.id"
                  :value="departamento.id">
                  {{ departamento.titulo }}
                </option>
              </select>
              <ValidationError :errors="store.errors" field="departamento_id" />
            </div>

            <div class="flex flex-col gap-2 mb-4">
              <label for="email" class="required">Email</label>
              <input v-model="store.form.email" id="email" name="email" type="text" class="form-input"
                :disabled="store.loading" />
              <ValidationError :errors="store.errors" field="email" />
            </div>

            <div class="flex flex-col gap-2 mb-4">
              <label for="senha" class="required">Senha</label>
              <input v-model="store.form.senha" id="senha" name="senha" type="password" class="form-input"
                :disabled="store.loading" />
              <ValidationError :errors="store.errors" field="senha" />
            </div>

            <div class="flex flex-col gap-2 mb-4">
              <label for="confirmar_senha" class="required">Confirmar Senha</label>
              <input v-model="store.form.confirmar_senha" id="confirmar_senha" name="confirmar_senha" type="password"
                class="form-input" :disabled="store.loading" />
              <ValidationError :errors="store.errors" field="confirmar_senha" />
            </div>

            <div class="border-t h-[1px] my-6"></div>

            <div class="flex gap-2">
              <button type="submit" class="btn btn-primary w-full" :disabled="store.loading">
                <IconSpinner class="animate-spin" v-show="store.loading" />
                Salvar usuário
              </button>
              <RouterLink :to="{ name: 'usuarios.index' }" class="btn btn-secondary">
                Cancelar
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>