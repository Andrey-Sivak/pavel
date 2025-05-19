import scrollToElement from './utils/scrollToElement.js';

class NavMenu {
	constructor(menu) {
		this.menu = menu;
		if (!this.menu) return;

		const origin = new URL(window.location.href).origin;
		this.menuLinks = this.menu.querySelectorAll(
			`a[href^="${origin}#"], a[href^="#"]`,
		);
		if (!this.menuLinks.length) return;

		this.init();
	}

	init() {
		this.menuLinks.forEach((link) => {
			link.addEventListener('click', (e) => {
				scrollToElement(e);

				if (document.body.classList.contains('mob-menu-active')) {
					document.body.classList.remove('mob-menu-active');
				}
			});
		});
	}
}

export default NavMenu;
