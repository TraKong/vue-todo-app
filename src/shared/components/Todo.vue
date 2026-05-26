<template>
    <div class="todo" :class="{ completed: todo.isCompleted }">
        <input v-if="isBeingEdited" type="text" v-model="newTodo" @keyup.enter="handleSaveEdit(todo.id)" v-focus>
        <h3 v-else>{{ todo.title }}</h3>
        <div class="icons">
            <i v-if="todo.isCompleted" class="material-icons" @click="TodoStore.handleCompleted(todo.id)">
                close
            </i>
            <i v-else class="material-icons" @click="TodoStore.handleCompleted(todo.id)">
                check_circle
            </i>
            <i class="material-icons" @click="handleEditTodo(todo.id)">
                edit
            </i>
            <i class="material-icons" @click="showDeleteModal()">
                delete
            </i>
            <i class="material-icons" :class="{ active: todo.isFav }" @click="TodoStore.handleFavorite(todo.id)">
                favorite
            </i>
        </div>
        <transition name="toast">
            <Toast v-if="TodoStore.showToast" />
        </transition>
        <Transition name="modal">
            <ConfirmModal v-if="showModal" :title="todo.title" @close="showModal = false" @confirm="handleDeleteTodo(todo.id)" />
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import { vFocus } from '@/shared/directives/vFocus';
import { useTodoStore } from '@/shared/stores/TodoStore';
import type { Todo } from '@/shared/types/Todo.Interface';

const Toast = defineAsyncComponent(() => import('@/shared/components/Modals/ToastModal.vue'))
const ConfirmModal = defineAsyncComponent(() => import('@/shared/components/Modals/ConfirmModal.vue'))

const props = defineProps<{
    todo: Todo
}>()

const TodoStore = useTodoStore()

let showModal       = ref(false)
let isBeingEdited   = ref(false)
let newTodo         = ref(props.todo.title)

const handleEditTodo = (id: string) => {
    isBeingEdited.value = !isBeingEdited.value
}
const handleSaveEdit = (id: string) => {
    TodoStore.editTodo(id, newTodo.value)
    isBeingEdited.value = false
}

const showDeleteModal = () => {
    showModal.value = true
}

const handleDeleteTodo = (id: string)=>{
    TodoStore.deleteTodo(id)
    showModal.value = false
}
</script>

<style scoped>
.todo { padding: 10px 20px; background: #fff; margin-bottom: 20px; border-radius: 4px; box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.05); display: flex; justify-content: space-between; align-items: center; }

.completed { background: rgb(0, 131, 4); background: linear-gradient(90deg, rgba(0, 131, 4, 0.5522584033613445) 0%, rgba(255, 255, 255, 1) 100%); }

.todo h3,
.todo .icons { display: inline-block; }

.todo .icons { text-align: right; }

.todo i { font-size: 1.4em; margin-left: 6px; cursor: pointer; color: #bbb; }

.active { color: red !important; }
</style>