<script setup>
import { onBeforeUnmount } from "vue";
import { useLogin } from "@/stores/login";
 
const store = useLogin();
 
onBeforeUnmount(store.resetForm);
</script>
 
<template>
  <form @submit.prevent="store.handleSubmit" novalidate>
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Login</h1>
      <div class="flex flex-col gap-2 mb-4">
        <label for="email" class="required">Email</label>
        <input
          v-model="store.form.email"
          id="email"
          name="email"
          type="text"
          class="form-input"
          autofocus
          autocomplete="email"
          required
          :disabled="store.loading"
        />
        <ValidationError :errors="store.errors" field="email" />
      </div>
 
      <div class="flex flex-col gap-2 mb-4">
        <label for="password" class="required">Senha</label>
        <input
          v-model="store.form.password"
          id="password"
          name="password"
          type="password"
          class="p-1 border bg-gray-100"
          autocomplete="current-password"
          required
          :disabled="store.loading"
        />
        <ValidationError :errors="store.errors" field="password" />
      </div>
 
 
      <div class="border-t h-[1px] my-6"></div>
 
      <div class="flex flex-col gap-2">
        <button type="submit" class="btn btn-primary" :disabled="store.loading">
          <IconSpinner class="animate-spin" v-show="store.loading" />
          Login
        </button>
      </div>
    </div>
  </form>
</template>