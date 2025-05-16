import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

const ImageUploader = ({
	image,
	onSelect,
	buttonText      = 'Add Image',
	allowedTypes    = ['image'],
}) => {
	const buttonClass = image
		? 'image-button'
		: 'button-secondary pm-admin-button';

	const Image   = ({ src }) => (
		< img
			src   = {src}
			alt   = "Катинка"
			style = {{ display: 'block', maxWidth: '100%' }}
		/ >
	);

	return (
		< MediaUploadCheck >
			< MediaUpload
				onSelect                     = {onSelect}
				allowedTypes                 = {allowedTypes}
				value                        = {image}
				render                       = {({ open }) => (
					< Button className       = {buttonClass} onClick = {open} >
						{image ? < Image src = {image} / > : buttonText}
					< / Button >
				)}
			/ >
		< / MediaUploadCheck >
	);
};

export default ImageUploader;
