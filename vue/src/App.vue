<script setup>
import { onMounted, ref, watch } from "vue";

// État réactif
const todoList = ref([]);
const newTodo = ref("");

// Récupération des todos du localStorage
const getTodos = () => {
  const savedTodos = window.localStorage.getItem("todoList");
  if (savedTodos) {
    todoList.value = JSON.parse(savedTodos);
  } else {
    todoList.value = [
      { text: "Cliquez sur un todo pour le supprimer", checked: false },
    ];
  }
};

// Sauvegarde des todos dans le localStorage
const storeTodos = () => {
  window.localStorage.setItem("todoList", JSON.stringify(todoList.value));
};

// Ajout d'un nouveau todo
const addTodo = (e) => {
  e.preventDefault();

  if (newTodo.value.length >= 2) {
    todoList.value.push({
      text: newTodo.value,
      checked: false,
    });
    newTodo.value = "";
  }
};

// Gestion du clic sur un todo
const toggleTodo = (index) => {
  const todo = todoList.value[index];
  if (todo.checked) {
    todoList.value = todoList.value.filter((_, i) => i !== index);
  } else {
    todo.checked = true;
  }
};

// Observer les changements de la liste pour mettre à jour le localStorage
watch(todoList, storeTodos, { deep: true });

// Charger les todos au montage du composant
onMounted(getTodos);
</script>

<template>
  <div class="container">
    <h1>To Do des ESGI</h1>
    <form @submit="addTodo">
      <input
        v-model="newTodo"
        type="text"
        placeholder="À faire"
        autocomplete="off"
        minlength="2" />
    </form>
    <ul>
      <li
        v-for="(todo, index) in todoList"
        :key="index"
        @click="toggleTodo(index)"
        :class="{ checked: todo.checked }">
        {{ todo.text }}
      </li>
    </ul>
  </div>
</template>
