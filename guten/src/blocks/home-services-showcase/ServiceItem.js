import {
	Panel,
	PanelBody,
	PanelRow,
	TextControl,
	Button,
	__experimentalVStack as VStack,
} from '@wordpress/components';

const ServiceItem = ({ item, onChange, onRemove }) => {
	return (
		<Panel>
			<PanelBody
				title={item.title ? item.title : 'New Service'}
				initialOpen={false}
			>
				<PanelRow>
					<VStack style={{ gap: 15, width: '100%' }}>
						<TextControl
							label="Service Title:"
							value={item.title}
							onChange={(value) =>
								onChange({ ...item, title: value })
							}
							placeholder="Input service title..."
						/>
						<TextControl
							label="Service Description:"
							value={item.description}
							onChange={(value) =>
								onChange({ ...item, description: value })
							}
							placeholder="Input service description..."
						/>
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
