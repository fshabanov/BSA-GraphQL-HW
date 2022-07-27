import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import Message from './Message';
import NewMessage from './NewMessage';
import { GET_MESSAGES, NEW_MESSAGE } from '../../queries';

export default function Messages({ orderBy, orderType }) {
	const { loading, error, data, subscribeToMore, refetch } = useQuery(
		GET_MESSAGES,
		{
			variables: {
				orderBy: {
					[orderBy]: orderType,
				},
			},
		}
	);

	useEffect(() => {
		refetch({
			variables: {
				orderBy: {
					[orderBy]: orderType,
				},
			},
		});
	}, [orderBy]);

	useEffect(() => {
		subscribeToMore({
			document: NEW_MESSAGE,
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) {
					return prev;
				}
				const { newMessage } = subscriptionData.data;
				if (!prev.messages.messageList) {
					return {
						...prev,
						messages: {
							...prev.messages,
							messageList: [{ ...newMessage }],
						},
					};
				}
				return {
					...prev,
					messages: {
						...prev.messages,
						messageList: [{ ...newMessage }, ...prev.messages.messageList],
					},
				};
			},
		});
	}, [subscribeToMore]);

	return (
		<div className='m-10'>
			{data?.messages.map(
				({ id, text, created_at, likes, dislikes, responses }) => (
					<div key={id} className='border rounded-lg my-5 p-5'>
						<Message {...{ id, text, created_at, likes, dislikes }} />
						{(responses?.length || '') && (
							<div className='bg-gray-100 p-3 rounded-lg m-5'>
								{[...responses]
									?.sort((a, b) => a.created_at - b.created_at)
									?.map((response) => (
										<div
											key={response.id}
											className='my-5 border-b-2 border-white p-5'
										>
											<Message {...response} isResponse />
										</div>
									))}
							</div>
						)}
					</div>
				)
			)}
			<NewMessage />
		</div>
	);
}
