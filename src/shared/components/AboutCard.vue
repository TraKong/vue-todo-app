<template>
    <div class="about-list">
        <ul class="list">
            <li class="list-item">JS framework : {{technologies.framework}}</li>
            <li class="list-item">State Management: {{technologies.state}}</li>
            <li class="list-item">Scripting: {{technologies.script}}</li>
            <li class="list-item">Database: {{technologies.database}}</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import type { Technologies } from '@/shared/types/Technologies.Interface';

const technologies  = <Technologies>inject('technologies');

</script>

<style scoped>
.about .about-list { padding: 2rem; border-radius: 8px; border: 1px solid rgba(98, 98, 98, 0.212); }

li { list-style-type: circle; }

ul { line-height: 1.5; margin-left: -40px; list-style-position: inside; }

ul li:not(:last-child) { margin-bottom: 20px; }
</style>