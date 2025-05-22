import {
	Card,
	CardBody,
	CardHeader,
	Button,
	TextControl,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { useBlockProps } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import './editor.scss';
import ImageUploader from '../../utils/ImageUploader.js';
import SocialLink from './SocialLink.js';
import LinkEditor from '../../utils/LinkEditor.js';
import BlockIdInspectorPanel from '../../common-components/BlockIdInspectorPanel.js';

const Edit = (props) => {
	const { attributes, setAttributes } = props;
	const {
		heading,
		subtitle,
		profileImage,
		socialLinks,
		primaryButton,
		secondaryButton,
		blockId,
	} = attributes;

	const blockProps = useBlockProps({
		className: 'wp-block-pavel-contact-section',
	});

	const handleSelectProfileImage = (media) => {
		setAttributes({
			profileImage: {
				id: media.id,
				url: media.url,
			},
		});
	};

	const updateSocial = (index, property, value) => {
		const newSocials = [...socialLinks];
		if (typeof property === 'string') {
			newSocials[index] = {
				...newSocials[index],
				[property]: value,
			};
		} else {
			newSocials[index] = { ...newSocials[index], ...property };
		}
		setAttributes({ socialLinks: newSocials });
	};

	const addSocialLink = () => {
		setAttributes({
			socialLinks: [
				...socialLinks,
				{
					icon: { id: null, url: '' },
					url: '',
					target: '',
				},
			],
		});
	};

	const removeSocialLink = (index) => {
		const newSocialLinks = [...socialLinks];
		newSocialLinks.splice(index, 1);
		setAttributes({ socialLinks: newSocialLinks });
	};

	return (
		<Fragment>
			<BlockIdInspectorPanel
				setAttributes={setAttributes}
				blockId={blockId}
			/>
			<div {...blockProps}>
				<Card>
					<CardHeader>
						<h4 className="pm-admin-section-title">
							Contact Section
						</h4>
					</CardHeader>
					<CardBody>
						<VStack style={{ gap: 20 }}>
							<TextControl
								label="Section Heading:"
								value={heading}
								onChange={(newHeading) =>
									setAttributes({ heading: newHeading })
								}
								placeholder="Input section heading..."
							/>
							<TextControl
								label="Section Subtitle:"
								value={subtitle}
								onChange={(newSubtitle) =>
									setAttributes({ subtitle: newSubtitle })
								}
								placeholder="Input section subtitle..."
							/>

							<div className="pm-admin-image">
								<p className="pm-admin-label-text">Photo:</p>
								<ImageUploader
									image={profileImage.url}
									onSelect={handleSelectProfileImage}
								/>
							</div>

							<div>
								<p className="pm-admin-section-title">
									Social Links
								</p>
								{socialLinks.length > 0 ? (
									<div style={{ marginBottom: 20 }}>
										{socialLinks.map(
											(socialLink, index) => (
												<SocialLink
													item={socialLink}
													updateSocial={updateSocial}
													onRemove={() =>
														removeSocialLink(index)
													}
													key={index}
													index={index}
												/>
											),
										)}
									</div>
								) : (
									<p>
										No social links added yet. Add your
										first social link below.
									</p>
								)}
								<Button
									onClick={addSocialLink}
									className="button-secondary pm-admin-button"
								>
									Add Social Link
								</Button>
							</div>

							<p className="pm-admin-section-title">Buttons</p>
							<LinkEditor
								url={primaryButton.url}
								target={primaryButton.target}
								onChange={(newValue) =>
									setAttributes({
										primaryButton: {
											...newValue,
											text: primaryButton.text,
										},
									})
								}
							>
								<TextControl
									label="Primary Button"
									value={primaryButton.text}
									onChange={(newButtonText) => {
										setAttributes({
											primaryButton: {
												...primaryButton,
												text: newButtonText,
											},
										});
									}}
									placeholder="Button text..."
								/>
							</LinkEditor>

							<LinkEditor
								url={secondaryButton.url}
								target={secondaryButton.target}
								onChange={(newValue) =>
									setAttributes({
										secondaryButton: {
											...newValue,
											text: secondaryButton.text,
										},
									})
								}
							>
								<TextControl
									label="Secondary Button"
									value={secondaryButton.text}
									onChange={(newButtonText) => {
										setAttributes({
											secondaryButton: {
												...secondaryButton,
												text: newButtonText,
											},
										});
									}}
									placeholder="Button text..."
								/>
							</LinkEditor>
						</VStack>
					</CardBody>
				</Card>
			</div>
		</Fragment>
	);
};

export default Edit;
