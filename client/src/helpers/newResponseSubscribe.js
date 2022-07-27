export const newResponseSubscribe = (prev, { subscriptionData }) => {
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
};
