import { useBlockProps, RichText } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { Fragment } from '@wordpress/element';
import './editor.scss';
import PostListInspectorPanel from '../../common-components/PostListInspectorPanel.js';

const Edit = (props) => {
	const { attributes, setAttributes } = props;
	const { title } = attributes;

	const baseClass = 'wp-block-pavel-post-list';

	const blockProps = useBlockProps({
		className: baseClass,
	});

	const posts = useSelect((select) => {
		return select('core').getEntityRecords('postType', 'post', {
			per_page: 6,
			_embed: true,
		});
	}, []);

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	return (
		<Fragment>
			<PostListInspectorPanel />
			<div {...blockProps}>
				<div className={`${baseClass}__wrapper pm-wrap`}>
					<RichText
						tagName="p"
						className={`${baseClass}__title`}
						value={title}
						onChange={(newTitle) =>
							setAttributes({ title: newTitle })
						}
						placeholder="Section title..."
					/>
				</div>
			</div>
		</Fragment>
	);
};

export default Edit;
