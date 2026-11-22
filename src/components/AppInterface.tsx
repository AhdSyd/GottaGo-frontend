import { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Home, Map as MapIcon, BookOpen, ChevronLeft } from 'lucide-react';
import DealItem from './DealItem';
import DealsMap from './DealsMap';
import StoreModal from './StoreModal';
import { dealsService } from '../services/dealsService';
import { DemoDeal, demoDeals } from '../data/demoDeals';
import { ALL, categoryMeta } from './dealUi';

type Sort = 'distance' | 'rating' | 'ending';
const SORTS: { id: Sort; label: string }[] = [
  { id: 'distance', label: 'Nearest' },
  { id: 'rating', label: 'Top rated' },
  { id: 'ending', label: 'Ending soon' },
];

const isMobileScreen = () => window.innerWidth < 1024;

/* ------------------------------------------------------------------ */
/* Shared controls                                                      */
/* ------------------------------------------------------------------ */

function SearchField({
  value,
  onChange,
  placeholder,
  className = '',
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  className?: string;
}) {
  return (
    <label className={`relative flex items-center ${className}`}>
      <span className="sr-only">Search deals</span>
      <Search className="absolute left-4 w-[18px] h-[18px] text-rail-ink pointer-events-none" strokeWidth={2.5} aria-hidden />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 pl-11 pr-11 rounded-full bg-enamel-deep text-[16px] font-medium text-rail-ink placeholder:text-rail-muted outline-none focus:bg-white focus:ring-2 focus:ring-rail-ink transition-colors [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-2 w-8 h-8 rounded-full grid place-items-center hover:bg-rail-rule"
        >
          <X className="w-4 h-4" strokeWidth={2.5} />
        </button>
      )}
    </label>
  );
}

function SortChips({ sort, onSort }: { sort: Sort; onSort: (s: Sort) => void }) {
  return (
    <div className="flex gap-2" role="radiogroup" aria-label="Sort deals">
      {SORTS.map((s) => (
        <button
          key={s.id}
          type="button"
          role="radio"
          aria-checked={sort === s.id}
          onClick={() => onSort(s.id)}
          className={`h-9 px-4 rounded-full text-[14px] font-semibold whitespace-nowrap transition-colors ${
            sort === s.id ? 'bg-rail-ink text-white' : 'bg-enamel-deep text-rail-ink hover:bg-rail-rule'
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}

function CategoryRail({
  categories,
  selected,
  onSelect,
}: {
  categories: string[];
  selected: string;
  onSelect: (c: string) => void;
}) {
  return (
    <div className="relative flex gap-1 overflow-x-auto no-scrollbar -mx-4 px-4" role="radiogroup" aria-label="Categories">
      {categories.map((c) => {
        const meta = categoryMeta(c);
        const Icon = meta.icon;
        const on = selected === c;
        return (
          <button
            key={c}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onSelect(c)}
            className="flex flex-col items-center gap-1.5 w-[68px] shrink-0 py-1"
          >
            <span
              className={`w-14 h-14 rounded-full grid place-items-center transition-colors ${
                on ? 'bg-rail-ink text-white' : 'bg-enamel-deep text-rail-ink'
              }`}
            >
              <Icon className="w-6 h-6" strokeWidth={2} aria-hidden />
            </span>
            <span className={`text-[12px] ${on ? 'font-bold text-rail-ink' : 'font-medium text-rail-soft'}`}>{meta.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="py-16 text-center font-plate">
      <p className="font-bold text-[18px] text-rail-ink">No deals match that.</p>
      <p className="mt-1 text-[15px] text-rail-muted">Try another word or category.</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 h-10 px-5 rounded-full bg-rail-ink text-white text-[14px] font-semibold"
      >
        Show all deals
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function AppInterface() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(ALL);
  const [sortBy, setSortBy] = useState<Sort>('distance');
  const [selectedDeal, setSelectedDeal] = useState<DemoDeal | null>(null);
  const [deals, setDeals] = useState<DemoDeal[]>(demoDeals);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'deals' | 'map'>('deals');
  const [isMobile, setIsMobile] = useState(isMobileScreen());
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onResize = () => setIsMobile(isMobileScreen());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    dealsService.getAllDeals().then(setDeals);
  }, []);

  const categories = useMemo(() => [ALL, ...new Set(deals.map((d) => d.category))], [deals]);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = deals.filter((d) => {
      const matchesSearch =
        q === '' ||
        d.storeName.toLowerCase().includes(q) ||
        d.dealTitle.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q);
      const matchesCategory = selectedCategory === ALL || d.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    list.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'ending') return new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime();
      return a.distance - b.distance;
    });
    return list;
  }, [deals, searchQuery, selectedCategory, sortBy]);

  const closest = useMemo(() => [...deals].sort((a, b) => a.distance - b.distance).slice(0, 5), [deals]);
  const browsing = searchQuery.trim() === '' && selectedCategory === ALL;

  const openDeal = (deal: DemoDeal) => {
    setSelectedDeal(deal);
    setShowStoreModal(true);
  };
  const reset = () => {
    setSearchQuery('');
    setSelectedCategory(ALL);
  };

  // On the mobile map, a pin tap highlights its card instead of covering the map.
  const focusDeal = (deal: DemoDeal) => {
    setSelectedDeal(deal);
    const el = carouselRef.current?.querySelector<HTMLElement>(`[data-deal="${deal.id}"]`);
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  const modal = showStoreModal && (
    <StoreModal isOpen={showStoreModal} onClose={() => setShowStoreModal(false)} selectedDeal={selectedDeal} />
  );

  /* ---------------------------- Mobile ---------------------------- */
  if (isMobile) {
    return (
      <div className="h-[100dvh] flex flex-col bg-white text-rail-ink font-plate">
        {activeTab === 'deals' ? (
          <main className="flex-1 overflow-y-auto overscroll-contain">
            <header className="px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 bg-white">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[12px] font-semibold text-rail-muted">Deals near</p>
                  <p className="font-signal font-extrabold text-[20px] leading-tight tracking-[-0.01em]">Phoenix metro</p>
                </div>
                <span className="text-[11px] font-bold tracking-[0.04em] uppercase bg-enamel-deep text-rail-soft rounded-full px-2.5 py-1">
                  Sample data
                </span>
              </div>
              <SearchField value={searchQuery} onChange={setSearchQuery} placeholder="Stores, deals, categories" className="mt-3" />
            </header>

            <div className="px-4">
              <CategoryRail categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
            </div>

            {browsing && (
              <section className="mt-6" aria-labelledby="closest-title">
                <h2 id="closest-title" className="px-4 font-signal font-extrabold text-[20px] tracking-[-0.01em]">
                  Closest to you
                </h2>
                <div className="relative mt-3 flex gap-3 overflow-x-auto no-scrollbar px-4 snap-x snap-mandatory scroll-px-4">
                  {closest.map((d) => (
                    <div key={d.id} className="snap-start">
                      <DealItem deal={d} variant="compact" onClick={() => openDeal(d)} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-7 pb-6" aria-labelledby="all-title">
              <div className="px-4 flex items-baseline justify-between">
                <h2 id="all-title" className="font-signal font-extrabold text-[20px] tracking-[-0.01em]">
                  {browsing ? 'All deals' : 'Results'}
                </h2>
                <span className="text-[13px] font-medium text-rail-muted tabular-nums">{filtered.length} deals</span>
              </div>
              <div className="mt-3 px-4 overflow-x-auto no-scrollbar">
                <SortChips sort={sortBy} onSort={setSortBy} />
              </div>
              {filtered.length === 0 ? (
                <EmptyState onReset={reset} />
              ) : (
                <ul className="mt-4 px-4 space-y-6">
                  {filtered.map((d) => (
                    <li key={d.id}>
                      <DealItem deal={d} variant="wide" onClick={() => openDeal(d)} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </main>
        ) : (
          <main className="relative flex-1 min-h-0">
            <DealsMap deals={filtered} selectedDeal={selectedDeal} onDealSelect={focusDeal} compact bottomInset={110} />
            <div className="absolute top-0 inset-x-0 z-[1000] px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pointer-events-none">
              <div className="pointer-events-auto shadow-[0_6px_20px_rgba(14,15,18,0.14)] rounded-full">
                <SearchField value={searchQuery} onChange={setSearchQuery} placeholder="Search this map" className="[&_input]:bg-white" />
              </div>
            </div>
            <div
              ref={carouselRef}
              className="absolute bottom-3 inset-x-0 z-[1000] flex gap-2.5 overflow-x-auto no-scrollbar px-4 snap-x snap-mandatory scroll-px-4 pb-1"
            >
              {filtered.map((d) => (
                <div key={d.id} data-deal={d.id} className="snap-center shrink-0 w-[86%] max-w-[340px]">
                  <DealItem deal={d} variant="mini" isSelected={selectedDeal?.id === d.id} onClick={() => openDeal(d)} />
                </div>
              ))}
            </div>
          </main>
        )}

        {/* Bottom tab bar */}
        <nav aria-label="App" className="shrink-0 border-t border-rail-rule bg-white pb-[env(safe-area-inset-bottom)]">
          <div className="grid grid-cols-3 h-[60px]">
            {[
              { id: 'deals' as const, label: 'Deals', icon: Home },
              { id: 'map' as const, label: 'Map', icon: MapIcon },
            ].map((t) => {
              const on = activeTab === t.id;
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id)}
                  aria-current={on ? 'page' : undefined}
                  className={`flex flex-col items-center justify-center gap-0.5 text-[11px] ${on ? 'font-bold text-rail-ink' : 'font-medium text-rail-muted'}`}
                >
                  <Icon className="w-6 h-6" strokeWidth={on ? 2.5 : 2} aria-hidden />
                  {t.label}
                </button>
              );
            })}
            <Link to="/" className="flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium text-rail-muted">
              <BookOpen className="w-6 h-6" strokeWidth={2} aria-hidden />
              Case study
            </Link>
          </div>
        </nav>
        {modal}
      </div>
    );
  }

  /* ---------------------------- Desktop ---------------------------- */
  return (
    <div className="h-screen flex flex-col bg-white text-rail-ink font-plate">
      <header className="shrink-0 h-[72px] px-6 flex items-center gap-6 border-b border-rail-rule">
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Back to the GottaGo! case study">
          <ChevronLeft className="w-5 h-5 text-rail-muted" aria-hidden />
          <span className="font-signal font-black text-[22px] tracking-[-0.03em]">GottaGo!</span>
        </Link>
        <SearchField value={searchQuery} onChange={setSearchQuery} placeholder="Search stores, deals, categories" className="flex-1 max-w-[560px]" />
        <p className="ml-auto text-[13px] text-rail-muted">Sample data · Phoenix metro</p>
      </header>

      <div className="flex-1 min-h-0 flex">
        <aside className="w-[460px] xl:w-[500px] shrink-0 flex flex-col border-r border-rail-rule">
          <div className="px-5 pt-4 pb-3 border-b border-rail-rule">
            <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Categories">
              {categories.map((c) => {
                const on = selectedCategory === c;
                const meta = categoryMeta(c);
                const Icon = meta.icon;
                return (
                  <button
                    key={c}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setSelectedCategory(c)}
                    className={`h-9 pl-3 pr-3.5 rounded-full inline-flex items-center gap-1.5 text-[14px] font-semibold transition-colors ${
                      on ? 'bg-rail-ink text-white' : 'bg-enamel-deep text-rail-ink hover:bg-rail-rule'
                    }`}
                  >
                    <Icon className="w-4 h-4" aria-hidden />
                    {meta.label}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 flex items-center justify-between gap-3">
              <SortChips sort={sortBy} onSort={setSortBy} />
              <span className="text-[13px] text-rail-muted tabular-nums whitespace-nowrap">{filtered.length} deals</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-2 py-2">
            {filtered.length === 0 ? (
              <EmptyState onReset={reset} />
            ) : (
              <ul>
                {filtered.map((d) => (
                  <li key={d.id}>
                    <DealItem deal={d} variant="row" isSelected={selectedDeal?.id === d.id} onClick={() => openDeal(d)} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
        <main className="flex-1 min-w-0 relative">
          <DealsMap deals={filtered} selectedDeal={selectedDeal} onDealSelect={openDeal} />
        </main>
      </div>
      {modal}
    </div>
  );
}
