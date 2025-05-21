import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

class ReviewsSlider {
	initSlidesCount = 3;

	constructor() {
		this.slider = document.querySelector(
			'.wp-block-pavel-home-testimonials-showcase__testimonials-grid',
		);

		if (!this.slider) return;

		this.init();
	}

	init() {
		const slideCount = this.slider.querySelectorAll('.swiper-slide').length;

		new Swiper(this.slider, {
			modules: [Navigation, Pagination, Autoplay],
			slidesPerView: this.initSlidesCount,
			spaceBetween: 30,
			loop: slideCount > this.initSlidesCount + 1,
			// autoplay: {
			// 	delay: 3000,
			// },
			// navigation: {
			// 	nextEl: '.wp-block-journeyo-reviews-section__button-next',
			// 	prevEl: '.wp-block-journeyo-reviews-section__button-prev',
			// },
			pagination: {
				el: '.wp-block-pavel-home-testimonials-showcase__pagination',
				clickable: true,
			},
			breakpoints: {
				320: { slidesPerView: 1 },
				767: { slidesPerView: 2 },
				1024: { slidesPerView: this.initSlidesCount },
			},
		});
	}
}

export default ReviewsSlider;
