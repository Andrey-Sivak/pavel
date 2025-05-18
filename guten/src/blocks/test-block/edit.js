import { useBlockProps, RichText } from '@wordpress/block-editor';
import './editor.scss';
import { Fragment } from '@wordpress/element';

const Edit = (props) => {
	const { attributes, setAttributes } = props;
	const { title } = attributes;

	const baseClass = 'wp-block-pavel-test-block';

	const blockProps = useBlockProps({
		className: baseClass,
	});

	return (
		<Fragment>
			<div {...blockProps}>
				<RichText
					tagName="h1"
					className={`${baseClass}__title`}
					value={title}
					onChange={(newTitle) => setAttributes({ title: newTitle })}
					placeholder="Input section title..."
				/>
			</div>
		</Fragment>
	);
};

export default Edit;
