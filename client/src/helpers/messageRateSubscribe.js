export const messageRateSubscribe = (prev, { subscriptionData }) => {
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
};
