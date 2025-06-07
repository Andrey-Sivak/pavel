import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import PostList from './PostList.js';
import PostListInspectorPanel from '../../common-components/PostListInspectorPanel.js';
import './editor.scss';

const Edit = (props) => {
	const { attributes, setAttributes } = props;
	const { title } = attributes;

	const [siteSettings, setSiteSettings] = useState({
		columns: 2,
		showExcerpt: true,
		showThumb: true,
		showDate: true,
		showCategories: true,
	});

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		apiFetch({ path: '/pavel/v1/post-settings' })
			.then((response) => {
				setSiteSettings({
					columns: response.pm_post_layout,
					showExcerpt: response.pm_post_show_excerpt,
					showThumb: response.pm_post_show_thumb,
					showDate: response.pm_post_show_date,
					showCategories: response.pm_post_show_categories,
				});
				setIsLoading(false);
			})
			.catch((error) => {
				console.error('Failed to fetch post settings:', error);
				setIsLoading(false);
			});
	}, []);

	const baseClass = 'wp-block-pavel-post-list';

	const blockProps = useBlockProps({
		className: baseClass,
	});

	return (
		<Fragment>
			<PostListInspectorPanel
				siteSettings={siteSettings}
				setSiteSettings={setSiteSettings}
				isLoading={isLoading}
			/>
			<div {...blockProps}>
				<div className={`${baseClass}__wrapper pm-wrap`}>
					<RichText
						tagName="p"
						className={`${baseClass}__title pm-section-heading`}
						value={title}
						onChange={(newTitle) =>
							setAttributes({ title: newTitle })
						}
						placeholder="Section title..."
					/>

					<PostList siteSettings={siteSettings} />
				</div>
			</div>
		</Fragment>
	);
};

export default Edit;
