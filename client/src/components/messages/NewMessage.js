import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { CREATE_MESSAGE, GET_MESSAGES } from '../../queries';

export default function NewMessage({ orderBy, orderType }) {
	const [message, setMessage] = useState('');
	const [createProduct, { loading, error }] = useMutation(CREATE_MESSAGE, {
		refetchQueries: [
			{
				query: GET_MESSAGES,
				variables: {
					orderBy: {
						[orderBy]: orderType,
					},
				},
			},
		],
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
			<form
				onSubmit={handleSubmit}
				className='flex items-center w-full bg-white fixed bottom-0	p-3'
			>
				<input
					placeholder='Message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					className='border border-black p-3 rounded-md w-[90%]'
				/>
				<button
					type='submit'
					className='border border-black py-3 px-5 rounded-md ml-4'
				>
					Send
				</button>
			</form>
		</div>
	);
}
