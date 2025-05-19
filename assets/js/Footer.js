class Footer {
	footerEl = document.querySelector('footer.pm-footer');

	constructor() {
		if (!this.footerEl) return;

		this.menu = this.footerEl.querySelector('#primary-menu-footer');

		this.init();
	}

	init() {
		if (this.menu) {
			import('./NavMenu.js').then(
				({ default: NavMenu }) => new NavMenu(this.menu),
			);
		}
	}
}

export default Footer;
