(function () {
	const elements = {
		reviewsSlider: document.querySelector(
			'.wp-block-pavel-home-testimonials-showcase__testimonials-grid',
		),
		header: document.querySelector('.pm-header'),
	};

	if (elements.header) {
		import('./Header.js').then(({ default: Header }) => new Header());
	}

	if (elements.reviewsSlider) {
		import('./ReviewsSlider.js').then(
			({ default: ReviewsSlider }) => new ReviewsSlider(),
		);
	}
})();
