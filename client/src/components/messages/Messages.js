import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import Message from './Message';
import NewMessage from './NewMessage';
import Loader from '../Loader';
import {
	GET_MESSAGES,
	MESSAGE_RATE,
	NEW_MESSAGE,
	NEW_RESPONSE,
	RESPONSE_RATE,
} from '../../queries';
import { newMessageSubscribe } from '../../helpers/newMessageSubscribe';
import { newResponseSubscribe } from '../../helpers/newResponseSubscribe';
import { messageRateSubscribe } from '../../helpers/messageRateSubscribe';
import { responseRateSubscribe } from '../../helpers/responseRateSubscribe';

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
			orderBy: {
				[orderBy]: orderType,
			},
			filter,
			skip: (page - 1) * messagesPerPage,
			take: messagesPerPage,
		});
	}, [orderBy, orderType, refetch, filter, page, messagesPerPage]);

	useEffect(() => {
		subscribeToMore({
			document: NEW_MESSAGE,
			updateQuery: newMessageSubscribe,
		});

		subscribeToMore({
			document: NEW_RESPONSE,
			updateQuery: newResponseSubscribe,
		});

		subscribeToMore({
			document: MESSAGE_RATE,
			updateQuery: messageRateSubscribe,
		});

		subscribeToMore({
			document: RESPONSE_RATE,
			updateQuery: responseRateSubscribe,
		});
	}, [subscribeToMore]);

	if (loading) return <Loader />;
	if (error) return <div>Error... {error.message}</div>;

	return (
		<div className='m-10 mb-20'>
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
