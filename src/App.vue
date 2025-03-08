<script setup>
import { watch, onMounted, ref } from "vue";
import TaskForm from "./components/TaskForm.vue";
import TaskList from "./components/TaskList.vue";

//tarefas
const tasks = ref([]);

onMounted(() => {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks).map((task) => ({
      ...task,
      completed: false,
    }));
  }
});

watch(
  tasks,
  (newtasks) => {
    localStorage.setItem("tasks", JSON.stringify(newtasks));
  },
  { deep: true }
);

const addTask = (task) => {
  tasks.value.push({ id: Date.now(), text: task, completed: false });
};

const removeTask = (taskId) => {
  tasks.value = tasks.value.filter((task) => task.id !== taskId);
};

const toggleTask = (taskId) => {
  tasks.value = tasks.value.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
};

const editTask = (taskId, newText) => {
  tasks.value = tasks.value.map((task) =>
    task.id === taskId ? { ...task, text: newText } : task
  );
};
</script>

<template>
  <div>
    <h1>Tarefas</h1>
    <TaskForm @add-task="addTask" />
    <TaskList
      :tasks="tasks"
      @remove-task="removeTask"
      @toggle-task="toggleTask"
      @edit-task="editTask"
    />
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  color: #42b983;
}
</style>
