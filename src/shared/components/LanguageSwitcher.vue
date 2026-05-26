<template>
	<select v-model="locale" @change="handleChangeLocale">
		<option v-for="supportedLocale in supportedLocales" :value="supportedLocale">
			{{ $t(`navigation.${supportedLocale}`) }}
		</option>
	</select>
	<Transition name="modal">
		<LoadingModal v-if="showLoading" />
	</Transition>
</template>

<script lang="ts">
import { getSupportedLocale } from '@/shared/utils/i18n';
import LoadingModal from '@/shared/components/Modals/LoadingModal.vue'
export default {
	components: { LoadingModal },
	data() {
		return {
			locale			: this.$i18n.locale,
			supportedLocales: getSupportedLocale,
			showLoading		: false
		}
	},
	methods: {
		handleChangeLocale() {
			this.$i18n.locale = this.locale;
			localStorage.setItem("setLocale", this.locale);
			this.showLoading = true;
			setTimeout(() => (this.showLoading = false), 500);
		},
	}
}
</script>

<style scoped>
select { border: none; padding: 0; color: inherit; font-size: 1.2rem; background-color: transparent; outline: none; line-height: 1.6; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; }
</style>