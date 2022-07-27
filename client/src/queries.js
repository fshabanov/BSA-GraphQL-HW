import { gql } from '@apollo/client';

export const GET_MESSAGES = gql`
	query getMessages(
		$orderBy: MessageOrderByInput
		$filter: String
		$skip: Int
		$take: Int
	) {
		messages(orderBy: $orderBy, filter: $filter, skip: $skip, take: $take) {
			messageList {
				id
				text
				created_at
				likes
				dislikes
				responses {
					id
					text
					created_at
					likes
					dislikes
				}
			}
			count
		}
	}
`;

export const NEW_MESSAGE = gql`
	subscription newMessage {
		newMessage {
			id
			text
			created_at
		}
	}
`;

export const CREATE_MESSAGE = gql`
	mutation createMessage($message: MessageInput!) {
		createMessage(message: $message) {
			id
		}
	}
`;

export const LIKE_MESSAGE = gql`
	mutation updateLikeAmount($id: ID!, $amount: Int!) {
		updateLikeAmount(id: $id, amount: $amount) {
			id
			likes
			dislikes
		}
	}
`;

export const DISLIKE_MESSAGE = gql`
	mutation updateDislikeAmount($id: ID!, $amount: Int!) {
		updateDislikeAmount(id: $id, amount: $amount) {
			id
			likes
			dislikes
		}
	}
`;

export const LIKE_RESPONSE = gql`
	mutation updateResponseLikeAmount($id: ID!, $amount: Int!) {
		updateResponseLikeAmount(id: $id, amount: $amount) {
			id
			likes
			dislikes
		}
	}
`;

export const DISLIKE_RESPONSE = gql`
	mutation updateResponseDislikeAmount($id: ID!, $amount: Int!) {
		updateResponseDislikeAmount(id: $id, amount: $amount) {
			id
			likes
			dislikes
		}
	}
`;

export const CREATE_RESPONSE = gql`
	mutation createResponse($response: ResponseInput!) {
		createResponse(response: $response) {
			id
		}
	}
`;

export const NEW_RESPONSE = gql`
	subscription newResponse {
		newResponse {
			id
			text
			likes
			dislikes
			messageId
		}
	}
`;

export const MESSAGE_RATE = gql`
	subscription messageRate {
		messageRate {
			id
			likes
			dislikes
		}
	}
`;
export const RESPONSE_RATE = gql`
	subscription responseRate {
		responseRate {
			id
			likes
			dislikes
			messageId
		}
	}
`;
