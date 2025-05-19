(function () {
	const elements = {
		reviewsSlider: document.querySelector(
			'.wp-block-pavel-home-testimonials-showcase__testimonials-grid',
		),
	};

	if (elements.reviewsSlider) {
		import('./ReviewsSlider.js').then(
			({ default: ReviewsSlider }) => new ReviewsSlider(),
		);
	}
})();
