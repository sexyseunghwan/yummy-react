export class LRUCache<K, V> {
    private cache: Map<K, V>;
    private sizes: Map<K, number>;
    private maxSize: number;
    private currentSize: number;

    constructor(maxSize: number) {
        this.cache = new Map();
        this.sizes = new Map();
        this.maxSize = maxSize; // 예: 1024 * 1024 = 1MB
        this.currentSize = 0;
    }

    get(key: K): V | undefined {
        if (!this.cache.has(key)) return undefined;

        const value = this.cache.get(key)!;
        this.cache.delete(key);
        this.cache.set(key, value); // 최근 접근된 항목은 뒤로 이동
        return value;
    }

    set(key: K, value: V): void {
        const itemSize = this.calculateSize(value);

        // 기존 키면 사이즈 조정
        if (this.cache.has(key)) {
            const oldSize = this.sizes.get(key) || 0;
            this.currentSize -= oldSize;
            this.cache.delete(key);
        }

        // maxSize 초과 시 오래된 항목 제거
        while (this.currentSize + itemSize > this.maxSize) {
            //console.log('캐시제거해라!! 영배야');
            const oldestKey = this.cache.keys().next().value;
            if (oldestKey === undefined) break;

            const oldestSize = this.sizes.get(oldestKey) || 0;
            this.cache.delete(oldestKey);
            this.sizes.delete(oldestKey);
            this.currentSize -= oldestSize;
        }

        this.cache.set(key, value);
        this.sizes.set(key, itemSize);
        this.currentSize += itemSize;
    }

    has(key: K): boolean {
        return this.cache.has(key);
    }

    private calculateSize(value: V): number {
        try {
            /* 기본적으로 JSON 문자열 길이로 size 추정 (UTF-16 문자 기준) */ 
            return JSON.stringify(value).length * 2;
        } catch {
            return 0;
        }
    }
}
