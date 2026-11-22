import { Search, Filter } from 'lucide-react';

interface NavigationProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNavigateToLanding: () => void;
}

export default function Navigation({ searchQuery, onSearchChange, onNavigateToLanding }: NavigationProps) {
  return (
    <nav className="bg-paper-raised/95 backdrop-blur-sm shadow-lg border-b border-ink-line sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onNavigateToLanding}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200 group min-w-0"
            >
              <div className="flex items-center space-x-1">
                <span className="text-lg font-display font-extrabold tracking-tight text-ink whitespace-nowrap">
                  GottaGo!
                </span>
                <span className="text-xs font-medium text-ink-muted bg-paper-sunk px-1.5 py-0.5 rounded-tag whitespace-nowrap">
                  Demo
                </span>
              </div>
            </button>
          </div>

          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-ink-muted w-5 h-5 group-focus-within:text-markdown transition-colors duration-200" />
            <input
              type="text"
              placeholder="Search deals, stores..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-ink-line rounded-tag focus:ring-2 focus:ring-markdown focus:border-transparent transition-colors bg-paper-raised focus:bg-white text-ink-soft placeholder-ink-muted"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-ink-line rounded-full transition-colors duration-200">
              <Filter className="w-4 h-4 text-ink-muted" />
            </button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onNavigateToLanding}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200 group"
            >
              <span className="text-2xl font-display font-extrabold tracking-tight text-ink whitespace-nowrap">
                GottaGo!
              </span>
              <span className="text-xs font-medium text-ink-muted bg-paper-sunk px-2 py-1 rounded-tag whitespace-nowrap">
                Demo
              </span>
            </button>
          </div>

          <div className="flex-1 max-w-2xl mx-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-ink-muted w-5 h-5 group-focus-within:text-markdown transition-colors duration-200" />
              <input
                type="text"
                placeholder="Search for deals, stores, or categories..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border border-ink-line rounded-tag focus:ring-2 focus:ring-markdown focus:border-transparent transition-colors bg-paper-raised focus:bg-white text-ink-soft placeholder-ink-muted"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-ink-line rounded-full transition-colors duration-200">
                <Filter className="w-4 h-4 text-ink-muted" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}
