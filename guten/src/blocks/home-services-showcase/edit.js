import { Button } from '@wordpress/components';
import { useBlockProps, RichText } from '@wordpress/block-editor';
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

	const baseClass = 'wp-block-pavel-home-services-showcase';

	const blockProps = useBlockProps({
		className: baseClass,
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
				<div className={`${baseClass}__wrap pm-wrap`}>
					<div className={`${baseClass}__content pm-container`}>
						<RichText
							tagName="p"
							className={`${baseClass}__heading pm-section-heading`}
							value={heading}
							onChange={(newHeading) =>
								setAttributes({ heading: newHeading })
							}
							placeholder="Input section heading..."
						/>
						<RichText
							tagName="p"
							className={`${baseClass}__subheading`}
							value={subheading}
							onChange={(newSubheading) =>
								setAttributes({
									subheading: newSubheading,
								})
							}
							placeholder="Input subheading..."
						/>{' '}
						<RichText
							tagName="p"
							className={`${baseClass}__description`}
							value={description}
							onChange={(newDescription) =>
								setAttributes({
									description: newDescription,
								})
							}
							placeholder="Input description..."
						/>
						<div className={`${baseClass}__services`}>
							<RichText
								tagName="p"
								className={`${baseClass}__services-label`}
								value={servicesLabel}
								onChange={(newServicesLabel) =>
									setAttributes({
										servicesLabel: newServicesLabel,
									})
								}
								placeholder="Input services label (e.g. 'My Services')..."
							/>
							<div className={`${baseClass}__services-grid`}>
								{services.length > 0 ? (
									services.map((service, index) => (
										<ServiceItem
											key={index}
											item={service}
											baseClass={baseClass}
											onChange={(newData) =>
												updateService(index, newData)
											}
											onRemove={() =>
												removeService(index)
											}
										/>
									))
								) : (
									<p>
										No services added yet. Add your first
										service.
									</p>
								)}

								<Button
									onClick={addService}
									className="button-secondary pm-admin-button"
								>
									Add Service
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Edit;
