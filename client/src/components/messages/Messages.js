import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import Message from './Message';
import NewMessage from './NewMessage';
import {
	GET_MESSAGES,
	MESSAGE_RATE,
	NEW_MESSAGE,
	NEW_RESPONSE,
	RESPONSE_RATE,
} from '../../queries';

export default function Messages({
	orderBy,
	orderType,
	filter,
	setCount,
	page,
	messagesPerPage,
}) {
	const { loading, error, data, subscribeToMore, refetch } = useQuery(
		GET_MESSAGES,
		{
			variables: {
				orderBy: {
					[orderBy]: orderType,
				},
				filter,
				skip: (page - 1) * messagesPerPage,
				take: messagesPerPage,
			},
		}
	);

	useEffect(() => {
		setCount(data?.messages?.count || 0);
	}, [data, setCount]);

	useEffect(() => {
		refetch({
			variables: {
				orderBy: {
					[orderBy]: orderType,
				},
				filter,
				skip: (page - 1) * messagesPerPage,
				take: messagesPerPage,
			},
		});
	}, [orderBy, orderType, refetch, filter, page, messagesPerPage]);

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

		subscribeToMore({
			document: NEW_RESPONSE,
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) {
					return prev;
				}
				const { newResponse } = subscriptionData.data;
				const newMessageList = prev.messages.messageList.map((m) => {
					if (m.id === newResponse.messageId) {
						return {
							...m,
							responses: [...m.responses, newResponse],
						};
					}
					return m;
				});
				return {
					...prev,
					messages: {
						...prev.messages,
						messageList: newMessageList,
					},
				};
			},
		});

		subscribeToMore({
			document: MESSAGE_RATE,
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) return prev;
				const { messageRate } = subscriptionData.data;
				const newMessageList = prev?.messages?.messageList?.map((m) => {
					if (m.id === messageRate.id) {
						return {
							...m,
							likes: messageRate.likes,
							dislikes: messageRate.dislikes,
						};
					}
					return m;
				});
				return {
					...prev,
					messages: {
						...prev.messages,
						messageList: newMessageList,
					},
				};
			},
		});

		subscribeToMore({
			document: RESPONSE_RATE,
			updateQuery: (prev, { subscriptionData }) => {
				console.log(subscriptionData.data);
				if (!subscriptionData.data) return prev;
				const { responseRate } = subscriptionData.data;
				const message = prev?.messages?.messageList.find(
					(m) => m.id === responseRate.messageId
				);
				if (!message) return prev;
				const newMessage = message?.responses?.map((r) => {
					if (r.id === responseRate.id) {
						return {
							...r,
							likes: responseRate.likes,
							dislikes: responseRate.dislikes,
						};
					}
					return r;
				});

				const newMessageList = prev.messages.messageList.map((m) => {
					if (m.id === newMessage.id) {
						return newMessage;
					}
					return m;
				});
				return {
					...prev,
					messages: {
						...prev.messages,
						messageList: newMessageList,
					},
				};
			},
		});
	}, [subscribeToMore]);

	return (
		<div className='m-10'>
			{data?.messages?.messageList.map(
				({ id, text, created_at, likes, dislikes, responses }) => (
					<div key={id} className='border border-black rounded-lg my-5 p-5'>
						<Message
							{...{ id, text, created_at, likes, dislikes }}
							orderBy={orderBy}
							orderType={orderType}
						/>
						{(responses?.length || '') && (
							<div className='bg-gray-100 p-3 rounded-lg m-5'>
								{[...responses]
									?.sort((a, b) => a.created_at - b.created_at)
									?.map((response) => (
										<div
											key={response.id}
											className='my-5 border-b-2 border-white p-5'
										>
											<Message
												{...response}
												isResponse
												orderBy={orderBy}
												orderType={orderType}
											/>
										</div>
									))}
							</div>
						)}
					</div>
				)
			)}
			<NewMessage orderBy={orderBy} orderType={orderType} />
		</div>
	);
}
