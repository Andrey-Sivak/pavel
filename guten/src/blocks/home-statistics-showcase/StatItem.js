import { RichText } from '@wordpress/block-editor';
import RemoveButtonCross from '../../utils/RemoveButtonCross.js';

const StatItem = ({ item, onChange, onRemove, baseClass }) => {
	return (
		<div className={`${baseClass}__item`}>
			<div className={`${baseClass}__item-decor-bg`}>
				<svg
					preserveAspectRatio="none"
					viewBox="0 0 336 381"
					fill="none"
				>
					<path
						d="M330 25C330 14.5066 321.493 6 311 6H214.704L219.262 0H311L311.646 0.0078125C324.94 0.344757 335.655 11.0602 335.992 24.3545L336 25V101.937L330 109.837V25ZM24.3545 380.992C10.8457 380.65 0 369.591 0 356V288.696L6 280.797V356C6 366.33 14.2429 374.734 24.5098 374.994L25 375H128.609L124.053 381H25L24.3545 380.992Z"
						fill="url(#paint0_linear_22_659)"
					/>
					<defs>
						<linearGradient
							id="paint0_linear_22_659"
							x1="1.27078e-07"
							y1="190.5"
							x2="325.763"
							y2="190.5"
							gradientUnits="userSpaceOnUse"
						>
							<stop stopColor="#007EA7" />
							<stop offset="1" stopColor="#00477A" />
						</linearGradient>
					</defs>
				</svg>
			</div>

			<div className={`${baseClass}__item-content`}>
				<RichText
					tagName="p"
					className={`${baseClass}__number`}
					value={item.number}
					onChange={(value) => onChange({ ...item, number: value })}
					placeholder="e.g. 250"
				/>
				<RichText
					tagName="p"
					className={`${baseClass}__unit`}
					value={item.unit}
					onChange={(value) => onChange({ ...item, unit: value })}
					placeholder="e.g. years"
				/>
				<RichText
					tagName="p"
					className={`${baseClass}__description`}
					value={item.description}
					onChange={(value) =>
						onChange({ ...item, description: value })
					}
					placeholder="e.g. Projects Completed"
				/>
			</div>
			<RemoveButtonCross handleClick={onRemove} color={`white`} />
		</div>
	);
};

export default StatItem;
