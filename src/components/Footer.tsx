interface FooterProps {
  className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
  return (
    <footer className={className}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-row items-center justify-between space-x-2 md:space-x-6 md:space-y-0">
          <div className="text-xs md:text-sm opacity-90">
            <p>&copy; 2026 GottaGo!</p>
          </div>

          <p className="text-xs md:text-sm opacity-70">Demo build · sample data</p>
        </div>
      </div>
    </footer>
  );
}
