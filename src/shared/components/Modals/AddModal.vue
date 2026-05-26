<template>
    <div class="modal-container" v-if="showModal">
        <div class="modal">
            <label for="todo-input">{{ $t('main.addTodo') }}: </label>
            <input type="text" id="todo-input" v-model="newTodo" @keyup.enter="handleAddTodo" v-focus>
            <br>
            <div class="d-flex justify-content-between">
                <button class="button" @click="$emit('close')">{{ $t('main.cancel') }}</button>
                <button class="button" @click="handleAddTodo">{{ $t('main.add') }}</button>
            </div>
        </div>
        <transition name="modal">
            <AlertModal v-if="showAlert" />
        </transition>
    </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';
import { vFocus } from '@/shared/directives/vFocus'
import { useTodoStore } from '@/shared/stores/TodoStore';

const AlertModal = defineAsyncComponent(() => import('./AlertModal.vue'))

const props = defineProps<{
    showModal: boolean
}>()
const emit = defineEmits(['close'])
const TodoStore = useTodoStore()

let newTodo     = ref('')
let showAlert   = ref(false)

const handleAddTodo = () => {
    if (newTodo.value == '') {
        showAlert.value = true
        setTimeout(() => showAlert.value = false, 1000)
    } else {
        TodoStore.addTodo(newTodo.value)
        emit('close')
        newTodo.value = ''
    }
}
</script>

<style>
.modal-container { background-color: rgba(0, 0, 0, 0.441); /* position: absolute; */ position: fixed; z-index: 1; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; padding: 2rem; transition: opacity 0.3s ease; }
.modal { background-color: white; padding: 2rem; border-radius: 4px; box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1); transition: all 0.3s ease; }
input { padding: 0.5rem 1rem; border-radius: 4px; border: 1px solid gray; margin: 2rem; outline: none; }
</style>