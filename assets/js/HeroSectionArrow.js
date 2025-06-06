class HeroSectionArrow {
	isBlog = document.body.classList.contains('page-template-blog-page');
	isFront = document.body.classList.contains('home');

	constructor() {
		if (!this.isBlog && !this.isFront) return;

		if (this.isBlog) {
			this.section = document.querySelector(
				'.wp-block-pavel-blog-hero-section',
			);
			this.toBottomButton = this.section.querySelector(
				'.wp-block-pavel-blog-hero-section__arrow-to-bottom',
			);
		} else if (this.isFront) {
			this.section = document.querySelector(
				'.wp-block-pavel-home-hero-section',
			);
			this.toBottomButton = this.section.querySelector(
				'.wp-block-pavel-home-hero-section__arrow-to-bottom',
			);
		}

		if (!this.section) return;

		this.init();
	}

	init() {
		if (this.toBottomButton) {
			this.toBottomButton.addEventListener('click', () => {
				const sectionRect = this.section.getBoundingClientRect();
				const sectionBottom = sectionRect.bottom;

				const scrollToPosition = window.scrollY + sectionBottom;

				window.scrollTo({
					top: scrollToPosition - 170,
					behavior: 'smooth',
				});
			});
		}
	}
}

export default HeroSectionArrow;
