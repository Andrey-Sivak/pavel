class Parallax {
	ticking = false;
	parallaxElements = [];

	constructor() {
		this.elements = [...document.querySelectorAll('[data-parallax]')];

		if (!this.elements.length) return;

		this.init();
	}

	init() {
		if (document.readyState === 'loading') {
			document.addEventListener(
				'DOMContentLoaded',
				this.initParallax.bind(this),
			);
		} else {
			this.initParallax();
		}
	}

	initParallax() {
		this.elements.forEach((element) => {
			const speed = parseFloat(
				element.getAttribute('data-parallax-speed') || 0.2,
			);
			const direction =
				element.getAttribute('data-parallax-direction') || 'vertical';
			const reverse =
				element.getAttribute('data-parallax-reverse') === 'true';

			this.parallaxElements.push({
				element,
				speed,
				direction,
				reverse,
				offsetTop:
					element.getBoundingClientRect().top + window.pageYOffset,
			});
		});

		this.updateParallaxPositions();

		window.addEventListener('scroll', this.onScroll.bind(this), {
			passive: true,
		});

		window.addEventListener('resize', this.onResize.bind(this), {
			passive: true,
		});
	}

	onScroll() {
		if (!this.ticking) {
			window.requestAnimationFrame(() => {
				this.updateParallaxPositions();
				this.ticking = false;
			});
			this.ticking = true;
		}
	}

	onResize() {
		this.parallaxElements.forEach((item) => {
			item.offsetTop =
				item.element.getBoundingClientRect().top + window.pageYOffset;
		});
		this.updateParallaxPositions();
	}

	updateParallaxPositions() {
		const scrollY = window.pageYOffset;

		this.parallaxElements.forEach((item) => {
			const { element, speed, direction, reverse, offsetTop } = item;

			const elementCenter = offsetTop + element.offsetHeight / 2;
			const viewportCenter = scrollY + window.innerHeight / 2;
			const distanceFromCenter = elementCenter - viewportCenter;

			const parallaxOffset =
				distanceFromCenter * speed * (reverse ? -1 : 1);

			if (direction === 'horizontal') {
				element.style.transform = `translateX(${parallaxOffset}px)`;
			} else if (direction === 'both') {
				element.style.transform = `translate(${parallaxOffset * 0.5}px, ${parallaxOffset}px)`;
			} else {
				element.style.transform = `translateY(${parallaxOffset}px)`;
			}
		});
	}
}

export default Parallax;
