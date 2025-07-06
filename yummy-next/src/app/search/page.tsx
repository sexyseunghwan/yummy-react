'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/common/Input/Input';
import ArrowIcon from '@/components/common/Icons/ArrowIcon';

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        console.log('검색어:', value);
    };

    const handleBack = () => {
        router.push('/');
    };

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
            <div>
                {searchTerm && (
                    <div className="mt-4">
                        <p className="text-sm text-text-light">
                            &ldquo;{searchTerm}&rdquo;에 대한 검색 결과가 여기에 표시됩니다.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
} 