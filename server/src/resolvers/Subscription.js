const {
	NEW_MESSAGE,
	NEW_RESPONSE,
	RESPONSE_RATE,
	MESSAGE_RATE,
} = require('../events');

const newMessageSubscribe = (_parent, _args, context) =>
	context.pubSub.subscribe(NEW_MESSAGE);

const newMessage = {
	subscribe: newMessageSubscribe,
	resolve: (payload) => payload,
};

const newResponseSubscribe = (_parent, _args, context) =>
	context.pubSub.subscribe(NEW_RESPONSE);

const newResponse = {
	subscribe: newResponseSubscribe,
	resolve: (payload) => payload,
};

const messageRateSubscribe = (_parent, _args, context) =>
	context.pubSub.subscribe(MESSAGE_RATE);

const messageRate = {
	subscribe: messageRateSubscribe,
	resolve: (payload) => payload,
};

const responseRateSubscribe = (_parent, _args, context) =>
	context.pubSub.subscribe(RESPONSE_RATE);

const responseRate = {
	subscribe: responseRateSubscribe,
	resolve: (payload) => payload,
};

module.exports = {
	newMessage,
	newResponse,
	messageRate,
	responseRate,
};
