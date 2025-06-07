import { useSelect } from '@wordpress/data';
import PostCard from './PostCard.js';

const PostList = ({ siteSettings }) => {
	const posts = useSelect((select) => {
		return select('core').getEntityRecords('postType', 'post', {
			per_page: 6,
			_embed: true,
		});
	}, []);

	return (
		<div className={`pm__posts-grid_wrap columns--${siteSettings.columns}`}>
			<div className="pm__posts-grid pm-post-list">
				{posts && posts.length > 0 ? (
					posts.map((post) => (
						<PostCard
							post={post}
							key={post.id}
							showDate={siteSettings.showDate}
							showCategories={siteSettings.showCategories}
							showThumb={siteSettings.showThumb}
							showExcerpt={siteSettings.showExcerpt}
						/>
					))
				) : (
					<div className="">
						<p>
							No posts found. Create some posts to see them here.
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default PostList;
