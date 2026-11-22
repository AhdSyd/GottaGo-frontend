import DealItem from './DealItem';
import { DemoDeal } from '../data/demoDeals';

interface DealsListProps {
  deals: DemoDeal[];
  selectedDeal: DemoDeal | null;
  onDealSelect: (deal: DemoDeal) => void;
  showHeader?: boolean;
  showContainer?: boolean;
  className?: string;
}

export default function DealsList({ 
  deals, 
  selectedDeal, 
  onDealSelect, 
  showHeader = true, 
  showContainer = true,
  className = ""
}: DealsListProps) {
  if (deals.length === 0) {
    const emptyContent = (
      <div className="p-8 text-center">
        <p className="text-ink-muted text-lg">No deals found matching your criteria.</p>
        <p className="text-ink-muted mt-2">Try adjusting your search or filters.</p>
      </div>
    );

    if (!showContainer) {
      return emptyContent;
    }

    return (
      <div className="bg-white rounded-xl shadow-sm border border-ink-line">
        {emptyContent}
      </div>
    );
  }

  const dealsList = (
    <>
      {showHeader && (
        <div className="p-6 border-b border-ink-line flex-shrink-0 bg-paper-sunk">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-ink">Local Deals</h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-wayfind rounded-full"></div>
              <span className="text-sm text-ink-muted font-medium">Demo</span>
            </div>
          </div>
        </div>
      )}
      
      <div className={`${showHeader ? 'flex-1' : ''} overflow-y-auto`}>
        <div className="divide-y divide-ink-line">
          {deals.map((deal) => (
            <DealItem
              key={deal.id}
              deal={deal}
              isSelected={selectedDeal?.id === deal.id}
              onClick={() => onDealSelect(deal)}
            />
          ))}
        </div>
      </div>
    </>
  );

  if (!showContainer) {
    return <div className={className}>{dealsList}</div>;
  }

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-ink-line h-full flex flex-col overflow-hidden ${className}`}>
      {dealsList}
    </div>
  );
}