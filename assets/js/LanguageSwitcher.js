class LanguageSwitcher {
	constructor(languageSwitcher) {
		this.languageSwitcher = languageSwitcher;
		if (!this.languageSwitcher) return;

		this.activeLang = this.languageSwitcher.querySelector(
			'.pm-languages-active',
		);

		this.init();
	}

	init() {
		if (this.activeLang) {
			this.activeLang.addEventListener(
				'click',
				this.displayLangsSwitcher.bind(this),
			);
		}

		window.addEventListener('click', this.closeLangsSwitcher.bind(this));
	}

	displayLangsSwitcher() {
		this.languageSwitcher.classList.toggle('active');
	}

	closeLangsSwitcher(e) {
		if (
			e.target.classList.contains('pm-languages-active') ||
			e.target.classList.contains('wpml-flag') ||
			e.target.classList.contains('wpml-lang-code')
		) {
			return;
		}

		if (this.languageSwitcher.classList.contains('active')) {
			this.languageSwitcher.classList.remove('active');
		}
	}
}

export default LanguageSwitcher;
