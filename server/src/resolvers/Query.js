const messages = async (_parent, args, context, _info) => {
	const orderBy = args.orderBy || {
		created_at: 'asc',
	};
	const foundMessages = await context.prisma.message.findMany({
		orderBy: [orderBy],
	});
	return foundMessages;
};
module.exports = { messages };
