import { demoDeals, DemoDeal } from '../data/demoDeals';

// This app used to fetch deals from a live backend (which scraped mall
// sites and ran them through an LLM) and geocode/rate each one via the
// Google Maps API on every page load. For this demo build, all of that
// is replaced with a fixed, local dataset — no network calls, no API
// billing, no matter how much traffic the demo gets.

class DealsService {
  async getAllDeals(): Promise<DemoDeal[]> {
    return demoDeals;
  }

  async searchDeals(query: string): Promise<DemoDeal[]> {
    const q = query.toLowerCase();
    return demoDeals.filter(
      (deal) =>
        deal.storeName.toLowerCase().includes(q) ||
        deal.dealTitle.toLowerCase().includes(q) ||
        deal.description.toLowerCase().includes(q) ||
        deal.category.toLowerCase().includes(q)
    );
  }

  async getDealsByStore(storeName: string): Promise<DemoDeal[]> {
    const q = storeName.toLowerCase();
    return demoDeals.filter((deal) => deal.storeName.toLowerCase().includes(q));
  }
}

export const dealsService = new DealsService();
