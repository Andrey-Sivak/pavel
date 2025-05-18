import {
	Panel,
	PanelBody,
	PanelRow,
	TextControl,
	Button,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { RichText } from '@wordpress/block-editor';

const ServiceItem = ({ item, onChange, onRemove }) => {
	return (
		<Panel>
			<PanelBody
				title={item.title ? item.title : 'New Service'}
				initialOpen={false}
			>
				<PanelRow>
					<VStack style={{ gap: 15, width: '100%' }}>
						<div>
							<p className="pm-admin-label-text">
								Service Title:
							</p>
							<RichText
								tagName="p"
								value={item.title}
								onChange={(value) =>
									onChange({ ...item, title: value })
								}
								placeholder="Input service title..."
							/>
						</div>
						<div>
							<p className="pm-admin-label-text">
								Service Description:
							</p>
							<RichText
								tagName="p"
								value={item.description}
								onChange={(value) =>
									onChange({ ...item, description: value })
								}
								placeholder="Input service description..."
							/>
						</div>
						<Button isDestructive onClick={onRemove}>
							Remove Service
						</Button>
					</VStack>
				</PanelRow>
			</PanelBody>
		</Panel>
	);
};

export default ServiceItem;
