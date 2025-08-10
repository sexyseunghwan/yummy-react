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
        if (value.trim()) {
            const params = new URLSearchParams();
            params.set('q', value);
            router.push(`/search/result?${params.toString()}`);
        }
    };

    const handleBack = () => {
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-background flex flex-col justify-start">
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
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-lg font-semibold text-text mb-2">검색어를 입력해주세요</h3>
                    <p className="text-sm text-muted-foreground">
                        원하는 음식점이나 음식을 검색해보세요
                    </p>
                </div>
            </div>
        </div>
    );
} 