<template>
    <div class="todos">
        <Transition name="modal">
            <LoadingModal v-if="isLoading" />
        </Transition>
        <transition-group name="list" tag="div">
            <Todo v-for="todo in getAllFavorites" :key="`todo-${todo.id}`" :todo="todo" />
        </transition-group>
        <transition-group name="list" tag="div">
            <div v-if="getAllFavorites.length == 0" class="empty-list">
                <span>
                    {{$t('main.noTask')}}
                </span>
            </div>
        </transition-group>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { defineAsyncComponent, onMounted } from 'vue';
import { useTodoStore } from '@/shared/stores/TodoStore'

const Todo          = defineAsyncComponent(() => import('@/shared/components/Todo.vue'))
const LoadingModal  = defineAsyncComponent(() => import('@/shared/components/Modals/LoadingModal.vue'))

const todoStore = useTodoStore()

const { getAllFavorites, isLoading } = storeToRefs(todoStore)

onMounted(() => { todoStore.getTodos() })
</script>

<style>
.todos { padding: 2rem 2rem 1rem 2rem; border-radius: 8px; border: 1px solid rgba(98, 98, 98, 0.212); }
@media screen and (max-width: 768px) {
    .todos { padding: 1rem 1rem 0.5rem 1rem; }
}
.empty-list{ margin-bottom: 20px; text-align: center; }
</style>