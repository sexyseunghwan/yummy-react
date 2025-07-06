'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/common/Input/Input';
import ArrowIcon from '@/components/common/Icons/ArrowIcon';
import Image from 'next/image';

const mockResults = [
  { id: 1, name: '맛집1', address: '서울시 강남구', image: '/images/logo.svg' },
  { id: 2, name: '맛집2', address: '서울시 서초구', image: '/images/logo.svg' },
  { id: 3, name: '맛집3', address: '서울시 송파구', image: '/images/logo.svg' },
];

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };

    const handleBack = () => {
        router.push('/');
    };

    const filteredResults = searchTerm
      ? mockResults.filter(r => r.name.includes(searchTerm))
      : [];

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-start">
            <div className="flex items-center gap-2 border-b border-accent p-2 mb-4 w-full">
                <button
                    onClick={handleBack}
                    aria-label="메인으로 이동"
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
                    autoFocus
                />
            </div>
            <div className="w-full max-w-md px-2">
                {filteredResults.length > 0 ? (
                  <div className="grid gap-4">
                    {filteredResults.map(result => (
                      <div key={result.id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
                        <Image
                          src={result.image}
                          alt={result.name}
                          width={64}
                          height={64}
                          className="w-16 h-16 rounded object-cover"
                        />
                        <div>
                          <div className="font-bold">{result.name}</div>
                          <div className="text-sm text-text-light">{result.address}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : searchTerm ? (
                  <div className="mt-4 text-center text-text-light text-sm">검색 결과가 없습니다.</div>
                ) : null}
            </div>
        </div>
    );
} 