<template>
    <div class="spinner-container">
        <div class="spinner"></div>
    </div>
</template>

<style>
.spinner-container{ background-color: rgba(0, 0, 0, 0.441); width: 100%; height: 100%; position: fixed; z-index: 1; bottom: 0; right: 0; transition: opacity 0.3s ease; }
.spinner { width: 56px; height: 56px; border-radius: 50%; background: conic-gradient(#0000 10%, #4ab886); mask: radial-gradient(farthest-side, #0000 calc(100% - 9px), #000 0); -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 9px), #000 0); animation: spinner-zp9dbg 1s infinite linear; position: relative; top: 50%; left: 50%; transition: all 0.3s ease; }

@keyframes spinner-zp9dbg {
    to { transform: rotate(1turn); }
}
</style>