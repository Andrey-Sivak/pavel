import {
	Card,
	TextControl,
	CardBody,
	CardHeader,
	Button,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { useBlockProps } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import ExperienceItem from './ExperienceItem.js';
import './editor.scss';
import LinkEditor from '../../utils/LinkEditor.js';

const Edit = (props) => {
	const { attributes, setAttributes } = props;
	const { heading, subheading, button, experiences } = attributes;

	const blockProps = useBlockProps({
		className: 'wp-block-pavel-home-experience-timeline',
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
			<div {...blockProps}>
				<Card>
					<CardHeader>
						<h4 className="pm-admin-section-title">
							Experience Timeline
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
								label="Section Subheading:"
								value={subheading}
								onChange={(newSubheading) =>
									setAttributes({
										subheading: newSubheading,
									})
								}
								placeholder="Input subheading..."
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
