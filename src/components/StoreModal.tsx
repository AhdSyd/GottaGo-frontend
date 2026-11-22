import { useEffect, useRef, useState } from 'react';
import { Clock, Phone, MapPin, Navigation, ExternalLink, X, Star, Globe } from 'lucide-react';
import { DemoDeal } from '../data/demoDeals';
import { DealCover } from './DealItem';
import { categoryMeta, formatEnds } from './dealUi';

interface StoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDeal: DemoDeal | null;
}

/**
 * Store detail. A bottom sheet on phones, a centered dialog on desktop.
 * The offer leads; contact and hours are plain rows underneath.
 */
export default function StoreModal({ isOpen, onClose, selectedDeal }: StoreModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [notLive, setNotLive] = useState(false);

  // Reset the little note whenever a different store opens.
  useEffect(() => setNotLive(false), [selectedDeal?.id]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !selectedDeal) return null;
  const deal = selectedDeal;
  const { storeDetails } = deal;

  return (
    <div className="fixed inset-0 z-[2000] flex items-end lg:items-center justify-center font-plate">
      <button
        type="button"
        aria-label="Close store details"
        onClick={onClose}
        className="absolute inset-0 bg-rail-ink/45 sheet-backdrop cursor-default"
        tabIndex={-1}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="store-title"
        className="sheet-panel relative w-full lg:max-w-[520px] max-h-[92dvh] lg:max-h-[88vh] bg-white rounded-t-[22px] lg:rounded-[22px] overflow-hidden flex flex-col"
      >
        <div className="lg:hidden absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-rail-ink/25 z-10" aria-hidden />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white grid place-items-center text-rail-ink hover:bg-enamel-deep transition-colors"
        >
          <X className="w-5 h-5" strokeWidth={2.5} />
        </button>

        <div className="overflow-y-auto overscroll-contain">
          <div className="h-[168px] lg:h-[188px]">
            <DealCover deal={deal} size="xl" />
          </div>

          <div className="px-5 lg:px-6 pt-5">
            <h2 id="store-title" className="font-signal font-extrabold text-[26px] leading-[1.05] tracking-[-0.02em] text-rail-ink">
              {deal.storeName}
            </h2>
            <p className="mt-2 text-[14px] text-rail-muted flex flex-wrap items-center gap-x-1.5">
              <span className="inline-flex items-center gap-1 text-rail-ink font-semibold tabular-nums">
                <Star className="w-3.5 h-3.5 fill-current" aria-hidden />
                {deal.rating.toFixed(1)}
              </span>
              <span aria-hidden>·</span>
              <span className="tabular-nums">{deal.distance.toFixed(1)} mi</span>
              <span aria-hidden>·</span>
              <span>{categoryMeta(deal.category).label}</span>
            </p>

            {/* The offer */}
            <div className="mt-5 border-y border-rail-rule py-4">
              <p className="text-[12px] font-bold tracking-[0.06em] uppercase text-rail-muted">The offer</p>
              <p className="mt-1.5 text-[18px] font-bold leading-snug text-rail-ink">{deal.dealTitle}</p>
              <p className="mt-1 text-[15px] leading-relaxed text-rail-soft">{deal.description}</p>
              <p className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-rail-ink">
                <Clock className="w-4 h-4" aria-hidden />
                {formatEnds(deal.expiresAt)}
              </p>
            </div>

            {/* Store info rows */}
            <ul className="divide-y divide-rail-rule">
              <li className="flex gap-3.5 py-3.5">
                <MapPin className="w-5 h-5 text-rail-ink shrink-0 mt-0.5" aria-hidden />
                <span className="text-[15px] text-rail-ink">{deal.location.address}</span>
              </li>
              <li className="flex gap-3.5 py-3.5">
                <Phone className="w-5 h-5 text-rail-ink shrink-0 mt-0.5" aria-hidden />
                <a href={`tel:${storeDetails.phone}`} className="text-[15px] text-rail-ink underline decoration-rail-rule underline-offset-4 hover:decoration-rail-ink tabular-nums">
                  {storeDetails.phone}
                </a>
              </li>
              <li className="flex gap-3.5 py-3.5">
                <Clock className="w-5 h-5 text-rail-ink shrink-0 mt-0.5" aria-hidden />
                <span className="text-[15px] text-rail-ink">
                  {storeDetails.hours.map((h) => (
                    <span key={h} className="block">
                      {h}
                    </span>
                  ))}
                </span>
              </li>
              {storeDetails.website && (
                <li className="flex gap-3.5 py-3.5">
                  <Globe className="w-5 h-5 text-rail-muted shrink-0 mt-0.5" aria-hidden />
                  <span className="text-[15px] text-rail-muted">Sample store, no website</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Pinned actions, the way a store page in an app keeps them in reach. */}
        <div className="border-t border-rail-rule px-5 lg:px-6 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-white">
          <p
            role="status"
            aria-live="polite"
            className={`text-center text-[14px] font-medium text-rail-soft overflow-hidden transition-all duration-300 ${
              notLive ? 'max-h-12 opacity-100 mb-2.5' : 'max-h-0 opacity-0'
            }`}
          >
            {notLive && 'This is sample data, so there\u2019s nowhere to go\u2026 yet :)'}
          </p>
          <div className="flex gap-2.5">
          <button
            type="button"
            onClick={() => setNotLive(true)}
            className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-rail-ink text-white font-bold text-[16px] hover:bg-black transition-colors"
          >
            <Navigation className="w-[18px] h-[18px]" aria-hidden />
            Get directions
          </button>
          <button
            type="button"
            onClick={() => setNotLive(true)}
            aria-label="Open in Maps"
            className="w-12 h-12 shrink-0 inline-flex items-center justify-center rounded-xl bg-enamel-deep text-rail-ink hover:bg-rail-rule transition-colors"
          >
            <ExternalLink className="w-[18px] h-[18px]" aria-hidden />
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}
