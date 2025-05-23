import { Button } from '@wordpress/components';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import CredentialItem from './CredentialItem.js';
import './editor.scss';

const Edit = (props) => {
	const { attributes, setAttributes } = props;
	const { heading, credentials } = attributes;

	const baseClass = 'wp-block-pavel-home-certifications-education';

	const blockProps = useBlockProps({
		className: baseClass,
	});

	const updateCredential = (index, newCredentialData) => {
		const newCredentials = [...credentials];
		newCredentials[index] = newCredentialData;
		setAttributes({ credentials: newCredentials });
	};

	const addCredential = () => {
		setAttributes({
			credentials: [
				...credentials,
				{
					logo: {
						id: null,
						url: '',
					},
					title: '',
					description: '',
					status: '',
					institution: '',
				},
			],
		});
	};

	const removeCredential = (index) => {
		const newCredentials = [...credentials];
		newCredentials.splice(index, 1);
		setAttributes({ credentials: newCredentials });
	};

	return (
		<Fragment>
			<div {...blockProps}>
				<div className={`${baseClass}__wrap pm-wrap`}>
					<div className={`${baseClass}__content pm-container`}>
						<RichText
							tagName="p"
							className={`${baseClass}__heading pm-section-heading`}
							value={heading}
							onChange={(newHeading) =>
								setAttributes({ heading: newHeading })
							}
							placeholder="Input section heading..."
						/>
						<div className={`${baseClass}__credentials-grid`}>
							{credentials.length > 0 ? (
								credentials.map((credential, index) => (
									<CredentialItem
										key={index}
										item={credential}
										baseClass={baseClass}
										onChange={(newData) =>
											updateCredential(index, newData)
										}
										onRemove={() => removeCredential(index)}
									/>
								))
							) : (
								<p>
									No certifications added yet. Add your first
									Certification.
								</p>
							)}

							<Button
								onClick={addCredential}
								className="button-secondary pm-admin-button"
							>
								Add Certification
							</Button>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Edit;
