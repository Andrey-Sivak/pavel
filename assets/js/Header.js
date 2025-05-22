import scrollToElement from './utils/scrollToElement.js';

class Header {
	headerEl = document.querySelector('header.pm-header');
	scrollPrev = 0;

	constructor() {
		if (!this.headerEl) return;

		this.boundScrollHandler = this.scrollHandler.bind(this);

		this.menu = this.headerEl.querySelector('#primary-menu');

		this.contactUsBtn = document.querySelector('.pm-header__button');
		this.mobBurgerBtn = document.querySelector('.mob-burger-btn');
		this.boundDisplayMobMenuHandler = this.displayMobMenu.bind(this);
		this.languageSwitcher = document.querySelector('.pm-languages');

		this.init();
	}

	init() {
		this.boundScrollHandler();
		window.addEventListener('scroll', this.boundScrollHandler);

		if (this.mobBurgerBtn) {
			this.mobBurgerBtn.addEventListener(
				'click',
				this.boundDisplayMobMenuHandler,
			);
		}

		if (this.contactUsBtn) {
			this.contactUsBtn.addEventListener(
				'click',
				this.scrollToContactSection,
			);
		}

		if (this.menu) {
			import('./NavMenu.js').then(
				({ default: NavMenu }) => new NavMenu(this.menu),
			);
		}

		if (this.languageSwitcher) {
			import('./LanguageSwitcher.js').then(
				({ default: LanguageSwitcher }) =>
					new LanguageSwitcher(this.languageSwitcher),
			);
		}
	}

	isHeaderHide(scrolled) {
		return scrolled > 100 && scrolled > this.scrollPrev;
	}

	isHeaderScrolled(scrolled) {
		return scrolled > 100;
	}

	scrollHandler() {
		const scrolled = window.scrollY;

		if (this.isHeaderHide(scrolled)) {
			this.headerEl.classList.add('pm-out');

			if (this.languageSwitcher.classList.contains('active')) {
				this.languageSwitcher.classList.remove('active');
			}
		} else {
			this.headerEl.classList.remove('pm-out');
		}

		if (this.isHeaderScrolled(scrolled)) {
			this.headerEl.classList.add('pm-scrolled');
		} else {
			this.headerEl.classList.remove('pm-scrolled');
		}

		this.scrollPrev = scrolled;
	}

	displayMobMenu() {
		document.body.classList.toggle('mob-menu-active');

		this.mobBurgerBtn.setAttribute(
			'aria-expanded',
			document.body.classList.contains('mob-menu-active'),
		);
	}

	scrollToContactSection(e) {
		scrollToElement(e);

		if (document.body.classList.contains('mob-menu-active')) {
			document.body.classList.remove('mob-menu-active');
		}
	}
}

export default Header;
