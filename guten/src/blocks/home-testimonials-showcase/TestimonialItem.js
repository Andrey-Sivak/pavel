import {
	TextControl,
	TextareaControl,
	Button,
	Panel,
	PanelBody,
	PanelRow,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import RatingStar from './RatingStar.js';

const TestimonialItem = ({ item, onChange, onRemove }) => {
	const { rating, quote, author } = item;

	const updateAttribute = (attribute, value) => {
		onChange({
			...item,
			[attribute]: value,
		});
	};

	return (
		<Panel>
			<PanelBody
				initialOpen={false}
				title={
					item.quote
						? `${item.quote.substring(0, 50)}...`
						: 'New Testimonial'
				}
			>
				<PanelRow>
					<VStack style={{ gap: 15, width: '100%' }}>
						<div className="testimonial-rating">
							<label className="pm-admin-label-text">
								Rating:
							</label>
							<div
								style={{
									display: 'flex',
									gap: 4,
									alignItems: 'center',
									paddingTop: 10,
								}}
							>
								{!rating && (
									<p className="empty-rating-warn">
										Click the stars to set a rating
									</p>
								)}
								{[1, 2, 3, 4, 5].map((star) => (
									<RatingStar
										key={star}
										filled={star <= rating}
										onClick={() =>
											updateAttribute('rating', star)
										}
									/>
								))}
							</div>
						</div>

						<TextareaControl
							label="Testimonial Quote"
							value={quote}
							onChange={(value) =>
								updateAttribute('quote', value)
							}
							placeholder="Enter client testimonial..."
						/>

						<TextControl
							label="Author Name"
							value={author}
							onChange={(value) =>
								updateAttribute('author', value)
							}
							placeholder="Client name"
						/>
						<Button isDestructive onClick={onRemove}>
							Remove Testimonial
						</Button>
					</VStack>
				</PanelRow>
			</PanelBody>
		</Panel>
	);
};

export default TestimonialItem;
