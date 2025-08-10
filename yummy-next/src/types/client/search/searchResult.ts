import { Store } from '@/types/shared/store';

export type SearchResult = {
  stores: Store[];
  totalCount: number;
  searchTerm: string;
  searchTime: number;
};

export type SearchFilter = {
  category?: string;
  minRating?: number;
  maxDistance?: number;
  isBeefulPay?: boolean;
};

export type SearchSortOption = 'distance' | 'rating' | 'name' | 'recent'; 