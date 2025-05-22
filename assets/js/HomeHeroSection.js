class HomeHeroSection {
	section = document.querySelector('.wp-block-pavel-home-hero-section');

	constructor() {
		if (!this.section) return;

		this.toBottomButton = this.section.querySelector(
			'.wp-block-pavel-home-hero-section__arrow-to-bottom',
		);
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

export default HomeHeroSection;
