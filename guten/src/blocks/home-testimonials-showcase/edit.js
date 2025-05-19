import {
	Card,
	CardBody,
	CardHeader,
	Button,
	TextControl,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { useBlockProps } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import TestimonialItem from './TestimonialItem.js';
import './editor.scss';
import BlockIdInspectorPanel from '../../common-components/BlockIdInspectorPanel.js';

const Edit = (props) => {
	const { attributes, setAttributes } = props;
	const { heading, testimonials, blockId } = attributes;

	const blockProps = useBlockProps({
		className: 'wp-block-pavel-home-testimonials-showcase',
	});

	const updateTestimonial = (index, newTestimonialData) => {
		const newTestimonials = [...testimonials];
		newTestimonials[index] = newTestimonialData;
		setAttributes({ testimonials: newTestimonials });
	};

	const addTestimonial = () => {
		setAttributes({
			testimonials: [
				...testimonials,
				{
					rating: 5,
					quote: '',
					author: '',
					position: '',
				},
			],
		});
	};

	const removeTestimonial = (index) => {
		const newTestimonials = [...testimonials];
		newTestimonials.splice(index, 1);
		setAttributes({ testimonials: newTestimonials });
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
							Testimonials Showcase
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

							<h4 className="pm-admin-section-title">
								Client Testimonials
							</h4>

							{testimonials.length > 0 ? (
								<div className="testimonials-items">
									{testimonials.map((testimonial, index) => (
										<TestimonialItem
											key={index}
											item={testimonial}
											onChange={(newData) =>
												updateTestimonial(
													index,
													newData,
												)
											}
											onRemove={() =>
												removeTestimonial(index)
											}
										/>
									))}
								</div>
							) : (
								<p>
									No testimonials added yet. Add your first
									testimonial below.
								</p>
							)}

							<Button
								onClick={addTestimonial}
								className="button-secondary pm-admin-button"
							>
								Add Testimonial
							</Button>
						</VStack>
					</CardBody>
				</Card>
			</div>
		</Fragment>
	);
};

export default Edit;
