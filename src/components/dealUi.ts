import { LayoutGrid, Sofa, Shirt, UtensilsCrossed, Flower2, Headphones, Store, type LucideIcon } from 'lucide-react';

export const ALL = 'All';

type CategoryMeta = { label: string; icon: LucideIcon; cover: string };

// Covers use the three line colors as light tints, plus one neutral. No gradients.
const META: Record<string, CategoryMeta> = {
  [ALL]: { label: 'All', icon: LayoutGrid, cover: 'bg-enamel-deep' },
  'Home & Garden': { label: 'Home', icon: Sofa, cover: 'bg-[#FFF0C7]' },
  'Fashion & Apparel': { label: 'Fashion', icon: Shirt, cover: 'bg-[#FCE3DA]' },
  'Food & Dining': { label: 'Food', icon: UtensilsCrossed, cover: 'bg-[#FFF0C7]' },
  'Beauty & Wellness': { label: 'Beauty', icon: Flower2, cover: 'bg-[#FCE3DA]' },
  Electronics: { label: 'Tech', icon: Headphones, cover: 'bg-[#DCE7FB]' },
  Other: { label: 'More', icon: Store, cover: 'bg-[#DCE7FB]' },
};

export function categoryMeta(category: string): CategoryMeta {
  return META[category] ?? { label: category, icon: Store, cover: 'bg-enamel-deep' };
}

/** Split an offer into the number that matters and the words around it. */
export function splitDiscount(discount: string): { big: string; small: string } {
  const bxgy = discount.match(/buy\s*(\d+)\s*get\s*(\d+)/i);
  if (bxgy && !/%|\$/.test(discount)) return { big: `${bxgy[1]}+${bxgy[2]}`, small: `buy ${bxgy[1]}, get ${bxgy[2]} free` };
  const m = discount.match(/\$\d+|\d+%/);
  if (!m) return { big: discount, small: '' };
  const big = m[0];
  const small = discount.replace(big, '').replace(/\s+/g, ' ').trim().toLowerCase();
  return { big, small: small || 'off' };
}

export function formatEnds(dateString: string): string {
  const date = new Date(dateString);
  if (!dateString || isNaN(date.getTime())) return 'Limited time';
  const days = Math.ceil((date.getTime() - Date.now()) / 86_400_000);
  if (days <= 0) return 'Ends today';
  if (days === 1) return 'Ends tomorrow';
  return `Ends in ${days} days`;
}

export function shortAddress(address: string): string {
  // "412 Ocotillo Row, Scottsdale, AZ 85251" -> "Scottsdale"
  const parts = address.split(',').map((p) => p.trim());
  return parts[1] ?? address;
}
