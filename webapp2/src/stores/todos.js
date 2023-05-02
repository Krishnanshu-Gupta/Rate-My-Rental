import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useTodosStore = defineStore('todos', () => {
    const loading = ref(false);
    const todos = ref([]);

    function loadTodos() {
        loading.value = true;
        return axios.get("/api/todos").then((_todos) => {
            todos.value = _todos.data.todos;
            loading.value = false;
        });
    }

    function updateTodo(todo) {
        const idx = todos.value.indexOf(todo);
        return axios.put(`/api/todos/${todo.id}`, todo).then((updatedTodo) => {
            todos.value[idx] = updatedTodo.data;
        });
    }

    function deleteTodo(todo) {
        const idx = todos.value.indexOf(todo);
        return axios.delete(`/api/todos/${todo.id}`).then(() => {
            todos.value.splice(idx, 1);
        });
    }

    function createTodo(todo) {
        return axios.post("/api/todos", todo).then((newTodo) => {
            todos.value.push(newTodo.data);
        });
    }
    
    return { loading, todos, loadTodos, updateTodo, deleteTodo, createTodo };
});