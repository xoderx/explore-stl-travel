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
    featured: true,
    district: 'stl'
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
    featured: true,
    district: 'stl'
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
    featured: true,
    district: 'stl'
  },
  {
    id: 'l4',
    name: 'Blueberry Hill',
    category: 'Nightlife',
    description: 'A St. Louis landmark in the Delmar Loop.',
    imageUrl: 'https://images.unsplash.com/photo-1514525253344-99a4299966c2?q=80&w=1000&auto=format&fit=crop',
    rating: 4.8,
    priceLevel: 2,
    address: '6504 Delmar Blvd, St. Louis, MO 63130',
    aiSummary: 'Iconic pop culture restaurant and music venue with a legendary atmosphere.',
    featured: true,
    district: 'delmar'
  },
  {
    id: 'l5',
    name: 'The Pageant',
    category: 'Nightlife',
    description: 'Premier concert venue in the Midwest.',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop',
    rating: 4.9,
    priceLevel: 3,
    address: '6161 Delmar Blvd, St. Louis, MO 63112',
    aiSummary: 'Built from the ground up for live music, offering perfect sightlines.',
    featured: true,
    district: 'delmar'
  },
  {
    id: 'l6',
    name: "Fitz's Root Beer",
    category: 'Food',
    description: 'Family-friendly craft soda micro-bottlery.',
    imageUrl: 'https://images.unsplash.com/photo-1543003919-a995d5227d82?q=80&w=1000&auto=format&fit=crop',
    rating: 4.6,
    priceLevel: 2,
    address: '6605 Delmar Blvd, St. Louis, MO 63130',
    aiSummary: 'Watch the vintage bottling line while enjoying a world-famous root beer float.',
    featured: true,
    district: 'delmar'
  },
  {
    id: 'l7',
    name: 'Vintage Vinyl',
    category: 'Attractions',
    description: 'World-renowned independent record store.',
    imageUrl: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?q=80&w=1000&auto=format&fit=crop',
    rating: 4.8,
    priceLevel: 2,
    address: '6610 Delmar Blvd, St. Louis, MO 63130',
    aiSummary: 'A crate-diggers paradise in the heart of the Loop.',
    featured: false,
    district: 'delmar'
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
    description: 'Classic MLB rivalry game.',
    district: 'stl'
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
    description: 'Free jazz performance under the sun.',
    district: 'stl'
  },
  {
    id: 'e3',
    name: 'Live Local Showcase',
    venueId: 'v3',
    venueName: 'The Pageant',
    date: '2024-05-20',
    time: '20:00',
    category: 'Music',
    imageUrl: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000&auto=format&fit=crop',
    description: 'Featuring the best indie acts from St. Louis.',
    district: 'delmar',
    isLive: true
  },
  {
    id: 'e4',
    name: 'Loop Art Walk',
    venueId: 'v4',
    venueName: 'Delmar Blvd',
    date: '2024-05-21',
    time: '17:00',
    category: 'Culture',
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4ce186860d?q=80&w=1000&auto=format&fit=crop',
    description: 'Street-side gallery exhibition.',
    district: 'delmar'
  }
];
export const MOCK_USER_CARD: UserCard = {
  userId: 'u1',
  cardNumber: '314-800-4567',
  points: 1250,
  tier: 'Gold',
  joinedDate: '2023-11-10'
};