<template>
	<v-input :model-value="value" @update:model-value="handleChange" />
</template>

<script>
import slugify from '@sindresorhus/slugify';

export default {
	props: {
		value: {
			type: String,
			default: null,
		},
	},
	emits: ['input'],
	setup(props, { emit }) {
		return { handleChange };

		function handleChange(value) {
			if(!value) return
			const isArabic = /[\u0600-\u06FF]/;
			let slug = '';
			if(isArabic.test(value)){
				slug = slugifyArabic(value)
			}else{
				slug = slugify(value)
			}
			emit('input', slug);
		}

		function slugifyArabic(value){
			return value.toString().toLowerCase()
			.replace(/\s+/g, '-')
			.replace(/[^\w\u0621-\u064A0-9-]+/g, '')
			.replace(/\-\-+/g, '-')
			.replace(/^-+/, '').replace(/-+$/, '');
		}
	},
};
</script>