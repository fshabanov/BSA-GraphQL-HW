const message = (parent, _args, context, _info) =>
	context.prisma.response.findUnique({ where: { id: parent.id } }).message();

module.export = { message };
