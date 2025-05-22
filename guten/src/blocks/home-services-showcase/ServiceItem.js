import { RichText } from '@wordpress/block-editor';
import RemoveButtonCross from '../../utils/RemoveButtonCross.js';

const ServiceItem = ({ item, onChange, onRemove, baseClass }) => {
	return (
		<div className={`${baseClass}__service-item`}>
			<RichText
				tagName="p"
				className={`${baseClass}__service-title`}
				value={item.title}
				onChange={(value) => onChange({ ...item, title: value })}
				placeholder="Input service title..."
			/>
			<RichText
				tagName="p"
				className={`${baseClass}__service-description`}
				value={item.description}
				onChange={(value) => onChange({ ...item, description: value })}
				placeholder="Input service description..."
			/>
			<RemoveButtonCross handleClick={onRemove} />
		</div>
	);
};

export default ServiceItem;
