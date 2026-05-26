<template>
  <div>
    <div class="button" @click="showModal = true">
      <p>{{ $t('main.addMore') }}</p>
      <i class="material-icons">add</i>
    </div>
    <Transition name="modal">
      <AddModal :showModal="showModal" @close="showModal = false" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';
const AddModal = defineAsyncComponent(() => import('@/shared/components/Modals/AddModal.vue'))

let showModal = ref(false)
</script>

<style>
.button { display: flex; align-items: center; padding: 10px 20px; background: #fff; border-radius: 4px; box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.05); cursor: pointer; border: none; }
.button:hover{ background: rgb(240, 240, 240); }

/* Transition */
.modal-enter-from { opacity: 0; }

.modal-leave-to { opacity: 0; }

.modal-enter-from .modal-container,
.modal-leave-to .modal-container { -webkit-transform: scale(1.1); transform: scale(1.1); }
</style>