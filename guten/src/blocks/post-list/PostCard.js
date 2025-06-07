const PostCard = ({
	post,
	showDate,
	showCategories,
	showExcerpt,
	showThumb,
}) => {
	const getFeaturedImage = (post) => {
		if (
			!post._embedded ||
			!post._embedded['wp:featuredmedia'] ||
			!post._embedded['wp:featuredmedia'][0]
		) {
			return null;
		}
		return post._embedded['wp:featuredmedia'][0];
	};

	const getCategories = (post) => {
		if (
			!post._embedded ||
			!post._embedded['wp:term'] ||
			!post._embedded['wp:term'][0]
		) {
			return [];
		}
		return post._embedded['wp:term'][0];
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	const featuredImage = getFeaturedImage(post);
	const categories = getCategories(post);

	return (
		<div className="pm__post-item">
			<div className="pm__post-item-decor-bg"></div>
			<div className="pm__post-item-content">
				{featuredImage && showThumb && (
					<div className="pm__post-image">
						<img src={featuredImage.source_url} />
					</div>
				)}

				<div className="pm__post-content">
					{showDate && post.date && (
						<div className="pm__post-date">
							{formatDate(post.date)}
						</div>
					)}

					{post.title && (
						<div
							className="pm__post-title line-clamp-3"
							dangerouslySetInnerHTML={{
								__html: post.title.rendered,
							}}
						/>
					)}

					{showCategories && categories.length > 0 && (
						<div className="pm__post-categories">
							{categories.map((category) => (
								<span
									key={category.id}
									className="pm__post-category"
								>
									{category.name}
								</span>
							))}
						</div>
					)}

					{showExcerpt && post.excerpt && post.excerpt.rendered && (
						<div
							className="pm__post-excerpt line-clamp-3"
							dangerouslySetInnerHTML={{
								__html: post.excerpt.rendered,
							}}
						/>
					)}

					{post.link && (
						<span className="pm__post-link">
							<span>Read More</span>
							<SVGArrow />
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

const SVGArrow = () => (
	<svg width="25" height="24" viewBox="0 0 25 24" fill="none">
		<path
			d="M7.5 9.5L12.5 14.5L17.5 9.5"
			stroke="url(#paint0_linear_156_613)"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<defs>
			<linearGradient
				id="paint0_linear_156_613"
				x1="7.5"
				y1="11.3333"
				x2="17.2207"
				y2="12.171"
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#00A8E8" />
				<stop offset="0.516359" stopColor="#D0F1FD" />
				<stop offset="1" stopColor="#00A8E8" />
			</linearGradient>
		</defs>
	</svg>
);

export default PostCard;
