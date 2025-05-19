import { useBlockProps } from '@wordpress/block-editor';
import {
	Card,
	CardBody,
	CardHeader,
	TextControl,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import './editor.scss';
import { Fragment } from '@wordpress/element';
import ImageUploader from '../../utils/ImageUploader.js';
import LinkEditor from '../../utils/LinkEditor.js';

const Edit = (props) => {
	const { attributes, setAttributes } = props;
	const { title, subtitle, button, image } = attributes;

	const baseClass = 'wp-block-pavel-home-hero-section';

	const blockProps = useBlockProps({
		className: baseClass,
	});

	const onSelectImage = (media) => {
		setAttributes({
			image: {
				id: media.id,
				url: media.url,
				alt: media.alt || '',
			},
		});
	};

	const uprateButtonText = (newButtonText) => {
		setAttributes({
			button: {
				...button,
				text: newButtonText,
			},
		});
	};

	return (
		<Fragment>
			<div {...blockProps}>
				<Card>
					<CardHeader>
						<h4 className="pm-admin-section-title">Hero Section</h4>
					</CardHeader>
					<CardBody>
						<VStack style={{ gap: 20 }}>
							<TextControl
								label="Section Title:"
								value={title}
								onChange={(newTitle) =>
									setAttributes({ title: newTitle })
								}
								placeholder="Input section title..."
							/>
							<TextControl
								label="Short Description:"
								value={subtitle}
								onChange={(newSubtitle) =>
									setAttributes({ subtitle: newSubtitle })
								}
								placeholder="Input short description..."
							/>
							<LinkEditor
								url={button.url}
								target={button.target}
								onChange={(newValue) =>
									setAttributes({
										button: {
											...newValue,
											text: button.text,
										},
									})
								}
							>
								<TextControl
									label="Button text"
									value={button.text}
									onChange={uprateButtonText}
									placeholder="Button text..."
								/>
							</LinkEditor>
							<div>
								<p className="pm-admin-label-text">Image:</p>
								<ImageUploader
									image={image.url}
									onSelect={onSelectImage}
								/>
							</div>
						</VStack>
					</CardBody>
				</Card>
			</div>
		</Fragment>
	);
};

export default Edit;
