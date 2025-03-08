<script setup>
import { ref } from "vue";

const newTask = ref("");

const emit = defineEmits(["add-task"]);

const addTask = () => {
  if (newTask.value.trim() !== "") {
    emit("add-task", newTask.value);
    newTask.value = "";
  }
};
</script>

<template>
  <form @submit.prevent="addTask">
    <input v-model="newTask" type="text" placeholder="Digite uma nova tarefa" />
    <button type="submit">Adicionar</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 8px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
</style>
