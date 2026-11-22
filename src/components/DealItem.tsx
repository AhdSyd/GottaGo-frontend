import { Star } from 'lucide-react';
import { DemoDeal } from '../data/demoDeals';
import { categoryMeta, formatEnds, shortAddress, splitDiscount } from './dealUi';

type Variant = 'row' | 'wide' | 'compact' | 'mini';

interface DealItemProps {
  deal: DemoDeal;
  variant?: Variant;
  isSelected?: boolean;
  onClick: () => void;
}

/** The offer's number, set large on a flat tinted panel: this is the card's picture. */
export function DealCover({ deal, size }: { deal: DemoDeal; size: 'sm' | 'md' | 'lg' | 'xl' }) {
  const { big, small } = splitDiscount(deal.discount);
  const meta = categoryMeta(deal.category);
  const Icon = meta.icon;
  const bigCls = {
    sm: 'text-[22px]',
    md: 'text-[30px]',
    lg: 'text-[44px]',
    xl: 'text-[64px]',
  }[size];
  return (
    <div className={`relative h-full w-full ${meta.cover} flex flex-col justify-end ${size === 'xl' ? 'p-5' : 'p-3'} overflow-hidden`}>
      <Icon
        aria-hidden
        className={`absolute text-rail-ink/[0.07] ${size === 'sm' ? 'w-14 h-14 -right-2 -top-2' : 'w-28 h-28 -right-4 -top-4'}`}
        strokeWidth={1.5}
      />
      <p className={`relative font-signal font-black ${bigCls} leading-[0.85] tracking-[-0.04em] text-rail-ink tabular-nums`}>
        {big}
      </p>
      {small && size !== 'sm' && (
        <p className="relative font-plate text-[13px] font-semibold text-rail-ink/70 mt-1 truncate">{small}</p>
      )}
    </div>
  );
}

function Rating({ value }: { value: number }) {
  return (
    <span className="relative inline-flex items-center gap-1 bg-enamel-deep rounded-full px-2 py-0.5 text-[12px] font-semibold text-rail-ink tabular-nums shrink-0">
      {value.toFixed(1)}
      <Star className="w-3 h-3 fill-current" aria-hidden />
      <span className="sr-only">stars</span>
    </span>
  );
}

function Meta({ deal }: { deal: DemoDeal }) {
  return (
    <p className="text-[13px] text-rail-muted truncate">
      <span className="tabular-nums">{deal.distance.toFixed(1)} mi</span>
      <span aria-hidden> · </span>
      {shortAddress(deal.location.address)}
      <span aria-hidden> · </span>
      {formatEnds(deal.expiresAt)}
    </p>
  );
}

export default function DealItem({ deal, variant = 'wide', isSelected = false, onClick }: DealItemProps) {
  const base =
    'group block w-full text-left font-plate focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-rail-chandler';

  if (variant === 'row') {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={isSelected}
        className={`${base} flex gap-4 p-3 rounded-2xl transition-colors ${
          isSelected ? 'bg-enamel-deep' : 'hover:bg-enamel'
        }`}
      >
        <div className="w-[104px] h-[104px] rounded-xl overflow-hidden shrink-0">
          <DealCover deal={deal} size="md" />
        </div>
        <div className="min-w-0 flex-1 py-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-bold text-[16px] leading-tight text-rail-ink truncate">{deal.storeName}</h3>
            <Rating value={deal.rating} />
          </div>
          <p className="mt-1 text-[14px] text-rail-soft leading-snug line-clamp-2">{deal.dealTitle}</p>
          <div className="mt-2">
            <Meta deal={deal} />
          </div>
        </div>
      </button>
    );
  }

  if (variant === 'mini') {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={isSelected}
        className={`${base} flex gap-3 p-2 pr-3 bg-white rounded-2xl shadow-[0_6px_20px_rgba(14,15,18,0.16)] border-2 transition-colors ${
          isSelected ? 'border-rail-ink' : 'border-transparent'
        }`}
      >
        <div className="w-[64px] h-[64px] rounded-xl overflow-hidden shrink-0">
          <DealCover deal={deal} size="sm" />
        </div>
        <div className="min-w-0 flex-1 self-center">
          <h3 className="font-bold text-[15px] leading-tight text-rail-ink truncate">{deal.storeName}</h3>
          <p className="text-[13px] text-rail-soft truncate mt-0.5">{deal.dealTitle}</p>
          <p className="text-[12px] text-rail-muted tabular-nums mt-0.5">
            {deal.distance.toFixed(1)} mi · {deal.rating.toFixed(1)} ★
          </p>
        </div>
      </button>
    );
  }

  // wide (full-width list card) and compact (carousel card) share a cover-on-top layout.
  return (
    <button type="button" onClick={onClick} className={`${base} ${variant === 'compact' ? 'w-[264px] shrink-0' : ''}`}>
      <div
        className={`rounded-2xl overflow-hidden ${variant === 'compact' ? 'h-[132px]' : 'h-[150px]'} transition-transform duration-200 group-active:scale-[0.98]`}
      >
        <DealCover deal={deal} size={variant === 'compact' ? 'lg' : 'xl'} />
      </div>
      <div className="mt-2.5 flex items-start justify-between gap-3">
        <h3 className="font-bold text-[16px] leading-tight text-rail-ink truncate">{deal.storeName}</h3>
        <Rating value={deal.rating} />
      </div>
      <p className="mt-0.5 text-[14px] text-rail-soft truncate">{deal.dealTitle}</p>
      <div className="mt-0.5">
        <Meta deal={deal} />
      </div>
    </button>
  );
}
