class Form {
	form = null;
	submitBtn = null;
	formUID = null;
	loaderContainer = null;
	successContainer = null;
	modal = null;

	constructor(formContainer) {
		this.block = formContainer;
		if (!this.block) return;

		this.form = this.block.querySelector('.wpcf7-form');
		if (!this.form) return;

		this.submitBtn = this.form.querySelector('button[type="submit"]');
		const actionAttr = this.form.getAttribute('action');
		const formIdMatch = actionAttr.match(/#wpcf7-f(\d+)-\w\d+/);
		this.formUID = formIdMatch
			? formIdMatch[0]
			: actionAttr.substring(actionAttr.lastIndexOf('/') + 1);
		this.loaderContainer = this.block.querySelector('.pm-form-loading');
		this.successContainer = this.block.querySelector('.pm-form-success');

		this.init();
	}

	init() {
		this.submitBtn.addEventListener('click', () => {
			this.block.classList.add('loading');
		});

		document.addEventListener('wpcf7mailsent', (e) => {
			const formUID = e.detail.apiResponse.into;
			if (formUID !== this.formUID) return;

			this.handleSuccess();
		});
		document.addEventListener('wpcf7mailfailed', (e) => {
			const formUID = e.detail.apiResponse.into;
			if (formUID !== this.formUID) return;

			this.block.classList.remove('loading');
		});
		document.addEventListener('wpcf7invalid', (e) => {
			const formUID = e.detail.apiResponse.into;
			if (formUID !== this.formUID) return;

			this.block.classList.remove('loading');
		});
	}

	handleSuccess() {
		this.block.classList.remove('loading');
		setTimeout(() => {
			this.block.classList.add('success');

			setTimeout(() => {
				this.form.reset();

				this.modal = document.querySelector('.pm-modal');

				if (
					this.modal &&
					document.body.classList.contains('pm-modal-open')
				) {
					setTimeout(this.closeModal.bind(this), 350);
				}
			}, 250);
		}, 300);
	}

	closeModal() {
		document.body.classList.add('pm-modal-closing');

		this.modal.addEventListener(
			'animationend',
			this.closeAnimationEndHandler,
			{
				once: true,
			},
		);
	}

	closeAnimationEndHandler() {
		document.body.classList.remove('pm-modal-open', 'pm-modal-closing');
	}
}

export default Form;
