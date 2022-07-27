const {
	NEW_MESSAGE,
	NEW_RESPONSE,
	MESSAGE_RATE,
	RESPONSE_RATE,
} = require('../events');

const createMessage = async (_parent, args, context, _info) => {
	const newMessage = context.prisma.message.create({
		data: args.message,
	});
	context.pubSub.publish(NEW_MESSAGE, newMessage);
	return newMessage;
};

const updateLikeAmount = async (_parent, args, context, _info) => {
	// amount is +- 1
	const { id, amount } = args;
	const doesMessageExist = context.prisma.message
		.findUnique({
			where: { id: Number(id) },
			select: { id: true },
		})
		.then(Boolean);

	if (!doesMessageExist) throw new Error('No message with this ID exists');

	const message = await context.prisma.message.update({
		where: {
			id: Number(id),
		},
		data: {
			likes: {
				increment: amount,
			},
		},
	});

	context.pubSub.publish(MESSAGE_RATE, message);
	return message;
};

const updateDislikeAmount = async (_parent, args, context, _info) => {
	const { id, amount } = args;
	const doesMessageExist = context.prisma.message
		.findUnique({
			where: { id: +id },
			select: { id: true },
		})
		.then(Boolean);

	if (!doesMessageExist) throw new Error('Message with this ID does not exist');

	const message = await context.prisma.message.update({
		where: { id: +id },
		data: {
			dislikes: {
				increment: amount,
			},
		},
	});

	context.pubSub.publish(MESSAGE_RATE, message);
	return message;
};

const createResponse = async (_parent, args, context, _info) => {
	const {
		response: { text, messageId },
	} = args;
	const id = Number(messageId);
	const doesMessageExist = context.prisma.message
		.findUnique({
			where: { id },
			select: { id: true },
		})
		.then(Boolean);

	if (!doesMessageExist) throw new Error('Message with this ID does not exist');

	const response = context.prisma.response.create({
		data: {
			text,
			message: {
				connect: {
					id,
				},
			},
		},
	});

	context.pubSub.publish(NEW_RESPONSE, response);
	return response;
};

const updateResponseLikeAmount = async (_parent, args, context, _info) => {
	// amount is +- 1
	const { id, amount } = args;
	const doesResponseExist = context.prisma.response
		.findUnique({
			where: { id: Number(id) },
			select: { id: true },
		})
		.then(Boolean);

	if (!doesResponseExist) throw new Error('No message with this ID exists');

	const response = await context.prisma.response.update({
		where: {
			id: Number(id),
		},
		data: {
			likes: {
				increment: amount,
			},
		},
	});

	context.pubSub.publish(RESPONSE_RATE, response);
	return response;
};

const updateResponseDislikeAmount = async (_parent, args, context, _info) => {
	const { id, amount } = args;
	const doesResponseExist = context.prisma.response
		.findUnique({
			where: { id: Number(id) },
			select: { id: true },
		})
		.then(Boolean);

	if (!doesResponseExist)
		throw new Error('Message with this ID does not exist');

	const response = await context.prisma.response.update({
		where: { id: Number(id) },
		data: {
			dislikes: {
				increment: amount,
			},
		},
	});
	context.pubSub.publish(RESPONSE_RATE, response);
	return response;
};

module.exports = {
	createMessage,
	updateLikeAmount,
	updateDislikeAmount,
	createResponse,
	updateResponseDislikeAmount,
	updateResponseLikeAmount,
};
