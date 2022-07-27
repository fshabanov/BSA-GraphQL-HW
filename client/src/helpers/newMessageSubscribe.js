export const newMessageSubscribe = (prev, { subscriptionData }) => {
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
};
