import { useEffect, useMemo, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DemoDeal } from '../data/demoDeals';
import { splitDiscount } from './dealUi';

// Free, key-less map: OpenStreetMap tiles via Leaflet.

interface DealsMapProps {
  deals: DemoDeal[];
  selectedDeal: DemoDeal | null;
  onDealSelect: (deal: DemoDeal) => void;
  center?: { lat: number; lng: number };
  zoom?: number;
  compact?: boolean;
  /** Extra room kept clear at the bottom when fitting pins (e.g. under a card carousel). */
  bottomInset?: number;
}

// A pill that carries the offer's number, so the map reads like a price map.
function makeIcon(deal: DemoDeal, isSelected: boolean) {
  const { big } = splitDiscount(deal.discount);
  const label = escapeHtml(big.length > 6 ? big.slice(0, 6) : big);
  return L.divIcon({
    className: 'deal-pin-wrap',
    html: `<div class="deal-pin${isSelected ? ' is-selected' : ''}">${label}</div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

export default function DealsMap({
  deals,
  selectedDeal,
  onDealSelect,
  center = { lat: 33.4942, lng: -111.9261 },
  zoom = 11,
  compact = false,
  bottomInset = 0,
}: DealsMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const selectRef = useRef(onDealSelect);
  selectRef.current = onDealSelect;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      center: [center.lat, center.lng],
      zoom,
      zoomControl: !compact,
      attributionControl: true,
    });
    if (!compact) map.zoomControl.setPosition('bottomright');
    map.attributionControl.setPosition(compact ? 'topright' : 'bottomleft');
    map.attributionControl.setPrefix(false);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dealIds = useMemo(() => deals.map((d) => d.id).join(','), [deals]);

  // Rebuild markers and refit only when the set of deals changes.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();
    const bounds: L.LatLngExpression[] = [];
    deals.forEach((deal) => {
      const marker = L.marker([deal.location.lat, deal.location.lng], {
        icon: makeIcon(deal, false),
        keyboard: true,
        title: `${deal.storeName}: ${deal.discount}`,
        riseOnHover: true,
      });
      marker.on('click', () => selectRef.current(deal));
      marker.addTo(map);
      markersRef.current.set(deal.id, marker);
      bounds.push([deal.location.lat, deal.location.lng]);
    });
    if (bounds.length > 0) {
      map.fitBounds(bounds as L.LatLngBoundsExpression, {
        paddingTopLeft: [40, 40],
        paddingBottomRight: [40, 40 + bottomInset],
        maxZoom: 13,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dealIds]);

  // Restyle the selected pin and bring it into view.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    deals.forEach((deal) => {
      const m = markersRef.current.get(deal.id);
      if (!m) return;
      const sel = selectedDeal?.id === deal.id;
      m.setIcon(makeIcon(deal, sel));
      m.setZIndexOffset(sel ? 1000 : 0);
    });
    if (selectedDeal) {
      map.panTo([selectedDeal.location.lat, selectedDeal.location.lng], { animate: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDeal?.id, dealIds]);

  return <div ref={containerRef} className="deals-map w-full h-full" />;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
