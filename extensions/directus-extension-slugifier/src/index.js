import InterfaceComponent from './interface.vue';

export default {
	id: 'slugifier',
	name: 'Slugifier',
	icon: 'link',
	description: 'Turns passed text into a slug with arabic alphaber support.',
	component: InterfaceComponent,
	options: null,
	types: ['string'],
	group: 'standard'
};
