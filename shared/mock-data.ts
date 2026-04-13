import type { User, Chat, ChatMessage, Listing, Event, UserCard, DistrictImpact, Review, Transaction } from './types';
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
  },
  {
    id: 'l15',
    name: 'I Love Ferguson',
    category: 'Community',
    description: 'Community resource center and local commemorative shop.',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop',
    rating: 4.8,
    priceLevel: 1,
    address: '108 S Florissant Rd, Ferguson, MO 63135',
    aiSummary: 'The heart of local pride and community rebuilding efforts.',
    featured: true,
    district: 'ferguson'
  },
  {
    id: 'l16',
    name: 'Ferguson Empowerment Center',
    category: 'Youth Initiatives',
    description: 'A hub for educational programs and job training.',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop',
    rating: 4.9,
    priceLevel: 1,
    address: '9420 W Florissant Ave, Ferguson, MO 63136',
    aiSummary: 'Driving future success through youth mentorship and resources.',
    featured: false,
    district: 'ferguson'
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
    id: 'e8',
    name: 'Unity Weekend Festival',
    venueId: 'v8',
    venueName: 'January-Wabash Park',
    date: '2024-06-15',
    time: '12:00',
    category: 'Culture',
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1000&auto=format&fit=crop',
    description: 'Celebrating Ferguson community and local business.',
    district: 'ferguson',
    impactScore: 95
  }
];
export const MOCK_REVIEWS: Review[] = [
  { id: 'r1', listingId: 'l14', userName: 'StL Foodie', rating: 5, comment: 'The catfish is actually life-changing. Best spot in Ferguson!', date: 'Oct 2, 2024' },
  { id: 'r2', listingId: 'l1', userName: 'TravelerX', rating: 4, comment: 'The views are great, but the wait for the tram was long.', date: 'Oct 15, 2024' },
  { id: 'r3', listingId: 'l8', userName: 'NightOwl', rating: 5, comment: 'Incredible cigar selection and very refined atmosphere.', date: 'Oct 18, 2024' },
];
export const MOCK_USER_CARD: UserCard = {
  userId: 'u1',
  cardNumber: '314-800-4567',
  points: 3500,
  tier: 'Gold',
  joinedDate: '2023-11-10',
  transactions: [
    { id: 't1', userId: 'u1', type: 'Bonus', amount: 1000, description: 'Welcome Reward', timestamp: '2023-11-10T12:00:00Z' },
    { id: 't2', userId: 'u1', type: 'Check-in', amount: 50, description: 'Cathy\'s Kitchen Visit', timestamp: '2024-10-02T18:30:00Z' },
  ]
};
export const MOCK_ROI_DATA: DistrictImpact[] = [
  {
    district: 'ferguson',
    spendGenerated: 125400,
    businessesSupported: 42,
    activeRewards: 18,
    footTraffic: [
      { day: 'Mon', count: 120 },
      { day: 'Tue', count: 150 },
      { day: 'Wed', count: 180 },
      { day: 'Thu', count: 220 },
      { day: 'Fri', count: 350 },
      { day: 'Sat', count: 480 },
      { day: 'Sun', count: 410 },
    ],
    categories: [
      { name: 'Food', value: 45 },
      { name: 'Retail', value: 25 },
      { name: 'Community', value: 30 },
    ]
  },
  {
    district: 'delmar',
    spendGenerated: 342000,
    businessesSupported: 88,
    activeRewards: 32,
    footTraffic: [
      { day: 'Mon', count: 400 },
      { day: 'Tue', count: 420 },
      { day: 'Wed', count: 450 },
      { day: 'Thu', count: 580 },
      { day: 'Fri', count: 850 },
      { day: 'Sat', count: 1200 },
      { day: 'Sun', count: 950 },
    ],
    categories: [
      { name: 'Music', value: 50 },
      { name: 'Food', value: 35 },
      { name: 'Nightlife', value: 15 },
    ]
  }
];