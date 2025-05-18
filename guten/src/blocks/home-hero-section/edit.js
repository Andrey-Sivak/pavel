import { useBlockProps, RichText } from '@wordpress/block-editor';
import {
	Card,
	CardBody,
	CardHeader,
	__experimentalVStack as VStack,
	__experimentalSpacer as Spacer,
} from '@wordpress/components';
import { Button } from '@wordpress/components';
import './editor.scss';
import { Fragment, useState } from '@wordpress/element';
import ImageUploader from '../../utils/ImageUploader.js';
import LinkEditor from '../../utils/LinkEditor.js';

const Edit = (props) => {
	const { attributes, setAttributes } = props;
	const { title, subtitle, button, image } = attributes;

	const [isButtonFocus, setIsButtonFocus] = useState(false);

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

	return (
		<Fragment>
			<div {...blockProps}>
				<Card>
					<CardHeader>
						<h4 className="pm-admin-section-title">Hero Section</h4>
					</CardHeader>
					<CardBody>
						<VStack style={{ gap: 20 }}>
							<div>
								<p className="pm-admin-label-text">
									Section Title:
								</p>
								<RichText
									tagName="p"
									className={``}
									value={title}
									onChange={(newTitle) =>
										setAttributes({ title: newTitle })
									}
									placeholder="Input section title..."
								/>
							</div>
							<div>
								<p className="pm-admin-label-text">
									Short Description:
								</p>
								<RichText
									tagName="p"
									className={``}
									value={subtitle}
									onChange={(newSubtitle) =>
										setAttributes({ subtitle: newSubtitle })
									}
									placeholder="Input short description..."
								/>
							</div>
							<div>
								<p className="pm-admin-label-text">Button:</p>
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
									<RichText
										tagName="span"
										className={`${baseClass}__button `}
										value={button.text}
										onChange={(newButtonText) =>
											setAttributes({
												button: {
													...button,
													text: newButtonText,
												},
											})
										}
										placeholder="Button text..."
										allowedFormats={[]}
									/>
								</LinkEditor>
							</div>
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
