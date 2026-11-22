import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Footer from './Footer';

const REPOS = {
  backend: 'https://github.com/AhdSyd/GottaGoBackend',
  frontend: 'https://github.com/AhdSyd/GottaGo-frontend',
};

/* ------------------------------------------------------------------ */
/* Content                                                              */
/* ------------------------------------------------------------------ */

type Screen = {
  id: string;
  src: string;
  device: 'web' | 'phone';
  name: string;
  does: string;
  alt: string;
};

const SCREENS: Screen[] = [
  {
    id: 'web-app',
    src: '/screens/web-app.webp',
    device: 'web',
    name: 'Map and list',
    does: 'Every deal on one map. Pick a store in the list and its pin lights up on the map.',
    alt: 'GottaGo! on desktop: category and sort chips over a list of deals on the left, and a map of the Phoenix metro with discount pins on the right.',
  },
  {
    id: 'web-detail',
    src: '/screens/web-detail.webp',
    device: 'web',
    name: 'Store detail',
    does: 'The offer, the address, hours, and directions one click away.',
    alt: 'GottaGo! store detail on desktop: 40% off ceramic dinnerware at Cactus & Clay Home Goods, with the offer, address, and hours.',
  },
  {
    id: 'm-list',
    src: '/screens/m-list.webp',
    device: 'phone',
    name: 'Deals on a phone',
    does: 'Categories, the closest deals, and every offer as a card, laid out for one thumb.',
    alt: 'GottaGo! mobile app home: search, round category buttons, a Closest to you carousel, and deal cards.',
  },
  {
    id: 'm-map',
    src: '/screens/m-map.webp',
    device: 'phone',
    name: 'Map tab',
    does: 'The full-screen map, with store cards along the bottom. Tap a pin and its card comes forward.',
    alt: 'GottaGo! mobile map tab: discount pins across the Phoenix metro and a store card at the bottom.',
  },
  {
    id: 'm-detail',
    src: '/screens/m-detail.webp',
    device: 'phone',
    name: 'Detail sheet',
    does: 'Store details slide up as a sheet, with directions pinned to the bottom.',
    alt: 'GottaGo! store sheet on a phone: 40% off at Cactus & Clay Home Goods, with the offer, address, hours, and Get directions.',
  },
];

const STOPS = [
  {
    name: 'Render',
    body: 'Mall sales pages build their listings in JavaScript, so a plain fetch comes back empty. Headless Chrome loads each page, waits for the listings, and scrolls to pull in the lazy-loaded rest.',
  },
  {
    name: 'Extract',
    body: 'GPT-4o-mini reads each page under a strict JSON schema and pulls out every offer: the store, the discount, the dates, and the details.',
  },
  {
    name: 'Validate',
    body: 'Every row passes a typed TypeScript layer before it is stored. Rows missing fields are dropped, dates are normalized, and each offer is stamped with its source URL.',
  },
  {
    name: 'Serve',
    body: 'A second pass rewrites each description in original wording. A unique index on store, offer, and source URL collapses duplicates in Postgres, and Express serves the rest over REST.',
  },
];

const STACK: [string, string][] = [
  ['Frontend', 'React, TypeScript, Tailwind, Vite'],
  ['Backend', 'Node, Express, TypeScript'],
  ['Data', 'Supabase Postgres, unique-index dedup'],
  ['Extraction', 'Puppeteer, two-stage GPT-4o-mini, typed validation'],
  ['Scheduling', 'node-cron, weekly per mall'],
];

const CITIES = [
  { name: 'Scottsdale', color: 'bg-rail-scottsdale', stroke: '#E8431B' },
  { name: 'Tempe', color: 'bg-rail-tempe', stroke: '#F5B300' },
  { name: 'Chandler', color: 'bg-rail-chandler', stroke: '#1F63E0' },
];

/* ------------------------------------------------------------------ */
/* Hooks                                                                */
/* ------------------------------------------------------------------ */

function useMedia(query: string) {
  const [match, setMatch] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
}

/* ------------------------------------------------------------------ */
/* Pieces of the line                                                   */
/* ------------------------------------------------------------------ */

function StationDot({ lit = true, size = 'md' }: { lit?: boolean; size?: 'md' | 'lg' }) {
  const dim = size === 'lg' ? 'w-9 h-9 border-[7px]' : 'w-7 h-7 border-[6px]';
  return (
    <span
      aria-hidden
      className={`block ${dim} rounded-full border-rail-ink transition-colors duration-500 ${
        lit ? 'bg-enamel' : 'bg-rail-rule'
      }`}
    />
  );
}

function Mark() {
  return (
    <span aria-hidden className="relative inline-flex items-center">
      <span className="block w-[22px] h-[22px] rounded-full border-[6px] border-rail-ink bg-enamel" />
    </span>
  );
}

function WebFrame({ screen, className = '' }: { screen: Screen; className?: string }) {
  return (
    <figure
      className={`bg-white border-[3px] border-rail-ink rounded-[14px] overflow-hidden ${className}`}
    >
      <div className="h-7 border-b-[3px] border-rail-ink flex items-center gap-1.5 px-3" aria-hidden>
        <span className="w-2 h-2 rounded-full bg-rail-ink" />
        <span className="w-2 h-2 rounded-full bg-rail-ink" />
        <span className="w-2 h-2 rounded-full bg-rail-ink" />
      </div>
      <img
        src={screen.src}
        alt={screen.alt}
        width={1920}
        height={1200}
        className="block w-full h-auto aspect-[16/10] object-cover object-top"
        loading="lazy"
        decoding="async"
      />
    </figure>
  );
}

function PhoneFrame({ screen, className = '' }: { screen: Screen; className?: string }) {
  return (
    <figure
      className={`bg-white border-[3px] border-rail-ink rounded-[34px] overflow-hidden p-[5px] ${className}`}
    >
      <img
        src={screen.src}
        alt={screen.alt}
        width={780}
        height={1688}
        className="block w-full h-auto aspect-[390/844] object-cover object-top rounded-[27px]"
        loading="lazy"
        decoding="async"
      />
    </figure>
  );
}

function Plate({ n, name, does }: { n: number; name: string; does?: string }) {
  return (
    <div className="font-plate">
      <p className="text-[13px] font-bold tracking-[0.06em] uppercase text-rail-ink">
        <span className="tabular-nums">{String(n).padStart(2, '0')}</span>
        <span className="mx-2 text-rail-muted" aria-hidden>
          /
        </span>
        {name}
      </p>
      {does && <p className="mt-1.5 text-[15px] leading-snug text-rail-soft max-w-[34ch]">{does}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
/* ------------------------------------------------------------------ */

function Interchange({ className = '' }: { className?: string }) {
  // The main line splits three ways at the interchange: one line per city.
  return (
    <svg viewBox="0 0 260 220" className={className} aria-hidden fill="none">
      <path d="M0 110 H70 L130 50 H260" stroke="#E8431B" strokeWidth="20" className="line-draw" />
      <path d="M0 110 H260" stroke="#F5B300" strokeWidth="20" className="line-draw" />
      <path d="M0 110 H70 L130 170 H260" stroke="#1F63E0" strokeWidth="20" className="line-draw" />
      <circle cx="70" cy="110" r="20" fill="#F6F6F2" stroke="#0E0F12" strokeWidth="8" />
    </svg>
  );
}

const HERO_STATS: [string, string][] = [
  ['3', 'cities served'],
  ['4', 'pipeline stops'],
  ['2', 'AI passes per deal'],
];

function HeroStats({ className = '' }: { className?: string }) {
  return (
    <dl className={`grid grid-cols-3 gap-x-6 sm:gap-x-10 ${className}`}>
      {HERO_STATS.map(([n, label]) => (
        <div key={label}>
          <dt className="sr-only">{label}</dt>
          <dd className="font-signal font-black text-[clamp(2.25rem,4vw,3.5rem)] leading-none tracking-[-0.03em] tabular-nums">
            {n}
          </dd>
          <dd className="font-plate text-[12px] sm:text-[13px] font-semibold tracking-[0.08em] uppercase text-rail-muted mt-1.5">
            {label}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Hero() {
  const web = SCREENS[0];
  const phone = SCREENS[2];
  return (
    <section
      className="relative overflow-hidden lg:h-[clamp(720px,calc(100svh-96px),900px)]"
      aria-labelledby="hero-title"
    >
      {/* Desktop: the line crosses the lower hero; screens stand on it, the numbers hang below it. */}
      <div className="hidden lg:block absolute inset-0" aria-hidden={false}>
        <div
          aria-hidden
          className="line-draw-x absolute left-0 right-[260px] bottom-[176px] h-[20px] translate-y-1/2 bg-rail-scottsdale origin-left"
        />
        <Interchange className="absolute right-0 bottom-[176px] translate-y-1/2 w-[260px] h-auto" />
        <div className="absolute right-6 bottom-[56px] font-plate text-right">
          <p className="text-[12px] font-bold tracking-[0.06em] uppercase">Interchange</p>
          <p className="text-[13px] text-rail-soft">Scottsdale · Tempe · Chandler</p>
        </div>
        <div className="train-run absolute bottom-[176px] translate-y-1/2 left-0" aria-hidden>
          <StationDot />
        </div>
        <div className="relative max-w-[1440px] h-full mx-auto">
          <div className="absolute left-[46%] bottom-[176px] w-[min(38vw,560px)] -mb-[6px]">
            <WebFrame screen={web} />
          </div>
          <div className="absolute left-[46%] bottom-[176px] translate-y-[calc(100%+30px)]">
            <Plate n={1} name="Web" />
          </div>
          <div className="absolute right-[14%] bottom-[176px] w-[min(14vw,200px)] -mb-[8px]">
            <PhoneFrame screen={phone} />
          </div>
          <div className="absolute right-[14%] bottom-[176px] translate-y-[calc(100%+30px)] w-[min(14vw,200px)]">
            <Plate n={2} name="Mobile" />
          </div>
          <HeroStats className="absolute left-14 bottom-[36px]" />
        </div>
      </div>

      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 pt-8 sm:pt-12 lg:pt-[max(2rem,5vh)]">
        <div className="lg:max-w-[44%]">
          <div>
            <h1
              id="hero-title"
              className="font-signal font-black text-[clamp(3rem,7.4vw,6rem)] leading-[0.9] tracking-[-0.04em] text-balance"
            >
              Local deals.
              <br />
              Three cities.
              <br />
              One map.
            </h1>
            <p className="font-plate mt-7 text-lg sm:text-xl leading-[1.45] text-rail-soft max-w-[46ch]">
              GottaGo! helped college students in the Phoenix metro find local deals, pulled from
              mall sites every week, validated, and deduplicated before they reached the map. A team
              of three built it as an honors thesis.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 font-plate">
              <a
                href="#screens"
                className="group inline-flex items-center gap-2.5 bg-rail-scottsdale text-rail-ink font-bold text-[17px] pl-6 pr-5 py-3.5 rounded-full hover:bg-rail-ink hover:text-enamel transition-colors duration-200"
              >
                See the screens
                <ArrowRight className="w-[18px] h-[18px] transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.5} />
              </a>
              <Link
                to="/app"
                className="text-[16px] font-semibold text-rail-ink underline decoration-2 underline-offset-[6px] decoration-rail-rule hover:decoration-rail-ink transition-colors"
              >
                Or open the live demo
              </Link>
            </div>
          </div>

        </div>
        <HeroStats className="lg:hidden mt-10 border-t-[3px] border-rail-ink pt-5" />
      </div>

      {/* Below desktop: the line runs under the text, with the first two screens as its stations. */}
      <div className="lg:hidden relative mt-10 h-[300px] sm:h-[400px]">
        <div
          aria-hidden
          className="line-draw-x absolute left-0 right-[180px] sm:right-[230px] top-[62%] h-[16px] sm:h-[20px] -translate-y-1/2 bg-rail-scottsdale origin-left"
        />
        <Interchange className="absolute right-0 top-[62%] -translate-y-1/2 w-[180px] sm:w-[260px] h-auto" />
        <div className="absolute right-3 sm:right-6 top-[62%] translate-y-[78px] sm:translate-y-[104px] font-plate text-right">
          <p className="text-[12px] font-bold tracking-[0.06em] uppercase">Interchange</p>
          <p className="text-[13px] text-rail-soft">Scottsdale · Tempe · Chandler</p>
        </div>

        <div className="max-w-[1440px] mx-auto h-full px-5 sm:px-10 lg:px-14 relative">
          {/* Station 01: web */}
          <div className="absolute left-5 sm:left-[8%] lg:left-[16%] top-[62%] -translate-y-[calc(100%-10px)] w-[min(68vw,600px)]">
            <WebFrame screen={web} />
          </div>
          <div className="absolute left-5 sm:left-[8%] lg:left-[16%] top-[62%] translate-y-[22px] sm:translate-y-[26px] hidden sm:flex items-start gap-3">
            <Plate n={1} name="Web" />
          </div>

          {/* Station 02: phone */}
          <div className="absolute right-[150px] sm:right-[26%] lg:right-[24%] top-[62%] -translate-y-[calc(100%-16px)] w-[min(30vw,200px)]">
            <PhoneFrame screen={phone} />
          </div>
          <div className="absolute right-[150px] sm:right-[26%] lg:right-[24%] top-[62%] translate-y-[22px] sm:translate-y-[26px] hidden sm:block w-[min(30vw,200px)]">
            <Plate n={2} name="Mobile" />
          </div>
        </div>
        <div className="train-run absolute top-[62%] -translate-y-1/2 left-0" aria-hidden>
          <StationDot />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* The ride: screens as stations                                        */
/* ------------------------------------------------------------------ */

function ScreensRide() {
  const desktop = useMedia('(min-width: 1024px)');
  const reduced = useMedia('(prefers-reduced-motion: reduce)');
  const ride = desktop && !reduced;

  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [outerH, setOuterH] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  // Scroll-driven ride on desktop: vertical scroll moves the train along the line.
  useEffect(() => {
    if (!ride) {
      setOuterH(null);
      return;
    }
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

    let travel = 0;
    const measure = () => {
      travel = Math.max(0, track.scrollWidth - window.innerWidth);
      setOuterH(window.innerHeight + travel);
    };
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = outer.getBoundingClientRect();
        const span = Math.max(1, rect.height - window.innerHeight);
        const p = Math.min(1, Math.max(0, -rect.top / span));
        setProgress(p);
        track.style.transform = `translate3d(${-p * travel}px,0,0)`;
        const mid = window.innerWidth * 0.5;
        let best = 0;
        let bestD = Infinity;
        itemRefs.current.forEach((el, i) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          const d = Math.abs(r.left + r.width / 2 - mid);
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        });
        setActive(best);
      });
    };
    measure();
    onScroll();
    const ro = new ResizeObserver(() => {
      measure();
      onScroll();
    });
    ro.observe(track);
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', onScroll);
      track.style.transform = '';
    };
  }, [ride]);

  // Native strip elsewhere: track which station sits nearest the middle.
  useEffect(() => {
    if (ride) return;
    const strip = stripRef.current;
    if (!strip) return;
    const onScroll = () => {
      const max = Math.max(1, strip.scrollWidth - strip.clientWidth);
      setProgress(strip.scrollLeft / max);
      const mid = strip.getBoundingClientRect().left + strip.clientWidth / 2;
      let best = 0;
      let bestD = Infinity;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      setActive(best);
    };
    onScroll();
    strip.addEventListener('scroll', onScroll, { passive: true });
    return () => strip.removeEventListener('scroll', onScroll);
  }, [ride]);

  const go = (dir: -1 | 1) => {
    const next = Math.min(SCREENS.length - 1, Math.max(0, active + dir));
    const el = itemRefs.current[next];
    if (!el) return;
    if (ride && outerRef.current) {
      const outer = outerRef.current;
      const span = outer.offsetHeight - window.innerHeight;
      const top = outer.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + (span * next) / (SCREENS.length - 1), behavior: reduced ? 'auto' : 'smooth' });
    } else {
      el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  const stations = (
    <ol className="relative flex items-end gap-16 xl:gap-24 w-max pr-[20vw]">
      {SCREENS.map((s, i) => (
        <li
          key={s.id}
          ref={(el) => (itemRefs.current[i] = el)}
          className={`relative shrink-0 snap-center flex flex-col ${s.device === 'web' ? 'w-[min(82vw,720px,calc((100svh-380px)*1.5))]' : 'w-[min(56vw,250px,calc((100svh-380px)*0.44))]'}`}
        >
          <div className="pb-6">
            {s.device === 'web' ? <WebFrame screen={s} /> : <PhoneFrame screen={s} />}
          </div>
          <div className="relative h-[20px]">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[2px]">
              <StationDot lit={i <= active} size="lg" />
            </span>
          </div>
          <div className="pt-6 min-h-[112px]">
            <Plate n={i + 1} name={s.name} does={s.does} />
          </div>
        </li>
      ))}
    </ol>
  );

  return (
    <section id="screens" aria-labelledby="screens-title" className="scroll-mt-4">
      <div ref={outerRef} style={outerH ? { height: outerH } : undefined} className="relative">
        <div className={ride ? 'sticky top-0 h-screen overflow-hidden flex flex-col' : ''}>
          <div className="max-w-[1440px] w-full mx-auto px-5 sm:px-10 lg:px-14 pt-16 lg:pt-[max(3rem,7vh)] flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 id="screens-title" className="font-signal font-black text-[clamp(2.25rem,4.8vw,4rem)] leading-[0.95] tracking-[-0.035em]">
                Ride the product.
              </h2>
              <p className="font-plate mt-3 text-rail-soft text-[17px] max-w-[52ch]">
                Five stops, web and mobile, rendered from the demo build. The stores and offers are
                sample data; the interface is the real one.
              </p>
            </div>
            <div className="flex items-center gap-3 font-plate">
              <span className="text-[14px] font-semibold tabular-nums text-rail-muted mr-1" aria-live="polite">
                {String(active + 1).padStart(2, '0')} / {String(SCREENS.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={active === 0}
                aria-label="Previous screen"
                className="w-11 h-11 rounded-full border-[3px] border-rail-ink grid place-items-center hover:bg-rail-ink hover:text-enamel disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-rail-ink transition-colors"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={2.75} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                disabled={active === SCREENS.length - 1}
                aria-label="Next screen"
                className="w-11 h-11 rounded-full border-[3px] border-rail-ink grid place-items-center hover:bg-rail-ink hover:text-enamel disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-rail-ink transition-colors"
              >
                <ChevronRight className="w-5 h-5" strokeWidth={2.75} />
              </button>
            </div>
          </div>

          <div
            ref={stripRef}
            className={
              ride
                ? 'relative flex-1 flex items-end min-h-0 pt-8'
                : 'relative mt-10 overflow-x-auto snap-x snap-mandatory overscroll-x-contain ride-strip'
            }
          >
            <div ref={trackRef} className="relative will-change-transform px-5 sm:px-10 lg:px-14 lg:pl-[max(3.5rem,calc((100vw-1440px)/2+3.5rem))]">
              {/* The line under every station; the filled part is how far you've ridden. */}
              <div aria-hidden className="absolute left-0 right-0 bottom-[122px] h-[20px] bg-rail-rule" />
              <div
                aria-hidden
                className="absolute left-0 bottom-[122px] h-[20px] bg-rail-scottsdale"
                style={{ width: `${8 + progress * 92}%` }}
              />
              {stations}
            </div>
          </div>
          {ride && <div className="h-[max(1.5rem,3vh)]" />}
        </div>
      </div>
      <p className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 mt-6 font-plate text-[13px] text-rail-muted">
        Map tiles &copy; OpenStreetMap contributors. The live build used Google Maps.
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Pipeline: how an offer gets on the map                               */
/* ------------------------------------------------------------------ */

function Pipeline() {
  return (
    <section id="pipeline" aria-labelledby="pipeline-title" className="bg-rail-ink text-enamel mt-24 sm:mt-32 scroll-mt-4">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 py-20 sm:py-28 grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-14 lg:gap-20">
        <div className="lg:sticky lg:top-16 self-start">
          <h2 id="pipeline-title" className="font-signal font-black text-[clamp(2.25rem,4.8vw,4rem)] leading-[0.95] tracking-[-0.035em]">
            From mall pages to one map.
          </h2>
          <p className="font-plate mt-6 text-[18px] leading-relaxed text-enamel/75 max-w-[44ch]">
            Mall sites scatter their deals across dozens of store pages. We built an AI pipeline
            that read those pages every week, validated each offer, and removed duplicates. Every
            offer rode the same four stops.
          </p>

          {/* Dedup, shown as a branch: the first copy continues, repeats end at a buffer stop. */}
          <div className="mt-10 font-plate">
            <div className="flex items-center gap-4">
              <span className="w-10 h-[10px] bg-rail-scottsdale" aria-hidden />
              <p className="text-[15px]">
                <span className="font-bold">Kept:</span>{' '}
                <span className="text-enamel/80">&ldquo;40% off select styles&rdquo;</span>
              </p>
            </div>
            <div className="flex items-center gap-4 mt-3">
              <span className="relative w-10 h-[10px] bg-enamel/25" aria-hidden>
                <span className="absolute -right-0.5 -top-[7px] w-[4px] h-[24px] bg-enamel/60" />
              </span>
              <p className="text-[15px]">
                <span className="font-bold">Duplicate:</span>{' '}
                <span className="text-enamel/60 line-through decoration-enamel/50">&ldquo;40% off select styles&rdquo;</span>
              </p>
            </div>
          </div>
        </div>

        <ol className="relative">
          <span aria-hidden className="absolute left-[13px] top-3 bottom-3 w-[10px] bg-rail-scottsdale" />
          {STOPS.map((stop, i) => (
            <li key={stop.name} className="relative pl-16 pb-12 last:pb-0">
              <span
                aria-hidden
                className="absolute left-0 top-0.5 w-9 h-9 rounded-full border-[7px] border-enamel bg-rail-ink"
              />
              <h3 className="font-signal font-extrabold text-[clamp(1.5rem,2.4vw,2rem)] leading-none tracking-[-0.02em]">
                <span className="tabular-nums text-enamel/45 mr-3">{String(i + 1).padStart(2, '0')}</span>
                {stop.name}
              </h3>
              <p className="font-plate mt-3 text-[17px] leading-relaxed text-enamel/75 max-w-[56ch]">{stop.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Reach + team                                                         */
/* ------------------------------------------------------------------ */

function Reach() {
  return (
    <section id="team" aria-labelledby="team-title" className="scroll-mt-4">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 py-24 sm:py-32 grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <div>
          <h2 id="team-title" className="font-signal font-black text-[clamp(2.25rem,4.8vw,4rem)] leading-[0.95] tracking-[-0.035em]">
            Built by a team of three.
          </h2>
          <p className="font-plate mt-6 text-[18px] leading-relaxed text-rail-soft max-w-[52ch]">
            GottaGo! was our honors thesis: a student initiative to help college students find local
            deals worth the trip. We scaled it across Scottsdale, Tempe, and Chandler and reached
            60+ users before retiring it.
          </p>
          <p className="font-plate mt-5 text-[18px] leading-relaxed text-rail-soft max-w-[52ch]">
            The hard part was never the scraping. It was keeping the data clean: the same offer
            shows up on several pages and again every week, and every row has to be complete
            before it reaches a student&rsquo;s screen.
          </p>

          {/* The roster: three roles, lead engineer first. */}
          <ul className="mt-12 border-t-[3px] border-rail-ink font-plate" aria-label="The team">
            <li className="py-4 border-b border-rail-rule">
              <p className="inline-flex items-center gap-2.5 text-[17px] font-bold">
                <span aria-hidden className="w-3 h-3 rounded-full bg-rail-scottsdale" />
                Lead Engineer
              </p>
            </li>
            {['bg-rail-tempe', 'bg-rail-chandler'].map((dot) => (
              <li key={dot} className="py-4 border-b border-rail-rule">
                <p className="inline-flex items-center gap-2.5 text-[17px] font-bold">
                  <span aria-hidden className={`w-3 h-3 rounded-full ${dot}`} />
                  Growth &amp; Operations
                </p>
              </li>
            ))}
          </ul>

          {/* The three city lines, each labeled in words as well as color. */}
          <ul className="mt-12 space-y-4 font-plate" aria-label="Cities served">
            {CITIES.map((c) => (
              <li key={c.name} className="flex items-center gap-4">
                <span aria-hidden className={`h-[14px] flex-1 max-w-[260px] ${c.color}`} />
                <span aria-hidden className="w-6 h-6 -ml-5 rounded-full border-[5px] border-rail-ink bg-enamel" />
                <span className="text-[17px] font-bold">{c.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-signal font-extrabold text-[22px] tracking-[-0.01em]">The stack we built it on</h3>
          <p className="font-plate mt-2 text-[16px] text-rail-soft">TypeScript end to end, as part of the thesis.</p>
          <dl className="mt-8 border-t-[3px] border-rail-ink">
            {STACK.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[120px_minmax(0,1fr)] sm:grid-cols-[150px_minmax(0,1fr)] gap-4 py-4 border-b border-rail-rule font-plate">
                <dt className="text-[13px] font-bold tracking-[0.06em] uppercase pt-0.5">{k}</dt>
                <dd className="text-[16px] text-rail-soft">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* End of the line                                                      */
/* ------------------------------------------------------------------ */

function Terminus() {
  return (
    <section aria-labelledby="end-title" className="border-t-[3px] border-rail-ink">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 py-20 sm:py-24 grid lg:grid-cols-[minmax(0,1fr)_auto] gap-10 items-end">
        <div>
          <h2 id="end-title" className="font-signal font-black text-[clamp(2rem,4vw,3.25rem)] leading-[0.95] tracking-[-0.03em] max-w-[18ch]">
            End of the line. The code is still here.
          </h2>
          <p className="font-plate mt-5 text-[17px] leading-relaxed text-rail-soft max-w-[60ch]">
            This build ships a fixed sample dataset instead of live results: real promotions expire
            within weeks, and we would rather show invented stores than a wrong price for a real
            business. Search, filters, sorting, the map, and store detail all run the original code.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 font-plate">
          <Link
            to="/app"
            className="inline-flex items-center gap-2 bg-rail-ink text-enamel font-bold text-[16px] px-6 py-3.5 rounded-full hover:bg-rail-scottsdale hover:text-rail-ink transition-colors"
          >
            Open the demo
            <ArrowRight className="w-[18px] h-[18px]" strokeWidth={2.5} />
          </Link>
          <a
            href={REPOS.backend}
            className="inline-flex items-center gap-2 border-[3px] border-rail-ink font-bold text-[16px] px-5 py-3 rounded-full hover:bg-rail-ink hover:text-enamel transition-colors"
          >
            Backend source
            <ArrowUpRight className="w-[18px] h-[18px]" strokeWidth={2.5} />
          </a>
          <a
            href={REPOS.frontend}
            className="inline-flex items-center gap-2 border-[3px] border-rail-ink font-bold text-[16px] px-5 py-3 rounded-full hover:bg-rail-ink hover:text-enamel transition-colors"
          >
            Frontend source
            <ArrowUpRight className="w-[18px] h-[18px]" strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function LandingPage() {
  return (
    <div className="line-page min-h-screen bg-enamel text-rail-ink font-plate antialiased">
      <a
        href="#screens"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-rail-ink focus:text-enamel focus:px-4 focus:py-2 focus:rounded-full"
      >
        Skip to the screens
      </a>
      <header className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 py-5 sm:py-7 flex items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2.5" aria-label="GottaGo! home">
          <Mark />
          <span className="font-signal font-black text-[24px] tracking-[-0.03em]">GottaGo!</span>
        </a>
        <nav aria-label="Sections" className="flex items-center gap-6 lg:gap-8 font-plate text-[15px] font-medium">
          <a href="#screens" className="hidden md:inline hover:underline underline-offset-[6px] decoration-2">Screens</a>
          <a href="#pipeline" className="hidden md:inline hover:underline underline-offset-[6px] decoration-2">Pipeline</a>
          <a href="#team" className="hidden md:inline hover:underline underline-offset-[6px] decoration-2">Team</a>
          <Link
            to="/app"
            className="inline-flex items-center gap-2 bg-rail-ink text-enamel font-semibold px-[18px] py-2.5 rounded-full hover:bg-rail-scottsdale hover:text-rail-ink transition-colors"
          >
            Open the demo
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </Link>
        </nav>
      </header>

      <main>
        <Hero />
        <ScreensRide />
        <Pipeline />
        <Reach />
        <Terminus />
      </main>

      <Footer className="px-5 sm:px-10 lg:px-14 py-6 border-t border-rail-rule text-rail-muted font-plate" />
    </div>
  );
}
