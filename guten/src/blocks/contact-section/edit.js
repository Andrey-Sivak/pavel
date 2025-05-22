import {
	Card,
	CardBody,
	CardHeader,
	Button,
	TextControl,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import './editor.scss';
import ImageUploader from '../../utils/ImageUploader.js';
import SocialLink from './SocialLink.js';
import LinkEditor from '../../utils/LinkEditor.js';
import BlockIdInspectorPanel from '../../common-components/BlockIdInspectorPanel.js';
import PrimaryButtonArrow from '../../common-components/PrimaryButtonArrow.js';

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

	const baseClass = 'wp-block-pavel-contact-section';

	const blockProps = useBlockProps({
		className: baseClass,
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
				<div className={`${baseClass}__wrap pm-wrap`}>
					<div className={`${baseClass}__content pm-container`}>
						<div className={`${baseClass}__photo`}>
							<ImageUploader
								image={profileImage.url}
								onSelect={handleSelectProfileImage}
							/>
						</div>

						<div className={`${baseClass}__content-inner`}>
							<RichText
								tagName="p"
								className={`${baseClass}__heading pm-section-heading`}
								value={heading}
								onChange={(newHeading) =>
									setAttributes({ heading: newHeading })
								}
								placeholder="Input section heading..."
							/>
							<RichText
								tagName="p"
								className={`${baseClass}__subtitle`}
								value={subtitle}
								onChange={(newSubtitle) =>
									setAttributes({ subtitle: newSubtitle })
								}
								placeholder="Input section subtitle..."
							/>

							<div className={`${baseClass}__socials`}>
								{socialLinks.length > 0 ? (
									socialLinks.map((socialLink, index) => (
										<SocialLink
											item={socialLink}
											updateSocial={updateSocial}
											onRemove={() =>
												removeSocialLink(index)
											}
											baseClass={baseClass}
											key={index}
											index={index}
										/>
									))
								) : (
									<p>
										No social links added yet. Add your
										first social link.
									</p>
								)}
								<Button
									onClick={addSocialLink}
									className="button-secondary pm-admin-button"
								>
									{socialLinks.length > 0
										? '+'
										: 'Add Social Link'}
								</Button>
							</div>

							<div className={`${baseClass}__buttons`}>
								<div
									className={`${baseClass}__button pm-button pm-button-primary pm-button-admin`}
								>
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
										<RichText
											tagName="span"
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
											allowedFormats={[]}
										/>
									</LinkEditor>
									<PrimaryButtonArrow />
								</div>
								<div
									className={`${baseClass}__button pm-button pm-button-secondary pm-button-admin`}
								>
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
										<RichText
											tagName="span"
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
											allowedFormats={[]}
										/>
									</LinkEditor>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Edit;
