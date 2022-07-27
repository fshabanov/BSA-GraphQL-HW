const { NEW_MESSAGE } = require('../events');

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
	const message = context.prisma.message
		.findUnique({
			where: { id: Number(id) },
			select: { id: true },
		})
		.then(Boolean);

	if (!message) throw new Error('No message with this ID exists');

	return await context.prisma.message.update({
		where: {
			id: Number(id),
		},
		data: {
			likes: {
				increment: amount,
			},
		},
	});
};

const updateDislikeAmount = async (_parent, args, context, _info) => {
	const { id, amount } = args;
	const message = context.prisma.message
		.findUnique({
			where: { id: +id },
			select: { id: true },
		})
		.then(Boolean);

	if (!message) throw new Error('Message with this ID does not exist');

	return await context.prisma.message.update({
		where: { id: +id },
		data: {
			dislikes: {
				increment: amount,
			},
		},
	});
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

	return context.prisma.response.create({
		data: {
			text,
			message: {
				connect: {
					id,
				},
			},
		},
	});
};

const updateResponseLikeAmount = async (_parent, args, context, _info) => {
	// amount is +- 1
	const { id, amount } = args;
	const response = context.prisma.response
		.findUnique({
			where: { id: Number(id) },
			select: { id: true },
		})
		.then(Boolean);

	if (!response) throw new Error('No message with this ID exists');

	return await context.prisma.response.update({
		where: {
			id: Number(id),
		},
		data: {
			likes: {
				increment: amount,
			},
		},
	});
};

const updateResponseDislikeAmount = async (_parent, args, context, _info) => {
	const { id, amount } = args;
	const response = context.prisma.response
		.findUnique({
			where: { id: Number(id) },
			select: { id: true },
		})
		.then(Boolean);

	if (!response) throw new Error('Message with this ID does not exist');

	return await context.prisma.response.update({
		where: { id: Number(id) },
		data: {
			dislikes: {
				increment: amount,
			},
		},
	});
};

module.exports = {
	createMessage,
	updateLikeAmount,
	updateDislikeAmount,
	createResponse,
	updateResponseDislikeAmount,
	updateResponseLikeAmount,
};
