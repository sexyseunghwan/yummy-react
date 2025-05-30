import Decimal from 'decimal.js';

/* Java 의  UserBasicInfoDto 와 맵핑되는 객체 */
export interface User {
    userId: string;
    userNm: string;
    userBirth: string;
    userPic: string;
    lng: Decimal;
    lat: Decimal;
}

export interface UserContextType {
    user: User | null;
    isLoading: boolean;
  }