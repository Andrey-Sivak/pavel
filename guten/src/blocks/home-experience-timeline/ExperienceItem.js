import {
	Button,
	PanelBody,
	PanelRow,
	TextControl,
	TextareaControl,
	Panel,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import ImageUploader from '../../utils/ImageUploader.js';

const ExperienceItem = ({ item, onChange, onRemove }) => {
	const updateLogo = (media) => {
		onChange({
			...item,
			logo: {
				id: media.id,
				url: media.url,
			},
		});
	};

	return (
		<Panel>
			<PanelBody
				title={
					item.timeline
						? `${item.timeline} - ${item.description.substring(0, 30)}...`
						: 'New Experience'
				}
				initialOpen={false}
			>
				<PanelRow>
					<VStack style={{ gap: 15, width: '100%' }}>
						<div>
							<p className="pm-admin-label-text">Company Logo:</p>
							<ImageUploader
								image={item.logo.url}
								onSelect={updateLogo}
							/>
						</div>

						<TextControl
							label="Timeline:"
							value={item.timeline}
							onChange={(timeline) =>
								onChange({ ...item, timeline })
							}
							placeholder="e.g. 2020 - Present"
						/>

						<TextareaControl
							label="Description:"
							value={item.description}
							onChange={(description) =>
								onChange({ ...item, description })
							}
							placeholder="Describe your role and responsibilities..."
						/>
						<Button isDestructive onClick={onRemove}>
							Remove
						</Button>
					</VStack>
				</PanelRow>
			</PanelBody>
		</Panel>
	);
};

export default ExperienceItem;
