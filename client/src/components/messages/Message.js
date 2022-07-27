import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { CREATE_RESPONSE, GET_MESSAGES } from '../../queries';
import RateMessage from './RateMessage';

export default function Message({
	id,
	text,
	likes,
	dislikes,
	created_at,
	isResponse,
}) {
	const [showReplyInput, setShowReplyInput] = useState(false);
	const [response, setResponse] = useState('');

	const [createResponse] = useMutation(CREATE_RESPONSE, {
		refetchQueries: [{ query: GET_MESSAGES }],
		onCompleted: () => setResponse(''),
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isResponse) return;
		createResponse({
			variables: {
				response: {
					text: response,
					messageId: id,
				},
			},
		});
	};

	return (
		<div>
			<h3 className='text-xl text-opacity-50 text-gray-700'>
				{isResponse ? 'Response' : 'Message'} #{id}
			</h3>
			<div className='flex items-center'>
				<h4>{text}</h4>
				<RateMessage
					likes={likes}
					dislikes={dislikes}
					messageId={id}
					isResponse={isResponse}
				/>
				{!isResponse && (
					<button
						className='ml-auto mr-10 border py-2 px-5 rounded-md'
						onClick={() => setShowReplyInput(!showReplyInput)}
					>
						Reply
					</button>
				)}
			</div>
			<p>{new Date(Number(created_at)).toLocaleString()}</p>
			{showReplyInput && (
				<form onSubmit={handleSubmit}>
					<input
						placeholder='Reply'
						className='p-3 border rounded-md my-3 mx-5'
						value={response}
						onChange={(e) => setResponse(e.target.value)}
					/>
					<button type='submit' className='border-b pb-1 px-2'>
						Send
					</button>
				</form>
			)}
		</div>
	);
}
