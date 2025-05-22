import ImageUploader from '../../utils/ImageUploader.js';
import LinkEditor from '../../utils/LinkEditor.js';
import RemoveButtonCross from '../../utils/RemoveButtonCross.js';

const SocialLink = ({ item, updateSocial, onRemove, index, baseClass }) => {
	const { icon, url, target } = item;

	return (
		<div className={`${baseClass}__social-item`}>
			<LinkEditor
				url={url}
				target={target}
				onChange={updateSocial}
				index={index}
			>
				<ImageUploader
					image={icon.url}
					onSelect={(media) => {
						updateSocial(index, 'icon', {
							id: media.id,
							url: media.url,
						});
					}}
				/>
			</LinkEditor>
			<RemoveButtonCross handleClick={onRemove} color={`white`} />
		</div>
	);
};

export default SocialLink;
