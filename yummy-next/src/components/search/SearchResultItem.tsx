import { Store } from '@/types/shared/store';

interface SearchResultItemProps {
  store: Store;
  onClick?: (store: Store) => void;
}

const SearchResultItem = ({ store, onClick }: SearchResultItemProps) => {
  const handleClick = () => {
    onClick?.(store);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className="p-4 border-b cursor-pointer transition-colors"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${store.name} 선택`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-text text-lg">{store.name}</h3>
            {store.isBeefulPay && (
              <div className="flex items-center gap-1 text-primary text-sm">
                <span className="text-xs">💳</span>
                <span>비플페이</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <span className="text-xs">📍</span>
              <span>{store.type}</span>
            </div>
          </div>       
        </div>
      </div>
    </div>
  );
};

export default SearchResultItem; 