import { IndexedEntity } from "./core-utils";
import type { User, Chat, ChatMessage, Listing, Event, UserCard, Deal } from "@shared/types";
import { MOCK_CHAT_MESSAGES, MOCK_CHATS, MOCK_USERS, MOCK_LISTINGS, MOCK_EVENTS, MOCK_USER_CARD } from "@shared/mock-data";
export class UserEntity extends IndexedEntity<User> {
  static readonly entityName = "user";
  static readonly indexName = "users";
  static readonly initialState: User = { id: "", name: "" };
  static seedData = MOCK_USERS;
}
export type ChatBoardState = Chat & { messages: ChatMessage[] };
export class ChatBoardEntity extends IndexedEntity<ChatBoardState> {
  static readonly entityName = "chat";
  static readonly indexName = "chats";
  static readonly initialState: ChatBoardState = { id: "", title: "", messages: [] };
  static seedData = MOCK_CHATS.map(c => ({
    ...c,
    messages: MOCK_CHAT_MESSAGES.filter(m => m.chatId === c.id),
  }));
  async listMessages(): Promise<ChatMessage[]> {
    const { messages } = await this.getState();
    return messages;
  }
  async sendMessage(userId: string, text: string): Promise<ChatMessage> {
    const msg: ChatMessage = { id: crypto.randomUUID(), chatId: this.id, userId, text, ts: Date.now() };
    await this.mutate(s => ({ ...s, messages: [...s.messages, msg] }));
    return msg;
  }
}
export class ListingEntity extends IndexedEntity<Listing> {
  static readonly entityName = "listing";
  static readonly indexName = "listings";
  static readonly initialState: Listing = { id: "", name: "", category: "Attractions", description: "", imageUrl: "", rating: 0, priceLevel: 1, address: "", aiSummary: "" };
  static seedData = MOCK_LISTINGS;
}
export class EventEntity extends IndexedEntity<Event> {
  static readonly entityName = "event";
  static readonly indexName = "events";
  static readonly initialState: Event = { id: "", name: "", venueId: "", venueName: "", date: "", time: "", category: "", imageUrl: "", description: "" };
  static seedData = MOCK_EVENTS;
}
export class UserCardEntity extends IndexedEntity<UserCard & { id: string }> {
  static readonly entityName = "user-card";
  static readonly indexName = "user-cards";
  static readonly initialState: UserCard & { id: string } = { id: "", userId: "", cardNumber: "", points: 0, tier: "Silver", joinedDate: "" };
  static seedData = [{ ...MOCK_USER_CARD, id: MOCK_USER_CARD.userId }];
}