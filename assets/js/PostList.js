class PostList {
	postsPerPage = 6;

	constructor() {
		this.container = document.querySelector('.pm-post-list');
		this.loader = document.querySelector('.pm-posts-loader');
		this.paginationContainer = document.querySelector('.pm-pagination');
		this.categoryList = document.querySelectorAll(
			'.pm-blog__category-list a',
		);

		if (!this.container || !this.loader) return;

		this.currentPage = parseInt(this.loader.dataset.currentPage, 10);
		this.maxPages = parseInt(this.loader.dataset.maxPages, 10);
		this.isLoading = false;

		this.init();
	}

	init() {
		this.categoryList.forEach((link) =>
			link.addEventListener('click', this.onCategoryClick.bind(this)),
		);

		this.initPaginationEvents();
	}

	initPaginationEvents() {
		if (!this.paginationContainer) return;

		this.paginationContainer.addEventListener('click', async (e) => {
			if (e.target.matches('[data-page]') && !e.target.disabled) {
				e.preventDefault();
				const page = parseInt(e.target.dataset.page, 10);
				await this.goToPage(page);
			}
		});
	}

	async goToPage(page) {
		if (
			this.isLoading ||
			page === this.currentPage ||
			page < 1 ||
			page > this.maxPages
		) {
			return;
		}

		this.currentPage = page;
		this.container.parentElement.parentElement.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
		setTimeout(async () => {
			this.container.innerHTML = '';
			this.setLoadingState(true);

			const formData = this.collectFormData(page);

			try {
				const response = await fetch(options.ajax_url, {
					method: 'POST',
					body: formData,
				});

				const data = await response.json();

				if (data.success) {
					this.container.innerHTML = data.data.html;
					this.paginationContainer.innerHTML = data.data.pagination;

					this.loader.dataset.currentPage = page;
					this.maxPages = data.data.max_pages;
					this.loader.dataset.maxPages = data.data.max_pages;

					// Update URL with WordPress pagination format
					this.updateUrlWithPagination(page);

					// Re-initialize pagination events for new HTML
					this.initPaginationEvents();
				}
			} catch (err) {
				console.error('Error loading page:', err);
				// Revert to previous page on error
				this.currentPage = parseInt(
					this.loader.dataset.currentPage,
					10,
				);
			} finally {
				this.setLoadingState(false);
			}
		}, 300);
	}

	updateUrlWithPagination(page) {
		const newUrl = new URL(window.location.href);

		// Get current path without pagination
		let pathname = newUrl.pathname;

		// Remove existing /page/X/ from path
		pathname = pathname.replace(/\/page\/\d+\/?$/, '');

		// Add pagination if not page 1
		if (page > 1) {
			// Ensure pathname ends with /
			if (!pathname.endsWith('/')) {
				pathname += '/';
			}
			pathname += `page/${page}/`;
		}

		newUrl.pathname = pathname;

		// Update browser history
		window.history.pushState(null, '', newUrl.toString());
	}

	async onCategoryClick(e) {
		e.preventDefault();

		const categoryLink = e.currentTarget;
		const categoryId = parseInt(
			categoryLink.getAttribute('data-category-id'),
			10,
		);

		if (
			categoryLink.classList.contains('active') &&
			[...document.querySelectorAll('.pm-blog__category-list a.active')]
				.length === 1
		) {
			return;
		}

		// Handle All Categories Button
		const allCategoriesBtn = document.querySelector(
			'.pm-blog__category-list a[data-category-id="0"]',
		);
		if (categoryId === 0 && !categoryLink.classList.contains('active')) {
			await this.handleAllCategoriesBtn();
			allCategoriesBtn.classList.add('active');
			return;
		} else {
			allCategoriesBtn.classList.remove('active');
		}

		let selectedCategories = JSON.parse(
			this.loader.dataset.category || '{}',
		);

		if (selectedCategories.category?.includes(categoryId)) {
			categoryLink.classList.remove('active');
			selectedCategories.category = selectedCategories.category.filter(
				(id) => id !== categoryId,
			);
		} else {
			categoryLink.classList.add('active');
			selectedCategories.category.push(categoryId);
		}
		this.loader.dataset.category = JSON.stringify(selectedCategories);

		try {
			await this.loadPostsByCategory();
			this.updateUrlByCategoryUpdate();
		} catch (e) {
			console.log(e.message);
		}
	}

	async handleAllCategoriesBtn() {
		const activeCats = [
			...document.querySelectorAll('.pm-blog__category-list a.active'),
		];

		activeCats.forEach((activeCat) => activeCat.classList.remove('active'));
		this.loader.dataset.category = JSON.stringify({
			category: [],
		});

		try {
			await this.loadPostsByCategory();

			const newUrl = new URL(window.location.href);
			window.history.pushState(
				null,
				'',
				newUrl.origin.toString() + '/blog',
			);
		} catch (e) {
			console.log(e.message);
		}
	}

	async loadPostsByCategory() {
		this.currentPage = 1;
		this.setLoadingState(true);
		this.container.innerHTML = '';

		const formData = this.collectFormData(1);

		try {
			const response = await fetch(options.ajax_url, {
				method: 'POST',
				body: formData,
			});

			const data = await response.json();

			if (data.success) {
				setTimeout(() => {
					this.container.innerHTML = data.data.html;
					this.paginationContainer.innerHTML = data.data.pagination;

					this.maxPages = data.data.max_pages;
					this.loader.dataset.maxPages = data.data.max_pages;
					this.loader.dataset.currentPage = '1';

					// Re-initialize pagination events
					this.initPaginationEvents();
				}, 300);
			}
		} catch (err) {
			console.error('Error loading posts:', err);
		} finally {
			setTimeout(() => {
				this.setLoadingState(false);
			}, 300);
		}
	}

	setLoadingState(isLoading) {
		this.isLoading = isLoading;

		if (isLoading) {
			this.loader.classList.remove('hidden');
			if (this.paginationContainer) {
				this.paginationContainer.style.pointerEvents = 'none';
				this.paginationContainer.style.opacity = '0.5';
			}
		} else {
			this.loader.classList.add('hidden');
			if (this.paginationContainer) {
				this.paginationContainer.style.pointerEvents = 'auto';
				this.paginationContainer.style.opacity = '1';
			}
		}
	}

	updateUrlByCategoryUpdate() {
		const activeCats = [
			...document.querySelectorAll('.pm-blog__category-list a.active'),
		];
		if (
			activeCats.length === 1 &&
			!parseInt(activeCats[0].dataset?.categoryId, 10)
		) {
			const newUrl = new URL(window.location.href);
			window.history.pushState(null, '', newUrl.origin.toString());
			return;
		}

		const categories = activeCats.map((cat) => cat.dataset.categorySlug);
		const mainCategory = categories[0];
		const newUrl = new URL(window.location.href);

		if (categories.length === 1) {
			newUrl.pathname = `/category/${mainCategory}`;
			newUrl.searchParams.delete('cats');
		} else {
			newUrl.pathname = `/category/${mainCategory}`;
			newUrl.searchParams.set('cats', categories.slice(1).join(','));
		}

		window.history.pushState(null, '', newUrl.toString());
	}

	collectFormData(page = 1) {
		const formData = new FormData();
		formData.append('action', 'pavel_ajax_load_more_posts');
		formData.append('paged', page);

		if (this.loader.dataset.category) {
			const categoryData = JSON.parse(this.loader.dataset.category);

			if (categoryData.category && Array.isArray(categoryData.category)) {
				formData.append(
					'category',
					JSON.stringify(categoryData.category),
				);
			}
		}

		return formData;
	}
}

export default PostList;
