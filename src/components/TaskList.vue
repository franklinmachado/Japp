<script setup>
defineProps({
  tasks: Array,
});

const emit = defineEmits(["toggle-task", "remove-task", "edit-task"]);
let editingId = null;
let editText = "";

// Função que ativa o modo de edição
const startingEdit = (task) => {
  editingId = task.id;
  editText = task.text;
  emit("edit-task", task.id, editText);
};

// Função que salva a edição
const saveEdit = () => {
  if (editText.trim()) {
    emit("edit-task", editingId, editText);
    editingId = null;
    editText = "";
  }
};
</script>

<template>
  <div>
    <h2>Lista de Tarefas</h2>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <!-- Checkbox responsável apenas por marcar ou desmarcar a tarefa -->
        <input
          type="checkbox"
          :checked="task.completed"
          @change="emit('toggle-task', task.id)"
        />

        <!-- Exibir o texto da tarefa normalmente -->
        <span
          v-show="editingId !== task.id"
          :class="{ completed: task.completed }"
        >
          {{ task.text }}
        </span>

        <!-- Campo de edição visível quando em modo de edição -->
        <input v-if="editingId === task.id" v-model="editText" />

        <!-- Botão de edição separado do checkbox -->
        <button v-if="editingId !== task.id" @click="startingEdit(task)">
          Editar
        </button>

        <!-- Botão de salvar quando estiver editando -->
        <button v-if="editingId === task.id" @click="saveEdit">Salvar</button>

        <!-- Botão de remover tarefa -->
        <button @click="emit('remove-task', task.id)">x</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
h2 {
  color: #333;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  padding: 8px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.completed {
  text-decoration: line-through;
  color: gray;
}
button {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}
button:hover {
  background-color: darkred;
}
input[type="text"] {
  margin-right: 10px;
}
</style>
