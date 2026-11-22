import { Deal } from '../types';

// Demo dataset for GottaGo!.
//
// This app originally live-scraped real mall deal pages and ran them through
// an AI extraction pipeline. That's expensive to keep running publicly with
// no traffic controls, so this demo build uses a fixed set of fictional
// stores, deals, AND addresses instead — nothing here corresponds to a real
// business or a real street address, so there's no live offer or real
// location for anyone to be confused by. Coordinates are loosely scattered
// around the real Phoenix/Scottsdale/Tempe metro area so the map still
// reads as a real region, but they don't land on any actual mall or store.
// Phone numbers stay inside 555-0100–0199, the range reserved for fiction.
// Store names were checked against real Arizona businesses (Nov 2026).

export interface DemoStoreDetails {
  phone: string;
  hours: string[];
  website?: string;
}

export interface DemoDeal extends Deal {
  storeDetails: DemoStoreDetails;
}

export const demoDeals: DemoDeal[] = [
  {
    id: 'd1',
    storeName: 'Cactus & Clay Home Goods',
    dealTitle: '40% Off Ceramic Dinnerware',
    description: 'Hand-glazed stoneware, seconds and overstock, marked down for the season.',
    category: 'Home & Garden',
    discount: '40% Off',
    location: { lat: 33.4942, lng: -111.9261, address: '412 Ocotillo Row, Scottsdale, AZ 85251' },
    distance: 0.4,
    rating: 4.6,
    expiresAt: '2026-11-30',
    storeDetails: { phone: '(480) 555-0148', hours: ['Mon–Sat: 10am–8pm', 'Sun: 11am–6pm'], website: '#' },
  },
  {
    id: 'd2',
    storeName: 'Sonoran Sole Running Co.',
    dealTitle: 'Buy One Pair, Get One 50% Off',
    description: 'Mix and match trail and road shoes from last season\'s lineup.',
    category: 'Fashion & Apparel',
    discount: 'BOGO 50%',
    location: { lat: 33.5011, lng: -111.9198, address: '88 Agave Walk, Scottsdale, AZ 85251' },
    distance: 0.5,
    rating: 4.8,
    expiresAt: '2026-12-15',
    storeDetails: { phone: '(480) 555-0172', hours: ['Mon–Sun: 9am–9pm'], website: '#' },
  },
  {
    id: 'd3',
    storeName: 'Papago Provisions',
    dealTitle: '$10 Off Any $50 Grocery Run',
    description: 'Small-batch local jams, desert honey, and pantry staples.',
    category: 'Food & Dining',
    discount: '$10 Off $50',
    location: { lat: 33.4875, lng: -111.9340, address: '215 Piñon Plaza, Scottsdale, AZ 85257' },
    distance: 0.6,
    rating: 4.4,
    expiresAt: '2026-10-31',
    storeDetails: { phone: '(480) 555-0119', hours: ['Daily: 8am–7pm'], website: '#' },
  },
  {
    id: 'd4',
    storeName: 'Ironwood Outfitters',
    dealTitle: '25% Off All Outerwear',
    description: 'Jackets and layers for the six weeks a year Phoenix needs them.',
    category: 'Fashion & Apparel',
    discount: '25% Off',
    location: { lat: 33.6217, lng: -111.8901, address: '1730 Mesquite Bend Dr, Scottsdale, AZ 85254' },
    distance: 1.2,
    rating: 4.3,
    expiresAt: '2026-11-15',
    storeDetails: { phone: '(480) 555-0133', hours: ['Mon–Sat: 10am–9pm', 'Sun: 11am–7pm'], website: '#' },
  },
  {
    id: 'd5',
    storeName: 'Duneglow Skin Studio',
    dealTitle: '30% Off Sunscreen & SPF Line',
    description: 'Because it is sunny in Phoenix 300 days a year.',
    category: 'Beauty & Wellness',
    discount: '30% Off',
    location: { lat: 33.6058, lng: -111.9012, address: '54 Saguaro Crossing, Scottsdale, AZ 85254' },
    distance: 1.3,
    rating: 4.7,
    expiresAt: '2026-12-31',
    storeDetails: { phone: '(480) 555-0161', hours: ['Mon–Sun: 10am–8pm'], website: '#' },
  },
  {
    id: 'd6',
    storeName: 'Rincon Ridge Eyewear',
    dealTitle: '30% Off Prescription Sunglasses',
    description: 'Full frame wall, most lenses ready same-day.',
    category: 'Beauty & Wellness',
    discount: '30% Off',
    location: { lat: 33.6329, lng: -111.8760, address: '390 Copperleaf Ave, Scottsdale, AZ 85254' },
    distance: 1.4,
    rating: 4.2,
    expiresAt: '2026-11-20',
    storeDetails: { phone: '(480) 555-0184', hours: ['Mon–Fri: 9am–7pm', 'Sat: 10am–5pm', 'Sun: Closed'], website: '#' },
  },
  {
    id: 'd7',
    storeName: 'Mesquite & Vine Kitchen',
    dealTitle: 'Buy 2 Entrees, Get 1 Free',
    description: 'Weeknight special on wood-fired entrees, dine-in only.',
    category: 'Food & Dining',
    discount: 'Buy 2 Get 1',
    location: { lat: 33.6142, lng: -111.9198, address: '77 Ironbark Ln, Scottsdale, AZ 85254' },
    distance: 1.5,
    rating: 4.9,
    expiresAt: '2026-10-31',
    storeDetails: { phone: '(480) 555-0197', hours: ['Tue–Sun: 4pm–10pm', 'Closed Mondays'], website: '#' },
  },
  {
    id: 'd8',
    storeName: 'Spokeway Cycle Works',
    dealTitle: '$50 Off Any Bike Tune-Up + Accessory',
    description: 'Full tune-up bundled with a free bottle cage or light set.',
    category: 'Other',
    discount: '$50 Off',
    location: { lat: 33.3931, lng: -111.9346, address: '622 Palo Verde Loop, Tempe, AZ 85281' },
    distance: 2.1,
    rating: 4.5,
    expiresAt: '2026-12-01',
    storeDetails: { phone: '(480) 555-0105', hours: ['Mon–Sat: 9am–6pm', 'Sun: Closed'], website: '#' },
  },
  {
    id: 'd9',
    storeName: 'Palo Verde Books & Coffee',
    dealTitle: '15% Off Any Purchase Over $20',
    description: 'New releases, used paperbacks, and a coffee bar in the back.',
    category: 'Other',
    discount: '15% Off',
    location: { lat: 33.4076, lng: -111.9128, address: '19 Rio Bend St, Tempe, AZ 85281' },
    distance: 2.2,
    rating: 4.7,
    expiresAt: '2026-11-30',
    storeDetails: { phone: '(480) 555-0112', hours: ['Daily: 7am–9pm'], website: '#' },
  },
  {
    id: 'd10',
    storeName: 'Camelback Denim Supply',
    dealTitle: 'Up to 50% Off Select Styles',
    description: 'End-of-season markdowns on last quarter\'s fits.',
    category: 'Fashion & Apparel',
    discount: 'Up to 50%',
    location: { lat: 33.4488, lng: -111.9010, address: '250 Copperwing Ave, Tempe, AZ 85281' },
    distance: 2.0,
    rating: 4.1,
    expiresAt: '2026-11-10',
    storeDetails: { phone: '(480) 555-0126', hours: ['Mon–Sat: 10am–9pm', 'Sun: 11am–6pm'], website: '#' },
  },
  {
    id: 'd11',
    storeName: 'Sunflake Succulents',
    dealTitle: '$15 Off Any Succulent Bundle',
    description: 'Native and low-water plants, potted and ready to go.',
    category: 'Home & Garden',
    discount: '$15 Off',
    location: { lat: 33.4655, lng: -112.0210, address: '901 Desert Marigold Dr, Phoenix, AZ 85018' },
    distance: 2.3,
    rating: 4.6,
    expiresAt: '2026-12-20',
    storeDetails: { phone: '(480) 555-0139', hours: ['Daily: 8am–6pm'], website: '#' },
  },
  {
    id: 'd12',
    storeName: 'Saguaro Sound Co.',
    dealTitle: '20% Off Wireless Headphones',
    description: 'Demo units and open-box audio gear, tested and discounted.',
    category: 'Electronics',
    discount: '20% Off',
    location: { lat: 33.5322, lng: -112.0459, address: '48 Cholla Ridge Way, Phoenix, AZ 85016' },
    distance: 2.6,
    rating: 4.2,
    expiresAt: '2026-11-25',
    storeDetails: { phone: '(480) 555-0147', hours: ['Mon–Sat: 10am–8pm', 'Sun: 12pm–6pm'], website: '#' },
  },
];
