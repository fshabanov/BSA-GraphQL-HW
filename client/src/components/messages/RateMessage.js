import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import {
	DISLIKE_MESSAGE,
	DISLIKE_RESPONSE,
	GET_MESSAGES,
	LIKE_MESSAGE,
	LIKE_RESPONSE,
} from '../../queries';

export default function RateButton({ likes, dislikes, messageId, isResponse }) {
	const [userRate, setUserRate] = useState(null);
	const id = Number(messageId);

	const [updateLikeAmount] = useMutation(LIKE_MESSAGE, {
		refetchQueries: [{ query: GET_MESSAGES }],
		onCompleted: () => {},
	});

	const [updateDislikeAmount] = useMutation(DISLIKE_MESSAGE, {
		refetchQueries: [{ query: GET_MESSAGES }],
		onCompleted: () => {},
	});

	const [updateResponseLikeAmount] = useMutation(LIKE_RESPONSE, {
		refetchQueries: [{ query: GET_MESSAGES }],
		onCompleted: () => {},
	});

	const [updateResponseDislikeAmount] = useMutation(DISLIKE_RESPONSE, {
		refetchQueries: [{ query: GET_MESSAGES }],
		onCompleted: () => {},
	});

	const likeHandler = (amount) =>
		isResponse
			? updateResponseLikeAmount({
					variables: { id, amount },
			  })
			: updateLikeAmount({
					variables: { id, amount },
			  });
	const dislikeHandler = (amount) =>
		isResponse
			? updateResponseDislikeAmount({ variables: { id, amount } })
			: updateDislikeAmount({ variables: { id, amount } });

	const handleLike = () => {
		if (userRate === 'like') {
			likeHandler(-1);
			setUserRate('');
			return;
		}
		if (userRate === 'dislike') {
			dislikeHandler(-1);
			likeHandler(1);
			setUserRate('like');

			return;
		}
		likeHandler(1);
		setUserRate('like');
	};

	const handleDislike = () => {
		if (userRate === 'dislike') {
			dislikeHandler(-1);
			setUserRate('');

			return;
		}
		if (userRate === 'like') {
			likeHandler(-1);
			dislikeHandler(1);
			setUserRate('dislike');

			return;
		}
		dislikeHandler(1);
		setUserRate('dislike');
	};

	return (
		<div className='flex'>
			<div>
				<button
					className='border py-2 px-5 m-5 rounded-md'
					onClick={handleLike}
				>
					{likes} Like
				</button>
			</div>
			<div>
				<button
					className='border py-2 px-5 m-5 rounded-md'
					onClick={handleDislike}
				>
					{dislikes} Dislike
				</button>
			</div>
		</div>
	);
}
