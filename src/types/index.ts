export interface Deal {
  id: string;
  storeName: string;
  dealTitle: string;
  description: string;
  category: string;
  discount: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  distance: number;
  rating: number;
  expiresAt: string;
}

export interface Location {
  lat: number;
  lng: number;
}