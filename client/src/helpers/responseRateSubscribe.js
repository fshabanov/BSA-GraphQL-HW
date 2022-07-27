export const responseRateSubscribe = (prev, { subscriptionData }) => {
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
};
