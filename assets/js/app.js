(function () {
	const elements = {
		reviewsSlider: document.querySelector(
			'.wp-block-pavel-home-testimonials-showcase__testimonials-grid',
		),
		header: document.querySelector('.pm-header'),
		modals: [...document.querySelectorAll('.pm-modal')],
		formContainers: [...document.querySelectorAll('.pm-form-wrap')],
		footer: document.querySelector('.pm-footer'),
		elementsToParallax: document.querySelectorAll('[data-parallax]'),
	};

	if (elements.header) {
		import('./Header.js').then(({ default: Header }) => new Header());
	}

	import('./Animations.js').then(
		({ default: Animations }) => new Animations(),
	);

	if (elements.modals.length) {
		elements.modals.forEach((modal) => {
			import('./Modal.js').then(({ default: Modal }) => new Modal(modal));
		});
	}

	if (elements.formContainers.length) {
		elements.formContainers.forEach((formContainer) => {
			import('./Form.js').then(
				({ default: Form }) => new Form(formContainer),
			);
		});
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
