<template>
    <div class="modal-container">
        <div class="modal">
            <h4>{{$t('main.confirmDelete', {todo: title})}}</h4>
            <br>
            <div class="d-flex justify-content-between">
                <button class="button" @click="$emit('close')">{{ $t('main.cancel') }}</button>
                <button class="button" @click="$emit('confirm')">{{$t('main.confirm')}}</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    title: string
}>()
const emit = defineEmits(['close','confirm'])
</script>