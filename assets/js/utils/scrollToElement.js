export default function scrollToElement(e) {
	e.preventDefault();

	const targetId = e.currentTarget.getAttribute('href').split('#')[1];
	const targetElement = document.getElementById(targetId);

	if (targetElement) {
		const targetPosition =
			targetElement.getBoundingClientRect().top + window.scrollY - 50;

		window.scrollTo({
			top: targetPosition,
			behavior: 'smooth',
		});
	}
}
