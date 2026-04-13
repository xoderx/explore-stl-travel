export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export interface User {
  id: string;
  name: string;
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number;
}
export type District = 'stl' | 'delmar' | 'cwe' | 'grove' | 'downtown';
export interface Listing {
  id: string;
  name: string;
  category: 'Food' | 'Nightlife' | 'Museums' | 'Attractions' | 'Parks' | 'Boutiques' | 'Wellness' | 'Hotels' | 'Community';
  description: string;
  imageUrl: string;
  rating: number;
  priceLevel: number; // 1-4
  address: string;
  aiSummary: string;
  featured?: boolean;
  district: District;
}
export interface Event {
  id: string;
  name: string;
  venueId: string;
  venueName: string;
  date: string; // ISO
  time: string;
  category: string;
  imageUrl: string;
  description: string;
  district: District;
  isLive?: boolean;
  isConvention?: boolean;
}
export interface Deal {
  id: string;
  listingId: string;
  title: string;
  discount: string;
  pointsRequired: number;
  expiryDate: string;
}
export interface UserCard {
  userId: string;
  cardNumber: string;
  points: number;
  tier: 'Silver' | 'Gold' | 'Platinum';
  joinedDate: string;
}