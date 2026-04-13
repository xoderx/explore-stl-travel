import type { User, Chat, ChatMessage, Listing, Event, UserCard } from './types';
export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'User A' },
  { id: 'u2', name: 'User B' }
];
export const MOCK_CHATS: Chat[] = [
  { id: 'c1', title: 'General' },
];
export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  { id: 'm1', chatId: 'c1', userId: 'u1', text: 'Hello', ts: Date.now() },
];
export const MOCK_LISTINGS: Listing[] = [
  {
    id: 'l1',
    name: 'Gateway Arch',
    category: 'Attractions',
    description: 'Iconic 630-foot monument in St. Louis, Missouri.',
    imageUrl: 'https://images.unsplash.com/photo-1577713430580-0370f1a9415c?q=80&w=1000&auto=format&fit=crop',
    rating: 4.8,
    priceLevel: 2,
    address: '11 N 4th St, St. Louis, MO 63102',
    aiSummary: 'Must-visit historic site with panoramic views and underground museum.',
    featured: true
  },
  {
    id: 'l2',
    name: 'City Museum',
    category: 'Attractions',
    description: 'Play house made of found objects in an old warehouse.',
    imageUrl: 'https://images.unsplash.com/photo-1549413264-6f81df6f8df7?q=80&w=1000&auto=format&fit=crop',
    rating: 4.9,
    priceLevel: 2,
    address: '750 N 16th St, St. Louis, MO 63103',
    aiSummary: 'An architectural playground that defies gravity and convention.',
    featured: true
  },
  {
    id: 'l3',
    name: 'Sugarfire Smokehouse',
    category: 'Food',
    description: 'Award-winning St. Louis BBQ with creative sides.',
    imageUrl: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1000&auto=format&fit=crop',
    rating: 4.7,
    priceLevel: 2,
    address: '605 Washington Ave, St. Louis, MO 63101',
    aiSummary: 'Famous for brisket and chef-inspired daily specials.',
    featured: true
  }
];
export const MOCK_EVENTS: Event[] = [
  {
    id: 'e1',
    name: 'Cardinals vs Cubs',
    venueId: 'v1',
    venueName: 'Busch Stadium',
    date: '2024-05-15',
    time: '19:15',
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1508344928928-7165167de122?q=80&w=1000&auto=format&fit=crop',
    description: 'Classic MLB rivalry game.'
  },
  {
    id: 'e2',
    name: 'St. Louis Jazz Festival',
    venueId: 'v2',
    venueName: 'Forest Park',
    date: '2024-06-20',
    time: '14:00',
    category: 'Music',
    imageUrl: 'https://images.unsplash.com/photo-1514525253344-99a4299966c2?q=80&w=1000&auto=format&fit=crop',
    description: 'Free jazz performance under the sun.'
  }
];
export const MOCK_USER_CARD: UserCard = {
  userId: 'u1',
  cardNumber: '314-800-4567',
  points: 1250,
  tier: 'Gold',
  joinedDate: '2023-11-10'
};