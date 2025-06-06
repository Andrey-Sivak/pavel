import {
	Card,
	CardBody,
	CardHeader,
	Button,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { useBlockProps } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import StatItem from './StatItem.js';
import './editor.scss';
import BlockIdInspectorPanel from '../../common-components/BlockIdInspectorPanel.js';

const Edit = (props) => {
	const { attributes, setAttributes } = props;
	const { stats, blockId } = attributes;

	const baseClass = 'wp-block-pavel-home-statistics-showcase';

	const blockProps = useBlockProps({
		className: baseClass,
	});

	const updateStat = (index, newStatData) => {
		const newStats = [...stats];
		newStats[index] = newStatData;
		setAttributes({ stats: newStats });
	};

	const addStat = () => {
		setAttributes({
			stats: [
				...stats,
				{
					number: '',
					unit: '',
					description: '',
				},
			],
		});
	};

	const removeStat = (index) => {
		const newStats = [...stats];
		newStats.splice(index, 1);
		setAttributes({ stats: newStats });
	};

	return (
		<Fragment>
			<BlockIdInspectorPanel
				setAttributes={setAttributes}
				blockId={blockId}
			/>
			<div {...blockProps}>
				<div className={`${baseClass}__wrap pm-wrap`}>
					<div className={`${baseClass}__content pm-container`}>
						{stats.length > 0 ? (
							stats.map((stat, index) => (
								<StatItem
									key={index}
									item={stat}
									baseClass={baseClass}
									onChange={(newData) =>
										updateStat(index, newData)
									}
									onRemove={() => removeStat(index)}
								/>
							))
						) : (
							<p>
								No statistics added yet. Add your first
								statistic.
							</p>
						)}

						{stats.length < 4 && (
							<Button
								onClick={addStat}
								className="button-secondary pm-admin-button"
							>
								Add Statistic
							</Button>
						)}
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Edit;
