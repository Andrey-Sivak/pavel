import {
	Card,
	TextControl,
	CardBody,
	CardHeader,
	Button,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import ExperienceItem from './ExperienceItem.js';
import './editor.scss';
import LinkEditor from '../../utils/LinkEditor.js';
import BlockIdInspectorPanel from '../../common-components/BlockIdInspectorPanel.js';

const Edit = (props) => {
	const { attributes, setAttributes } = props;
	const { heading, subheading, button, experiences, blockId } = attributes;

	const baseClass = 'wp-block-pavel-home-experience-timeline';

	const blockProps = useBlockProps({
		className: baseClass,
	});

	const updateExperience = (index, newExperienceData) => {
		const newExperiences = [...experiences];
		newExperiences[index] = newExperienceData;
		setAttributes({ experiences: newExperiences });
	};

	const addExperience = () => {
		setAttributes({
			experiences: [
				...experiences,
				{
					logo: {
						id: null,
						url: '',
					},
					timeline: '',
					description: '',
				},
			],
		});
	};

	const removeExperience = (index) => {
		const newExperiences = [...experiences];
		newExperiences.splice(index, 1);
		setAttributes({ experiences: newExperiences });
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
			<BlockIdInspectorPanel
				setAttributes={setAttributes}
				blockId={blockId}
			/>
			<div {...blockProps}>
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
					className={`${baseClass}__subheading`}
					value={subheading}
					onChange={(newSubheading) =>
						setAttributes({
							subheading: newSubheading,
						})
					}
					placeholder="Input subheading..."
				/>
				<Card>
					<CardHeader>
						<h4 className="pm-admin-section-title">
							Experience Timeline
						</h4>
					</CardHeader>
					<CardBody>
						<VStack style={{ gap: 20 }}>
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

							<h4 className="pm-admin-section-title">
								Experience Items
							</h4>

							{experiences.length > 0 ? (
								<div className="experience-items">
									{experiences.map((experience, index) => (
										<ExperienceItem
											key={index}
											item={experience}
											onChange={(newData) =>
												updateExperience(index, newData)
											}
											onRemove={() =>
												removeExperience(index)
											}
										/>
									))}
								</div>
							) : (
								<p>
									No experience items added yet. Add your
									first experience below.
								</p>
							)}

							<Button
								onClick={addExperience}
								className="button-secondary pm-admin-button"
							>
								Add Experience
							</Button>
						</VStack>
					</CardBody>
				</Card>
			</div>
		</Fragment>
	);
};

export default Edit;
