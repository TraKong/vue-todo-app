<template>
	<div class="todos">
		<Transition name="modal">
			<LoadingModal v-if="isLoading" />
		</Transition>
		<transition-group name="list" tag="div">
			<Todo v-for="todo in todos" :key="`todo-${todo}`" :todo="todo" />
		</transition-group>
		<transition-group name="list" tag="div">
			<div v-if="todos.length == 0" class="empty-list">
				<span>
					{{ $t('main.noTask') }}
				</span>
			</div>
		</transition-group>
	</div>
</template>

<script setup lang="ts">
	import { storeToRefs } from 'pinia';
import { useTodoStore } from '@/shared/stores/TodoStore'
import { defineAsyncComponent, onMounted } from 'vue';

const Todo 			= defineAsyncComponent(() => import('@/shared/components/Todo.vue'))
const LoadingModal 	= defineAsyncComponent(() => import('@/shared/components/Modals/LoadingModal.vue'))
const todoStore 	= useTodoStore()

const { todos, isLoading } = storeToRefs(todoStore)

onMounted(() => { todoStore.getTodos() })
</script>

<style>
.todos { padding: 2rem 2rem 1rem 2rem; border-radius: 8px; border: 1px solid rgba(98, 98, 98, 0.212); }

@media screen and (max-width: 768px) {
	.todos { padding: 1rem 1rem 0.5rem 1rem; }
}

.list-enter-from { opacity: 0; transform: translateX(-30px) }

.list-enter-to { opacity: 1; transform: translateX(0) }

.list-enter-active { transition: all 0.2s ease; }

.list-leave-from { opacity: 1; transform: translateX(0) }

.list-leave-to { opacity: 0; transform: translateX(-30px) }

.list-leave-active { transition: all 0.2s ease; }
</style>