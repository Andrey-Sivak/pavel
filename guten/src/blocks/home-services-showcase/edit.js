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
import ServiceItem from './ServiceItem.js';
import './editor.scss';
import BlockIdInspectorPanel from '../../common-components/BlockIdInspectorPanel.js';

const Edit = (props) => {
	const { attributes, setAttributes } = props;
	const {
		heading,
		subheading,
		description,
		blockId,
		servicesLabel,
		services,
	} = attributes;

	const blockProps = useBlockProps({
		className: 'wp-block-pavel-home-services-showcase',
	});

	const updateService = (index, newServiceData) => {
		const newServices = [...services];
		newServices[index] = newServiceData;
		setAttributes({ services: newServices });
	};

	const addService = () => {
		setAttributes({
			services: [
				...services,
				{
					title: '',
					description: '',
				},
			],
		});
	};

	const removeService = (index) => {
		const newServices = [...services];
		newServices.splice(index, 1);
		setAttributes({ services: newServices });
	};

	return (
		<Fragment>
			<BlockIdInspectorPanel
				setAttributes={setAttributes}
				blockId={blockId}
			/>
			<div {...blockProps}>
				<Card>
					<CardHeader>
						<h4 className="pm-admin-section-title">
							Services Showcase
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
							<TextControl
								label="Description:"
								value={description}
								onChange={(newDescription) =>
									setAttributes({
										description: newDescription,
									})
								}
								placeholder="Input description..."
							/>
							<TextControl
								label="Services Label:"
								value={servicesLabel}
								onChange={(newServicesLabel) =>
									setAttributes({
										servicesLabel: newServicesLabel,
									})
								}
								placeholder="Input services label (e.g. 'My Services')..."
							/>

							<h4 className="pm-admin-section-title">Services</h4>

							{services.length > 0 ? (
								<div className="services-items">
									{services.map((service, index) => (
										<ServiceItem
											key={index}
											item={service}
											onChange={(newData) =>
												updateService(index, newData)
											}
											onRemove={() =>
												removeService(index)
											}
										/>
									))}
								</div>
							) : (
								<p>
									No services added yet. Add your first
									service below.
								</p>
							)}

							<Button
								onClick={addService}
								className="button-secondary pm-admin-button"
							>
								Add Service
							</Button>
						</VStack>
					</CardBody>
				</Card>
			</div>
		</Fragment>
	);
};

export default Edit;
