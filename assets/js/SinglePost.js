import FsLightbox from 'fslightbox';

class SinglePost {
	content = document.querySelector('.pm-post-content');

	constructor() {
		if (!this.content) return;

		this.sources = [];
		this.images = [...this.content.querySelectorAll('img')];

		this.init();
	}

	init() {
		this.images.forEach(this.setupImage, this);
		refreshFsLightbox();
		// import('./RecommendedPosts.js').then(
		// 	({ default: RecommendedPosts }) => new RecommendedPosts(),
		// );
	}

	setupImage(img) {
		if (img.closest('a[data-fancybox]')) return;

		const src = img.getAttribute('src');
		if (!src) return;

		const link = document.createElement('a');
		link.setAttribute('href', src);
		link.setAttribute('data-fslightbox', 'gallery');

		img.parentNode.insertBefore(link, img);
		link.appendChild(img);
	}
}

export default SinglePost;
