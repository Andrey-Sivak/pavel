import {
	Panel,
	TextControl,
	PanelBody,
	PanelRow,
	Button,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import ImageUploader from '../../utils/ImageUploader.js';

const CredentialItem = ({ item, onChange, onRemove }) => {
	const onSelectLogo = (media) => {
		onChange({
			...item,
			logo: {
				id: media.id,
				url: media.url,
				alt: media.alt || '',
			},
		});
	};

	return (
		<Panel>
			<PanelBody
				title={
					item.title
						? `${item.title} (${item.status})`
						: 'New Certification'
				}
				initialOpen={false}
			>
				<PanelRow>
					<VStack style={{ gap: 15, width: '100%' }}>
						<div>
							<p className="pm-admin-label-text">
								Institution Logo:
							</p>
							<ImageUploader
								image={item.logo.url}
								onSelect={onSelectLogo}
							/>
						</div>
						<TextControl
							label="Certification Title:"
							value={item.title}
							onChange={(value) =>
								onChange({ ...item, title: value })
							}
							placeholder="Input certification title..."
						/>
						<TextControl
							label="Certification Status:"
							value={item.status}
							onChange={(value) =>
								onChange({ ...item, status: value })
							}
							placeholder="e.g in progress/2022"
						/>
						<TextControl
							label="Certification Description:"
							value={item.description}
							onChange={(value) =>
								onChange({ ...item, description: value })
							}
							placeholder="Input certification description..."
						/>
						<TextControl
							label="Institution/Organization:"
							value={item.institution}
							onChange={(value) =>
								onChange({ ...item, institution: value })
							}
							placeholder="Input institution name..."
						/>
						<Button isDestructive onClick={onRemove}>
							Remove Certificate
						</Button>
					</VStack>
				</PanelRow>
			</PanelBody>
		</Panel>
	);
};

export default CredentialItem;
