import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

import Edit from './edit.js';
import metadata from './block.json';

registerBlockType(metadata.name, {
	...metadata,
	icon: {
		background: '#fff',
		foreground: '#00A8E8',
		src: 'portfolio',
	},
	edit: Edit,
	save: () => {
		return null;
	},
});
