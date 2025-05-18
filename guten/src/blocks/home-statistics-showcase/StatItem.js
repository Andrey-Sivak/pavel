import {
	Button,
	__experimentalVStack as VStack,
	TextControl,
	Panel,
	PanelBody,
	PanelRow,
} from '@wordpress/components';

const StatItem = ({ item, onChange, onRemove }) => {
	return (
		<Panel>
			<PanelBody
				initialOpen={false}
				title={
					item.number
						? `${item.number} ${item.unit} - ${item.description.substring(0, 30)}...`
						: 'New Statistic'
				}
			>
				<PanelRow>
					<VStack style={{ gap: 15, width: '100%' }}>
						<TextControl
							label="Number"
							value={item.number}
							onChange={(value) =>
								onChange({ ...item, number: value })
							}
							placeholder="e.g. 250"
						/>
						<TextControl
							label="Unit"
							value={item.unit}
							onChange={(value) =>
								onChange({ ...item, unit: value })
							}
							placeholder="e.g. years"
						/>
						<TextControl
							label="Description"
							value={item.description}
							onChange={(value) =>
								onChange({ ...item, description: value })
							}
							placeholder="e.g. Projects Completed"
						/>
						<Button isDestructive onClick={onRemove}>
							Remove Statistic
						</Button>
					</VStack>
				</PanelRow>
			</PanelBody>
		</Panel>
	);
};

export default StatItem;
