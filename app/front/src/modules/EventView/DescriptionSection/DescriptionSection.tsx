import React, { useEffect, useRef, useState } from 'react';
import { Button, Intent, TextArea } from '@blueprintjs/core';

interface DescriptionSectionProps {
	description: string;
}

const DescriptionSection = ({ description }: DescriptionSectionProps) => {
	const [wasTouched, setWasTouched] = useState(false);
	const [newDescription, setNewDescription] = useState(description);
	const [shouldDisplayTextArea, setShouldDisplayTextArea] = useState(!!description);
	const [shouldDisplaySaveButton, setShouldDisplaySaveButton] = useState(false);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setNewDescription(e.target.value);
	};

	const onActivateTextArea = () => {
		setShouldDisplayTextArea(true);
		setShouldDisplaySaveButton(true);
	};

	const onSaveDescription = () => {
		setShouldDisplaySaveButton(false);
		setWasTouched(false);

		console.log('zapisywanie opisu', newDescription);

		if (!newDescription) {
			setShouldDisplayTextArea(false);
		}
	};

	const onTextAreaClick = () => {
		setWasTouched(true);
		setShouldDisplaySaveButton(true);
	};

	const onAdjustTextAreaSize = () => {
		const textAreaElement = textAreaRef.current;

		if (textAreaElement) {
			textAreaElement.style.height = '1px';
			textAreaElement.style.height = textAreaElement.scrollHeight + 'px';
		}
	};

	useEffect(() => {
		onAdjustTextAreaSize();
	}, [textAreaRef]);

	useEffect(() => {
		setShouldDisplayTextArea(!!description);
	}, [description])

	return (
		<div>
			{!shouldDisplayTextArea && (
				<Button icon='manually-entered-data' onClick={onActivateTextArea}>
					Dodaj opis
				</Button>
			)}

			{shouldDisplayTextArea && (
				<TextArea
					inputRef={textAreaRef}
					readOnly={!wasTouched}
					fill
					value={description || newDescription}
					style={{ resize: 'none' }}
					maxLength={500}
					onClick={onTextAreaClick}
					onInput={onAdjustTextAreaSize}
					onChange={onDescriptionChange}
				/>
			)}

			{shouldDisplaySaveButton && (
				<Button intent={Intent.SUCCESS} onClick={onSaveDescription}>
					Zapisz opis
				</Button>
			)}
		</div>
	);
};

export default DescriptionSection;
