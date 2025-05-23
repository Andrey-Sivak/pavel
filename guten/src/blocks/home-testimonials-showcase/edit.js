import { Button } from '@wordpress/components';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import TestimonialItem from './TestimonialItem.js';
import './editor.scss';
import BlockIdInspectorPanel from '../../common-components/BlockIdInspectorPanel.js';

const Edit = (props) => {
	const { attributes, setAttributes } = props;
	const { heading, testimonials, blockId } = attributes;

	const baseClass = 'wp-block-pavel-home-testimonials-showcase';

	const blockProps = useBlockProps({
		className: baseClass,
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
						<div className={`${baseClass}__testimonials-grid`}>
							{testimonials.length > 0 ? (
								testimonials.map((testimonial, index) => (
									<TestimonialItem
										key={index}
										item={testimonial}
										baseClass={baseClass}
										onChange={(newData) =>
											updateTestimonial(index, newData)
										}
										onRemove={() =>
											removeTestimonial(index)
										}
									/>
								))
							) : (
								<p>
									No testimonials added yet. Add your first
									testimonial.
								</p>
							)}

							<Button
								onClick={addTestimonial}
								className="button-secondary pm-admin-button"
							>
								Add Testimonial
							</Button>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Edit;
