import { RichText } from '@wordpress/block-editor';
import ImageUploader from '../../utils/ImageUploader.js';
import RemoveButtonCross from '../../utils/RemoveButtonCross.js';

const CredentialItem = ({ item, onChange, onRemove, baseClass }) => {
	const onSelectLogo = (media) => {
		onChange({
			...item,
			logo: {
				id: media.id,
				url: media.url,
				alt: media.alt || '',
			},
		});
	};

	return (
		<div className={`${baseClass}__credential-item`}>
			<div className={`${baseClass}__credential-logo`}>
				<ImageUploader image={item.logo.url} onSelect={onSelectLogo} />
			</div>
			<div className={`${baseClass}__credential-content`}>
				<div className={`${baseClass}__credential-title`}>
					<RichText
						tagName="span"
						value={item.title}
						onChange={(value) =>
							onChange({ ...item, title: value })
						}
						placeholder="Input certification title..."
					/>{' '}
					(
					<RichText
						tagName="span"
						className={`${baseClass}__credential-title ${baseClass}__credential-status`}
						value={item.status}
						onChange={(value) =>
							onChange({ ...item, status: value })
						}
						placeholder="Status..."
					/>
					)
				</div>
				<RichText
					tagName="p"
					className={`${baseClass}__credential-description`}
					value={item.description}
					onChange={(value) =>
						onChange({ ...item, description: value })
					}
					placeholder="Input certification description..."
				/>
				<div className={`${baseClass}__credential-institution`}>
					{'– '}
					<RichText
						tagName="span"
						value={item.institution}
						onChange={(value) =>
							onChange({ ...item, institution: value })
						}
						placeholder="Input institution name..."
					/>
				</div>
			</div>
			<RemoveButtonCross handleClick={onRemove} color={`white`} />
		</div>
	);
};

export default CredentialItem;
