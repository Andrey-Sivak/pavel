import { useBlockProps, RichText } from '@wordpress/block-editor';
import './editor.scss';
import { Fragment } from '@wordpress/element';
import LinkEditor from '../../utils/LinkEditor.js';
import PrimaryButtonArrow from '../../common-components/PrimaryButtonArrow.js';

const Edit = (props) => {
	const { attributes, setAttributes } = props;
	const { title, subtitle, button } = attributes;

	const baseClass = 'wp-block-pavel-blog-hero-section';

	const blockProps = useBlockProps({
		className: baseClass,
	});

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
				<div
					className={`${baseClass}__bg ${baseClass}__bg-overlay-1`}
				/>
				<div
					className={`${baseClass}__bg ${baseClass}__bg-overlay-2`}
				/>

				<div className={`${baseClass}__wrapper pm-wrap`}>
					<div className={`${baseClass}__arrow-to-bottom`}>
						<svg
							width="70"
							height="70"
							viewBox="0 0 70 70"
							fill="none"
						>
							<path
								d="M20.4167 27.7084L35 42.2917L49.5834 27.7084"
								stroke="white"
								strokeWidth="4"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>

					<div className={`${baseClass}__content pm-container`}>
						<div className={`${baseClass}__content_text`}>
							<RichText
								tagName="p"
								className={`${baseClass}__title`}
								value={title}
								onChange={(newTitle) =>
									setAttributes({ title: newTitle })
								}
								placeholder="Input section title..."
							/>
							<RichText
								tagName="p"
								className={`${baseClass}__subtitle`}
								value={subtitle}
								onChange={(newSubtitle) =>
									setAttributes({ subtitle: newSubtitle })
								}
								placeholder="Input short description..."
							/>
							<div
								className={`${baseClass}__button pm-button pm-button-primary pm-button-admin`}
							>
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
										value={button.text}
										onChange={uprateButtonText}
										placeholder="Button text..."
										allowedFormats={[]}
									/>
								</LinkEditor>
								<PrimaryButtonArrow />
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Edit;
