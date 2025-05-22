import {
	Card,
	CardBody,
	CardHeader,
	Button,
	TextControl,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { useBlockProps } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import CredentialItem from './CredentialItem.js';
import './editor.scss';

const Edit = (props) => {
	const { attributes, setAttributes } = props;
	const { heading, credentials } = attributes;

	const blockProps = useBlockProps({
		className: 'wp-block-pavel-home-certifications-education',
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
				<Card>
					<CardHeader>
						<h4 className="pm-admin-section-title">
							Certifications & Education
						</h4>
					</CardHeader>
					<CardBody>
						<VStack style={{ gap: 20 }}>
							<TextControl
								label="Section Heading:"
								value={heading}
								onChange={(newHeading) =>
									setAttributes({ heading: newHeading })
								}
								placeholder="Input section heading..."
							/>

							<h4 className="pm-admin-section-title">
								Certifications
							</h4>

							{credentials.length > 0 ? (
								<div className="credentials-items">
									{credentials.map((credential, index) => (
										<CredentialItem
											key={index}
											item={credential}
											onChange={(newData) =>
												updateCredential(index, newData)
											}
											onRemove={() =>
												removeCredential(index)
											}
										/>
									))}
								</div>
							) : (
								<p>
									No certifications added yet. Add your first
									Certification below.
								</p>
							)}

							<Button
								onClick={addCredential}
								className="button-secondary pm-admin-button"
							>
								Add Certification
							</Button>
						</VStack>
					</CardBody>
				</Card>
			</div>
		</Fragment>
	);
};

export default Edit;
