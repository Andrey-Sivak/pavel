import { TextControl, CheckboxControl, Button } from '@wordpress/components';
import { useState, useRef } from '@wordpress/element';
import './link-editor.scss';

const LinkEditor = ({ url, target, onChange, index = null, children }) => {
	const urlPlaceholder = 'Enter URL...';
	const [isEditorOpen, setIsEditorOpen] = useState(false);
	const [tempUrl, setTempUrl] = useState(url);
	const [tempTarget, setTempTarget] = useState(target);
	const wrapperRef = useRef(null);
	const urlInputRef = useRef(null);

	const handleSave = () => {
		if (index === null) {
			onChange({
				url: tempUrl,
				target: tempTarget,
			});
		} else {
			onChange(index, {
				url: tempUrl,
				target: tempTarget,
			});
		}
		setIsEditorOpen(false);
	};

	const handleFocus = () => {
		setIsEditorOpen(true);
	};

	const handleBlur = (e) => {
		if (
			wrapperRef.current &&
			wrapperRef.current.contains(e.relatedTarget)
		) {
			return;
		}
		setIsEditorOpen(false);
	};

	const focusUrlInput = () => {
		if (isEditorOpen && urlInputRef.current) {
			setTimeout(() => {
				urlInputRef.current.focus();
			}, 0);
		}
	};

	if (isEditorOpen) {
		focusUrlInput();
	}

	return (
		<div
			className="admin_link-wrapper"
			ref={wrapperRef}
			onFocus={handleFocus}
			onBlur={handleBlur}
			tabIndex="0"
		>
			{children}
			{isEditorOpen && (
				<div className="admin_link-controls">
					<div className="">
						<TextControl
							ref={urlInputRef}
							value={tempUrl}
							onChange={(newUrl) => setTempUrl(newUrl)}
							placeholder={urlPlaceholder}
							className="admin_link-url"
						/>
						<CheckboxControl
							label="Open in new tab"
							checked={tempTarget === '_blank'}
							onChange={(isChecked) =>
								setTempTarget(isChecked ? '_blank' : '')
							}
							className="admin_link-target"
						/>
					</div>

					<Button
						variant="primary"
						onClick={handleSave}
						className="pm-admin-button admin_link-save"
					>
						<svg width="24" height="24" aria-hidden="true">
							<path d="m6.734 16.106 2.176-2.38-1.093-1.028-3.846 4.158 3.846 4.158 1.093-1.028-2.176-2.38h2.811c1.125 0 2.25.03 3.374 0 1.428-.001 3.362-.25 4.963-1.277 1.66-1.065 2.868-2.906 2.868-5.859 0-2.479-1.327-4.896-3.65-5.93-1.82-.813-3.044-.8-4.806-.788l-.567.002v1.5c.184 0 .368 0 .553-.002 1.82-.007 2.704-.014 4.21.657 1.854.827 2.76 2.657 2.76 4.561 0 2.472-.973 3.824-2.178 4.596-1.258.807-2.864 1.04-4.163 1.04h-.02c-1.115.03-2.229 0-3.344 0H6.734Z" />
						</svg>
					</Button>
				</div>
			)}
		</div>
	);
};

export default LinkEditor;
