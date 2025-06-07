import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	Notice,
} from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';

const PostListInspectorPanel = ({
	siteSettings,
	setSiteSettings,
	isLoading,
}) => {
	const updateSetting = async (settingKey, value) => {
		const newSettings = { ...siteSettings, [settingKey]: value };
		setSiteSettings(newSettings);

		const apiKey = `pm_post_${settingKey === 'columns' ? 'layout' : `show_${settingKey.replace('show', '').toLowerCase()}`}`;

		try {
			await apiFetch({
				path: '/pavel/v1/post-settings',
				method: 'POST',
				data: { [apiKey]: value },
			});
		} catch (error) {
			console.error(`Failed to save ${settingKey}:`, error);
			setSiteSettings(siteSettings);
		}
	};

	const updateColumns = (value) => updateSetting('columns', parseInt(value));
	const updateShowExcerpt = (value) => updateSetting('showExcerpt', value);
	const updateShowThumb = (value) => updateSetting('showThumb', value);
	const updateShowDate = (value) => updateSetting('showDate', value);
	const updateShowCategories = (value) =>
		updateSetting('showCategories', value);

	return (
		<InspectorControls>
			<PanelBody title="Post List Settings">
				<Notice status="info" isDismissible={false}>
					<p>
						<strong>Global Settings:</strong> These settings affect
						all post list blocks across your entire site.
					</p>
				</Notice>

				<SelectControl
					label="Layout"
					value={siteSettings.columns}
					options={[
						{ label: '2 Columns', value: 2 },
						{ label: '3 Columns', value: 3 },
					]}
					onChange={updateColumns}
					disabled={isLoading}
				/>

				<ToggleControl
					label="Show Excerpt"
					checked={siteSettings.showExcerpt}
					onChange={updateShowExcerpt}
					disabled={isLoading}
					help="Display post excerpts in all post list blocks"
				/>

				<ToggleControl
					label="Show Thumbnail"
					checked={siteSettings.showThumb}
					onChange={updateShowThumb}
					disabled={isLoading}
					help="Display post featured images in all post list blocks"
				/>

				<ToggleControl
					label="Show Date"
					checked={siteSettings.showDate}
					onChange={updateShowDate}
					disabled={isLoading}
					help="Display post dates in all post list blocks"
				/>

				<ToggleControl
					label="Show Categories"
					checked={siteSettings.showCategories}
					onChange={updateShowCategories}
					disabled={isLoading}
					help="Display post categories in all post list blocks"
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default PostListInspectorPanel;
