const { NEW_MESSAGE } = require('../events');

const newMessageSubscribe = (_parent, _args, context) =>
	context.pubSub.subscribe(NEW_MESSAGE);

const newMessage = {
	subscribe: newMessageSubscribe,
	resolve: (payload) => payload,
};

module.exports = {
	newMessage,
};
