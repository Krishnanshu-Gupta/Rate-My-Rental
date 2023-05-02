<script setup>
    import { useTodosStore } from '@/stores/todos';
    import { onMounted, reactive } from 'vue';
    const todosStore = useTodosStore();

    const state = reactive({
        newTodo: {
            done: false,
            task: ''
        }
    })
    
    function todoChanged(todo) {
       todosStore.updateTodo(todo);
    }

    onMounted(() => {
        todosStore.loadTodos();
    });

    function createTodo() {
        todosStore.createTodo(state.newTodo).then(() => {
            state.newTodo = { done: false, task: ''};
        });
    }
</script>
<template>
    <main>
        <h1 class="text-h1">Todos</h1>
        <v-table density="compact">
            <thead>
            <tr>
                <th class="text-left">
                
                </th>
                <th class="text-left">
                Task
                </th>
                <th>

                </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="todo in todosStore.todos"
                :key="todo.id"
            >
                <td><v-checkbox v-model="todo.done" @change="todoChanged(todo)"/></td>
                <td>{{ todo.task }}</td>
                <td></td>
            </tr>
            <tr>
                <td><v-checkbox v-model="state.newTodo.done"/></td>
                <td><v-text-field variant="plain" v-model="state.newTodo.task"/></td>
                <td><v-btn @click="createTodo">Create</v-btn></td>
            </tr>
            </tbody>
        </v-table>
    </main>
</template>