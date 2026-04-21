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
export type District = 'stl' | 'delmar' | 'cwe' | 'grove' | 'downtown' | 'ferguson' | 'south-city' | 'ballpark';
export interface ActivityEvent {
  id: string;
  type: 'check-in' | 'deal' | 'event' | 'trending';
  message: string;
  timestamp: string;
  district: District;
}
export interface Listing {
  id: string;
  name: string;
  category: 'Food' | 'Nightlife' | 'Museums' | 'Attractions' | 'Parks' | 'Boutiques' | 'Wellness' | 'Hotels' | 'Community' | 'Youth Initiatives' | 'Music';
  description: string;
  imageUrl: string;
  rating: number;
  priceLevel: number; // 1-4
  address: string;
  aiSummary: string;
  featured?: boolean;
  district: District;
  isBlackOwned?: boolean;
  isSponsored?: boolean;
  sponsoredTagline?: string;
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
  impactScore?: number;
}
export interface Review {
  id: string;
  listingId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatarUrl?: string;
}
export interface ReviewInput {
  listingId: string;
  userName: string;
  rating: number;
  comment: string;
}
export interface Transaction {
  id: string;
  userId: string;
  type: 'Redemption' | 'Bonus' | 'Reward' | 'Check-in';
  amount: number;
  description: string;
  timestamp: string;
}
export interface CheckInInput {
  userId: string;
  listingId: string;
  listingName: string;
}
export interface DashboardMetric {
  label: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}
export interface DistrictImpact {
  district: District;
  spendGenerated: number;
  businessesSupported: number;
  activeRewards: number;
  footTraffic: { day: string; count: number }[];
  categories: { name: string; value: number }[];
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
  transactions: Transaction[];
}