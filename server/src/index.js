const { createServer, createPubSub } = require('@graphql-yoga/node');
const { readFileSync } = require('fs');
const { PrismaClient } = require('./generated/prisma-client-js');
const { useServer } = require('graphql-ws/lib/use/ws');
const { WebSocketServer } = require('ws');

// Resolvers
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Subscription');
const Message = require('./resolvers/Message');
const Response = require('./resolvers/Response');

async function main() {
	const pubSub = createPubSub();

	const resolvers = {
		Query,
		Mutation,
		Subscription,
		Message,
		Response,
	};

	const typeDefs = readFileSync(require.resolve('./schema.graphql')).toString(
		'utf-8'
	);
	const prisma = new PrismaClient();

	const yogaApp = createServer({
		schema: {
			typeDefs,
			resolvers,
		},
		context: { prisma, pubSub },
		graphiql: {
			subscriptionsProtocol: 'WS',
		},
	});

	// Get NodeJS Server from Yoga
	const httpServer = await yogaApp.start();
	// Create WebSocket server instance from our Node server
	const wsServer = new WebSocketServer({
		server: httpServer,
		path: yogaApp.getAddressInfo().endpoint,
	});

	useServer(
		{
			execute: (args) => args.rootValue.execute(args),
			subscribe: (args) => args.rootValue.subscribe(args),
			onSubscribe: async (ctx, msg) => {
				const { schema, execute, subscribe, contextFactory, parse, validate } =
					yogaApp.getEnveloped(ctx);

				const args = {
					schema,
					operationName: msg.payload.operationName,
					document: parse(msg.payload.query),
					variableValues: msg.payload.variables,
					contextValue: await contextFactory(),
					rootValue: {
						execute,
						subscribe,
					},
				};

				const errors = validate(args.schema, args.document);
				if (errors.length) return errors;
				return args;
			},
		},
		wsServer
	);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
