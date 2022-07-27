import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { CREATE_MESSAGE, GET_MESSAGES } from '../../queries';

export default function NewMessage() {
	const [message, setMessage] = useState('');
	const [createProduct, { loading, error }] = useMutation(CREATE_MESSAGE, {
		refetchQueries: [{ query: GET_MESSAGES }],
		onCompleted: () => setMessage(''),
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		createProduct({
			variables: {
				message: {
					text: message,
				},
			},
		});
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					placeholder='Message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button type='submit'>Send</button>
			</form>
		</div>
	);
}
