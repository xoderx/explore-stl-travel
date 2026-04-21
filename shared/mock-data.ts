import type { User, Chat, ChatMessage, Listing, Event, UserCard, DistrictImpact, Review, Transaction, ActivityEvent } from './types';
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
    id: 'l21',
    name: "Ted Drewes Frozen Custard",
    category: 'Food',
    description: 'A St. Louis tradition on Route 66 since 1929.',
    imageUrl: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=1000&auto=format&fit=crop',
    rating: 4.9,
    priceLevel: 1,
    address: '6726 Chippewa St, St. Louis, MO 63109',
    aiSummary: 'Legendary frozen custard; get the "Concrete" and flip it upside down!',
    featured: true,
    district: 'south-city'
  },
  {
    id: 'l22',
    name: "Ballpark Village",
    category: 'Nightlife',
    description: 'Sports-anchored entertainment district right across from Busch Stadium.',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1000&auto=format&fit=crop',
    rating: 4.6,
    priceLevel: 3,
    address: '601 Clark Ave, St. Louis, MO 63102',
    aiSummary: 'The heartbeat of St. Louis sports fans during game day.',
    featured: true,
    district: 'ballpark'
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
    id: 'l17',
    name: 'The Pageant',
    category: 'Music',
    description: 'Legendary live music venue hosting national acts and local talent.',
    imageUrl: 'https://images.unsplash.com/photo-1540031982925-bfbbe182f50f?q=80&w=1000&auto=format&fit=crop',
    rating: 4.9,
    priceLevel: 2,
    address: '4253 Delmar Blvd, St. Louis, MO 63108',
    aiSummary: 'Legendary live music venue hosting national acts and local talent.',
    featured: true,
    district: 'delmar'
  },
  {
    id: 'l14',
    name: "Cathy's Kitchen",
    category: 'Food',
    description: 'Authentic Southern comfort food and diner classics.',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop',
    rating: 4.9,
    priceLevel: 2,
    address: '250 S Florissant Rd, Ferguson, MO 63135',
    aiSummary: 'A Ferguson staple serving up the heart and soul of the district.',
    featured: true,
    district: 'ferguson',
    isBlackOwned: true
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
  }
];
export const MOCK_REVIEWS: Review[] = [
  { id: 'r1', listingId: 'l14', userName: 'StL Foodie', rating: 5, comment: 'The catfish is actually life-changing. Best spot in Ferguson!', date: 'Oct 2, 2024' },
];
export const MOCK_USER_CARD: UserCard = {
  userId: 'u1',
  cardNumber: '314-800-4567',
  points: 3500,
  tier: 'Gold',
  joinedDate: '2023-11-10',
  transactions: [
    { id: 't1', userId: 'u1', type: 'Bonus', amount: 1000, description: 'Welcome Reward', timestamp: '2023-11-10T12:00:00Z' },
  ]
};
export const MOCK_ROI_DATA: DistrictImpact[] = [
  {
    district: 'ferguson',
    spendGenerated: 125400,
    businessesSupported: 42,
    activeRewards: 18,
    footTraffic: [
      { day: 'Mon', count: 120 }, { day: 'Tue', count: 150 }, { day: 'Wed', count: 180 }, { day: 'Thu', count: 220 }, { day: 'Fri', count: 350 }, { day: 'Sat', count: 480 }, { day: 'Sun', count: 410 },
    ],
    categories: [
      { name: 'Food', value: 45 }, { name: 'Retail', value: 25 }, { name: 'Community', value: 30 },
    ]
  },
  {
    district: 'stl',
    spendGenerated: 850400,
    businessesSupported: 156,
    activeRewards: 45,
    footTraffic: [
      { day: 'Mon', count: 520 }, { day: 'Tue', count: 650 }, { day: 'Wed', count: 580 }, { day: 'Thu', count: 720 }, { day: 'Fri', count: 950 }, { day: 'Sat', count: 1480 }, { day: 'Sun', count: 1110 },
    ],
    categories: [
      { name: 'Attractions', value: 60 }, { name: 'Food', value: 25 }, { name: 'Museums', value: 15 },
    ]
  }
];
export const MOCK_ACTIVITY_EVENTS: ActivityEvent[] = [
  { id: 'a1', type: 'check-in', message: 'New visitor at Gateway Arch', timestamp: 'Just now', district: 'stl' },
  { id: 'a2', type: 'deal', message: 'Reward redeemed at Ted Drewes', timestamp: '5m ago', district: 'south-city' },
];