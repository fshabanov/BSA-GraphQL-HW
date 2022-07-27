const responses = (parent, _args, context, _info) =>
	context.prisma.message.findUnique({ where: { id: parent.id } }).responses();

module.exports = { responses };
