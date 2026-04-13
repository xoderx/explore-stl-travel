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
    id: 'l8',
    name: "Brennan's",
    category: 'Nightlife',
    description: 'Sophisticated whiskey and cigar lounge in the CWE.',
    imageUrl: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?q=80&w=1000&auto=format&fit=crop',
    rating: 4.9,
    priceLevel: 3,
    address: '4659 Maryland Ave, St. Louis, MO 63108',
    aiSummary: 'The definition of CWE elegance; perfect for a refined night out.',
    featured: true,
    district: 'cwe'
  },
  {
    id: 'l9',
    name: 'Brasserie by Niche',
    category: 'Food',
    description: 'Classic French bistro fare in a beautiful setting.',
    imageUrl: 'https://images.unsplash.com/photo-1550966841-3ee7adac1668?q=80&w=1000&auto=format&fit=crop',
    rating: 4.8,
    priceLevel: 3,
    address: '4580 Laclede Ave, St. Louis, MO 63108',
    aiSummary: 'Award-winning French comfort food that feels like a trip to Paris.',
    featured: true,
    district: 'cwe'
  },
  {
    id: 'l10',
    name: 'Rehab Danz Klub',
    category: 'Nightlife',
    description: 'High-energy LGBTQ+ dance club in the heart of The Grove.',
    imageUrl: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1000&auto=format&fit=crop',
    rating: 4.7,
    priceLevel: 2,
    address: '4054 Chouteau Ave, St. Louis, MO 63110',
    aiSummary: 'Vibrant dance floor and inclusive community atmosphere.',
    featured: true,
    district: 'grove'
  },
  {
    id: 'l11',
    name: 'Urban Chestnut',
    category: 'Nightlife',
    description: 'Massive biergarten and craft brewery.',
    imageUrl: 'https://images.unsplash.com/photo-1555658636-6e4a36218be7?q=80&w=1000&auto=format&fit=crop',
    rating: 4.6,
    priceLevel: 2,
    address: '4465 Manchester Ave, St. Louis, MO 63110',
    aiSummary: 'Industrial-chic brewery with amazing outdoor seating.',
    featured: true,
    district: 'grove'
  },
  {
    id: 'l12',
    name: 'The Last Hotel',
    category: 'Hotels',
    description: 'Boutique hotel in a historic shoe factory.',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop',
    rating: 4.8,
    priceLevel: 4,
    address: '1501 Washington Ave, St. Louis, MO 63103',
    aiSummary: 'Luxury downtown stay with a stunning rooftop pool.',
    featured: true,
    district: 'downtown'
  },
  {
    id: 'l13',
    name: 'America Center',
    category: 'Attractions',
    description: 'St. Louis premier convention and meeting facility.',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop',
    rating: 4.4,
    priceLevel: 2,
    address: '701 Convention Plaza, St. Louis, MO 63101',
    aiSummary: 'Hub for business travelers and major regional expos.',
    featured: false,
    district: 'downtown'
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
    id: 'e5',
    name: 'CWE House Tour',
    venueId: 'v5',
    venueName: 'Maryland Plaza',
    date: '2024-05-25',
    time: '11:00',
    category: 'Culture',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
    description: 'Tour the most beautiful historic homes in St. Louis.',
    district: 'cwe'
  },
  {
    id: 'e6',
    name: 'Grove Pride Night',
    venueId: 'v6',
    venueName: 'Manchester Ave',
    date: '2024-06-01',
    time: '21:00',
    category: 'Nightlife',
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1000&auto=format&fit=crop',
    description: 'A celebration of love and diversity in The Grove.',
    district: 'grove',
    isLive: true
  },
  {
    id: 'e7',
    name: 'Tech Innovation Expo',
    venueId: 'v7',
    venueName: 'America Center',
    date: '2024-05-28',
    time: '09:00',
    category: 'Business',
    imageUrl: 'https://images.unsplash.com/photo-1475721027187-402ad2989a38?q=80&w=1000&auto=format&fit=crop',
    description: 'The largest technology gathering in the Midwest.',
    district: 'downtown',
    isConvention: true
  }
];
export const MOCK_USER_CARD: UserCard = {
  userId: 'u1',
  cardNumber: '314-800-4567',
  points: 1250,
  tier: 'Gold',
  joinedDate: '2023-11-10'
};