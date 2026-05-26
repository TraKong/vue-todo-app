<template>
    <div class="toast-container">
        <p>{{ $t('notification.delete') }}</p>
    </div>
</template>

<style>
.toast-container { background-color: #ff00003d; padding: 1.5rem 2rem; margin: 1.5rem; border-radius: 4px; box-shadow: 2px 4px 6px rgb(0 0 0 / 5%); position: fixed; z-index: 1; bottom: 0; right: 0; }

.toast-container p { color: white; }

.toast-enter-from { opacity: 0; transform: translateX(30px) }

.toast-enter-to { opacity: 1; transform: translateX(0) }

.toast-enter-active { transition: all 0.2s ease; }

.toast-leave-from { opacity: 1; transform: translateX(0) }

.toast-leave-to { opacity: 0; transform: translateX(30px) }

.toast-leave-active { transition: all 0.2s ease; }
</style>