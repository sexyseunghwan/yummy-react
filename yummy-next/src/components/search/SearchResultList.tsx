import { Store } from '@/types/shared/store';
import SearchResultItem from './SearchResultItem';
import { Skeleton } from '@/components/common/Skeleton/Skeleton';

interface SearchResultListProps {
  stores: Store[];
  onStoreSelect?: (store: Store) => void;
  isLoading?: boolean;
}

const SearchResultList = ({ stores, onStoreSelect, isLoading }: SearchResultListProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="p-4 border-b animate-pulse">
            <Skeleton className="h-6 rounded mb-2" />
            <Skeleton className="h-4 rounded mb-2" />
          </div>
        ))}
      </div>
    );
  }

  if (stores.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-4xl mb-4">🔍</div>
        <h3 className="text-lg font-semibold mb-2">검색 결과가 없습니다</h3>
        <p className="text-sm text-gray-500">다른 검색어를 입력해보세요 </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {stores.map((store, index) => (
        <SearchResultItem
          key={`${store.name}-${index}`}
          store={store}
          onClick={onStoreSelect}
        />
      ))}
    </div>
  );
};

export default SearchResultList; 