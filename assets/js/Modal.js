class Modal {
	constructor(modal) {
		this.modal = modal;
		if (!this.modal) return;
		this.modalId = this.modal.getAttribute('id');

		this.modalOpenBtns = [
			...document.querySelectorAll(`a[href="#${this.modalId}"]`),
		];
		this.closeModalCross = this.modal.querySelector('.pm-modal__close');
		this.closeModalBtn = this.modal.querySelector('.pm-modal__close-btn');
		this.closeModalSuccessBtn = this.modal.querySelector(
			'.pm-form-success-btn',
		);

		this.init();
	}

	init() {
		this.modalOpenBtns.forEach(
			(btn) => btn.addEventListener('click', this.openModal.bind(this)),
			this,
		);

		this.modal.addEventListener('click', (e) => {
			if (e.target === e.currentTarget) {
				this.closeModal();
			}
		});

		this.closeModalCross.addEventListener(
			'click',
			this.closeModal.bind(this),
		);
		this.closeModalBtn.addEventListener(
			'click',
			this.closeModal.bind(this),
		);
		this.closeModalSuccessBtn.addEventListener(
			'click',
			this.closeModal.bind(this),
		);
	}

	openModal(e) {
		e.preventDefault();
		document.documentElement.classList.remove('pm-modal-closing');
		document.documentElement.classList.add('pm-modal-open');
		document.documentElement.classList.add(`pm-${this.modalId}`);
	}

	closeModal(e) {
		if (e) e.preventDefault();
		document.documentElement.classList.add('pm-modal-closing');

		this.modal.addEventListener(
			'animationend',
			this.closeAnimationEndHandler.bind(this),
			{ once: true },
		);
	}

	closeAnimationEndHandler() {
		document.documentElement.classList.remove(
			'pm-modal-open',
			'pm-modal-closing',
			`pm-${this.modalId}`,
		);
	}
}

export default Modal;
