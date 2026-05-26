<template>
    <header>
        <div class="d-flex align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 261.76 226.69"  xmlns:v="https://vecta.io/nano"><path d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.688L261.749.001z" fill="#41b883"/><path d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.398.001z" fill="#34495e"/></svg>
            <h1>{{ $t('navigation.appTitle') }}</h1>
        </div>
        <div class="d-flex align-items-center">
            <router-link :to="{ name: 'home' }">{{ $t('navigation.home') }}</router-link>
            <router-link :to="{ name: 'about' }">{{ $t('navigation.about') }}</router-link>

            <LanguageSwitcher />
        </div>
    </header>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import LanguageSwitcher from "@/shared/components/LanguageSwitcher.vue"

</script>

<style>
header { display: flex; justify-content: space-between; margin-bottom: 2rem; }

header a { color: inherit; text-decoration: none; font-size: 1.2rem; margin: 0 0.5rem; }
</style>