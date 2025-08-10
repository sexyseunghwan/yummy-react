'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Store } from '@/types/shared/store';
import { SearchResult } from '@/types/client/search/searchResult';
import Input from '@/components/common/Input/Input';
import ArrowIcon from '@/components/common/Icons/ArrowIcon';
import { SearchResultList } from '@/components/search';

// 임시 더미 데이터
const mockStores: Store[] = [
  {
    name: '맛있는 치킨집',
    lat: 37.5665,
    lng: 126.9780,
    type: '치킨',
    isBeefulPay: true,
  },
  {
    name: '신선한 피자',
    lat: 37.5665,
    lng: 126.9780,
    type: '피자',
    isBeefulPay: false,
  },
  {
    name: '고급 스테이크하우스',
    lat: 37.5665,
    lng: 126.9780,
    type: '스테이크',
    isBeefulPay: true,
  },
  {
    name: '전통 한식당',
    lat: 37.5665,
    lng: 126.9780,
    type: '한식',
    isBeefulPay: false,
  },
  {
    name: '신선한 회사',
    lat: 37.5665,
    lng: 126.9780,
    type: '회',
    isBeefulPay: true,
  },
];

export default function SearchResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const term = searchParams.get('q') || '';
    setSearchTerm(term);
    
    if (term) {
      // 실제로는 API 호출을 여기서 수행
      simulateSearch(term);
    }
  }, [searchParams]);

  const simulateSearch = async (term: string) => {
    setIsLoading(true);
    
    // 실제 검색 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const filteredStores = mockStores.filter(store => 
      store.name.toLowerCase().includes(term.toLowerCase()) ||
      store.type.toLowerCase().includes(term.toLowerCase())
    );
    
    setStores(filteredStores);
    setTotalCount(filteredStores.length);
    setIsLoading(false);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.trim()) {
      const params = new URLSearchParams();
      params.set('q', value);
      router.push(`/search/result?${params.toString()}`);
    }
  };

  const handleBack = () => {
    router.push('/search');
  };

  const handleStoreSelect = (store: Store) => {
    // 매장 상세 페이지로 이동 (실제 구현 시)
    console.log('선택된 매장:', store);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center gap-2 border-b border-accent p-2 w-full">
        <button
          onClick={handleBack}
          aria-label="검색 페이지로 돌아가기"
          tabIndex={0}
          className="text-2xl px-2 text-text hover:text-primary focus:outline-none"
        >
          <ArrowIcon />
        </button>
        <Input 
          placeholder="검색어를 입력해주세요."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          size="small"
          className="w-full"
        />
      </div>

      {/* 검색 결과 헤더 */}
      {searchTerm && (
        <div className="px-4 py-2 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-md font-semibold text-text">
              &ldquo;{searchTerm}&rdquo; 검색 결과
            </h2>
            <span className="text-xs text-gray-500">
              총 {totalCount}개
            </span>
          </div>
        </div>
      )}

      {/* 검색 결과 목록 */}
      <div className="flex-1 overflow-y-auto">
        <SearchResultList
          stores={stores}
          onStoreSelect={handleStoreSelect}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
} 