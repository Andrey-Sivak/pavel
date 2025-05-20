(function () {
	const elements = {
		reviewsSlider: document.querySelector(
			'.wp-block-pavel-home-testimonials-showcase__testimonials-grid',
		),
		header: document.querySelector('.pm-header'),
		footer: document.querySelector('.pm-footer'),
		elementsToParallax: document.querySelectorAll('[data-parallax]'),
	};

	if (elements.header) {
		import('./Header.js').then(({ default: Header }) => new Header());
	}

	if (elements.elementsToParallax.length) {
		import('./Parallax.js').then(({ default: Parallax }) => {
			new Parallax();
		});
	}

	if (elements.reviewsSlider) {
		import('./ReviewsSlider.js').then(
			({ default: ReviewsSlider }) => new ReviewsSlider(),
		);
	}

	if (elements.footer) {
		import('./Footer.js').then(({ default: Footer }) => new Footer());
	}
})();
