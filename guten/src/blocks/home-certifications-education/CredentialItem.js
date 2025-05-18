import {
	Panel,
	PanelBody,
	PanelRow,
	Button,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { RichText } from '@wordpress/block-editor';
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
						<div>
							<p className="pm-admin-label-text">
								Certification Title:
							</p>
							<RichText
								tagName="p"
								value={item.title}
								onChange={(value) =>
									onChange({ ...item, title: value })
								}
								placeholder="Input certification title..."
							/>
						</div>
						<div>
							<p className="pm-admin-label-text">
								Certification Status:
							</p>
							<RichText
								tagName="p"
								value={item.status}
								onChange={(value) =>
									onChange({ ...item, status: value })
								}
								placeholder="e.g in progress/2022"
							/>
						</div>
						<div>
							<p className="pm-admin-label-text">Description:</p>
							<RichText
								tagName="p"
								value={item.description}
								onChange={(value) =>
									onChange({ ...item, description: value })
								}
								placeholder="Input certification description..."
							/>
						</div>
						<div>
							<p className="pm-admin-label-text">
								Institution/Organization:
							</p>
							<RichText
								tagName="p"
								value={item.institution}
								onChange={(value) =>
									onChange({ ...item, institution: value })
								}
								placeholder="Input institution name..."
							/>
						</div>
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
