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
		homeHeroSection: document.querySelector(
			'.wp-block-pavel-home-hero-section',
		),
		blogHeroSection: document.querySelector(
			'.wp-block-pavel-blog-hero-section',
		),
		postList: document.querySelector('.pm-post-list'),
		singlePostContent: document.querySelector('.pm-post-content'),
	};

	if (elements.header) {
		import('./Header.js').then(({ default: Header }) => new Header());
	}

	import('./Animations.js').then(
		({ default: Animations }) => new Animations(),
	);

	if (elements.homeHeroSection || elements.blogHeroSection) {
		import('./HeroSectionArrow.js').then(
			({ default: HeroSectionArrow }) => new HeroSectionArrow(),
		);
	}

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

	if (elements.postList) {
		import('./PostList.js').then(({ default: PostList }) => {
			new PostList();
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

	if (elements.singlePostContent) {
		import('./SinglePost.js').then(
			({ default: SinglePost }) => new SinglePost(),
		);
	}
})();
