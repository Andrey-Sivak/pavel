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

const Edit = (props) => {
	const { attributes, setAttributes } = props;
	const { stats } = attributes;

	const blockProps = useBlockProps({
		className: 'wp-block-pavel-home-statistics-showcase',
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
			<div {...blockProps}>
				<Card>
					<CardHeader>
						<h4 className="pm-admin-section-title">
							Statistics Showcase
						</h4>
					</CardHeader>
					<CardBody>
						<VStack style={{ gap: 20 }}>
							{stats.length > 0 ? (
								<div className="statistics-items">
									{stats.map((stat, index) => (
										<StatItem
											key={index}
											item={stat}
											onChange={(newData) =>
												updateStat(index, newData)
											}
											onRemove={() => removeStat(index)}
										/>
									))}
								</div>
							) : (
								<p>
									No statistics added yet. Add your first
									statistic below.
								</p>
							)}

							<Button
								onClick={addStat}
								className="button-secondary pm-admin-button"
							>
								Add Statistic
							</Button>
						</VStack>
					</CardBody>
				</Card>
			</div>
		</Fragment>
	);
};

export default Edit;
