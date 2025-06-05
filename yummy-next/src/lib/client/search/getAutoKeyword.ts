'use client';

import axios from 'axios';
import { AutoComplete } from '@/types/client/search/autoComplete';


export async function getAutoKeyword(
    apiBaseUrl: string, 
    inputValue: string,
    setSearchResults: (data: AutoComplete[]) => void
) {
    axios.get(`${apiBaseUrl}/search/autoKeyword`,{
        params: { searchText: inputValue },
    })
    .then(res => {
        const data: AutoComplete[] = res.data;
        setSearchResults(data);
    })
    .catch(err => {
        console.error("검색 실패:", err);
    })
}