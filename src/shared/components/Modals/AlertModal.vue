<template>
    <div class="modal-container">
        <div class="modal alert-modal">
            <p>{{ $t('main.emptyTaskName') }}</p>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.alert-modal { background-color: rgb(255, 101, 101); padding: 1rem; color: white; }
</style>