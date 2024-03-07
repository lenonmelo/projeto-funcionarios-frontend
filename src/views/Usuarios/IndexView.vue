<script setup>
import { onMounted } from "vue";
import { useUsuario } from "@/stores/usuario";
import { useDepartamento } from "@/stores/departamento";

const storeDepartamento = useDepartamento();
const store = useUsuario();

const deleteUsuario = (usuario) => {
  let deleteConfirmation = confirm("Tem certeza que deseja deletar esse usuario?");

  if (deleteConfirmation) {
    store.deleteUsuario(usuario)
  }
}

const filtrarUsuarios = () => {
  // Construa o filtro com base no centro de custo selecionado
  let departamento_id = store.form.departamento_id;

  if (departamento_id != "") {
    // Execute o endpoint de filtro
    store.getFilterByDepartamento(departamento_id);
  } else {
    store.getUsuarios();
  }
}
onMounted(store.getUsuarios);
onMounted(storeDepartamento.getAllDepartamentos);
</script>
 
<template>
  <div class="container">
    <div class="flex flex-col mx-auto col-10">
      <h1 class="text-2xl font-bold mb-4 text-center">Meus usuários</h1>
      <div class="col-4  center-horizontally">
        <RouterLink :to="{ name: 'usuarios.create' }" class="btn btn-primary w-full">
          Novo usuarios
        </RouterLink>
        <div class="border-t h-[1px] my-6"></div>
        <RouterLink :to="{ name: 'usuarios.importar' }" class="btn btn-primary w-full">
          Importar lista de usuários
        </RouterLink>
        <div class="border-t h-[1px] my-6"></div>
        <h1 class="text-2xl text-center">Filtro</h1>
        <div class="flex flex-col gap-2 mb-4">
          <label for="centro_custo_id">Departamentos</label>
          <select v-model="store.form.departamento_id" class="form-input" :disabled="store.loading">
            <option value="">Selecione um departamento</option>
            <option v-for="departamento in storeDepartamento.departamentos" :key="departamento.id"
              :value="departamento.id">
              {{ departamento.titulo }}
            </option>
          </select>
        </div>
        <button @click="filtrarUsuarios" class="btn btn-primary w-full">
          Filtrar
        </button>
      </div>
      <div class="border-t h-[1px] my-6"></div>
      <div class="card">
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Cargo</th>
                <th>Departamento</th>
                <th>Centro de custo</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="usuario in store.usuarios" :key="usuario.id">
                <th scope="row">{{ usuario.id }}</th>
                <td>{{ usuario.nome }}</td>
                <td>{{ usuario.email }}</td>
                <td>{{ usuario.cargo }}</td>
                <td>{{ usuario.departamento }}</td>
                <td>{{ usuario.centro_custo }}</td>
                <td>
                  <RouterLink :to="{ name: 'usuarios.edit', params: { id: usuario.id } }"
                    class="btn btn-secondary text-sm">
                    Alterar
                  </RouterLink>
                  <button @click="deleteUsuario(usuario)" type="button"
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