import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';

const InspectorPanelImages = ({
	setAttributes,
	images,
	// title = 'Images',
}) => {
	const addText = 'Select Image';
	const removeText = 'Remove Image';

	const handleSelectImage = (media, field) => {
		setAttributes({ [field]: { id: media.id, url: media.url } });
	};

	const handleRemoveImage = (field) => {
		setAttributes({ [field]: { id: null, url: '' } });
	};

	return (
		<InspectorControls>
			<PanelBody title="Block Settings" initialOpen={true}>
				{images.map((image, index) => {
					const [field, value] = Object.entries(image)[0];
					return (
						<div className="background-image-control" key={index}>
							{value?.url ? (
								<div className="image-preview">
									<img
										src={value.url}
										style={{
											width: '100%',
											marginBottom: '10px',
										}}
									/>
									<Button
										isSecondary
										onClick={() => handleRemoveImage(field)}
									>
										{value?.settings?.removeText ||
											removeText}
									</Button>
								</div>
							) : (
								<MediaUploadCheck>
									<MediaUpload
										onSelect={(media) =>
											handleSelectImage(media, field)
										}
										allowedTypes={['image']}
										render={({ open }) => (
											<Button isPrimary onClick={open}>
												{value?.settings?.addText ||
													addText}
											</Button>
										)}
									/>
								</MediaUploadCheck>
							)}
						</div>
					);
				})}
			</PanelBody>
		</InspectorControls>
	);
};

export default InspectorPanelImages;
