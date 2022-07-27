const messages = async (_parent, args, context, _info) => {
	3;
	const { orderBy = { created_at: 'asc' }, filter, skip = 0, take = 10 } = args;

	const where = filter
		? {
				text: filter,
		  }
		: {};

	const messageList = await context.prisma.message.findMany({
		orderBy: [orderBy],
		where,
		skip,
		take,
	});

	const count = await context.prisma.message.count();
	return { messageList, count };
};
module.exports = { messages };
