import { gql } from '@apollo/client';

export const typeDefs = gql`
	type Message {
		id: ID!
		text: String!
		created_at: String!
	}

	input MessageInput {
		text: String!
	}

	input ResponseInput {
		text: String!
		messageId: ID!
	}
	enum Sort {
		asc
		desc
	}
	input MessageOrderByInput {
		created_at: Sort
		likes: Sort
		dislikes: Sort
	}
`;
