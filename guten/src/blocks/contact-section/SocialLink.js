import {
	Panel,
	PanelBody,
	PanelRow,
	Button,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import ImageUploader from '../../utils/ImageUploader.js';
import LinkEditor from '../../utils/LinkEditor.js';

const SocialLink = ({ item, updateSocial, onRemove, index }) => {
	const { icon, url, target } = item;

	const isOpen = () => !url || !icon.id;

	return (
		<Panel>
			<PanelBody
				title={url ? url : 'New Social Link'}
				initialOpen={isOpen()}
			>
				<PanelRow>
					<VStack style={{ width: '100%' }}>
						<LinkEditor
							url={url}
							target={target}
							onChange={updateSocial}
							index={index}
						>
							<ImageUploader
								image={icon.url}
								onSelect={(media) => {
									updateSocial(index, 'icon', {
										id: media.id,
										url: media.url,
									});
								}}
							/>
						</LinkEditor>
						<Button isDestructive onClick={onRemove}>
							Remove
						</Button>
					</VStack>
				</PanelRow>
			</PanelBody>
		</Panel>
	);
};

export default SocialLink;
