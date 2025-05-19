import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

const BlockIdInspectorPanel = ({ setAttributes, blockId }) => {
	return (
		<InspectorControls>
			<PanelBody title="Block Settings">
				<TextControl
					label="Block ID"
					value={blockId}
					onChange={(newId) => {
						const sanitizedId = newId
							.toLowerCase()
							.replace(/\s+/g, '-')
							.replace(/[^a-z0-9-]/g, '');
						setAttributes({ blockId: sanitizedId });
					}}
					help="Enter a unique ID for this section (e.g. 'support-section-1'). Use only lowercase letters, numbers and hyphens"
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default BlockIdInspectorPanel;
