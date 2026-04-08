# Yummy Next.js

맛집 정보 및 지도 기반 서비스를 제공하는 Next.js 애플리케이션입니다.

## 목차

- [프로젝트 개요](#프로젝트-개요)
- [기술 스택](#기술-스택)
- [시스템 요구사항](#시스템-요구사항)
- [설치 및 실행](#설치-및-실행)
- [환경 설정](#환경-설정)
- [프로젝트 구조](#프로젝트-구조)
- [개발 가이드](#개발-가이드)
- [빌드 및 배포](#빌드-및-배포)

## 프로젝트 개요

Yummy는 맛집 정보를 제공하고, Naver Maps API를 활용한 지도 기반 서비스입니다. 카카오/구글 소셜 로그인을 지원하며, TypeScript와 Tailwind CSS를 사용한 모던 웹 애플리케이션입니다.

### 주요 기능

- 맛집 검색 및 정보 제공
- Naver Maps 기반 지도 서비스
- 카카오/구글 소셜 로그인
- 사용자 인증 및 회원 관리
- 지하철 역 정보 연동

## 기술 스택

### Core

- **Next.js** 15.3.1 - React 프레임워크
- **React** 19.1.0 - UI 라이브러리
- **TypeScript** 5.x - 타입 안전성

### Styling

- **Tailwind CSS** 3.4.1 - 유틸리티 CSS 프레임워크
- **PostCSS** 8.4.35 - CSS 처리

### Libraries

- **Axios** 1.9.0 - HTTP 클라이언트
- **Lodash** 4.17.21 - 유틸리티 함수
- **Decimal.js** 10.5.0 - 정밀한 숫자 계산
- **clsx** & **tailwind-merge** - 클래스 네임 관리

### API Integration

- Naver Maps API
- Kakao Login API
- Google OAuth API

## 시스템 요구사항

### 필수 요구사항

- **Node.js**: 20.18.1 LTS 이상 (권장)
- **npm**: 10.0.0 이상
- **운영체제**: macOS, Linux, Windows

### 권장 개발 환경

프로젝트는 Node.js 20 LTS 버전을 사용하도록 설정되어 있습니다. nvm을 사용하는 경우 자동으로 올바른 버전이 적용됩니다.

```bash
# nvm 사용 시 자동으로 Node 버전 적용
nvm use
```

## 설치 및 실행

### 1. 저장소 클론

```bash
git clone <repository-url>
cd yummy-next
```

### 2. Node.js 버전 설정

프로젝트는 `.nvmrc` 파일을 통해 Node.js 20.18.1을 사용합니다.

```bash
# nvm 사용 시
nvm use

# nvm이 없는 경우 Node.js 20.18.1 LTS 직접 설치
# https://nodejs.org/
```

### 3. 의존성 설치

```bash
npm install
```

### 4. 환경 변수 설정

`.env.local` 파일을 생성하고 필요한 환경 변수를 설정합니다. (자세한 내용은 [환경 설정](#환경-설정) 참조)

```bash
cp .env.local.example .env.local  # 예제 파일이 있는 경우
# 또는 직접 .env.local 파일 생성 후 환경 변수 입력
```

### 5. 개발 서버 실행

```bash
# Windows 환경
npm run wdev

# macOS/Linux 환경
npm run dev
```

개발 서버가 실행되면 `.env.local`에 설정된 포트(기본값: 5176)로 접속합니다.

```
http://mylocal.dev.com:5176
```

## 환경 설정

### 환경 변수 파일

프로젝트는 `.env.local` 파일을 사용하여 환경 변수를 관리합니다.

#### 필수 환경 변수

```bash
## NEXT SERVER DEFAULT
NEXT_PUBLIC_PORT=5176
NEXT_PUBLIC_API_URL=http://mylocal.dev.com:8089

## KAKAO API
NEXT_PUBLIC_KAKAO_CLIENT_ID=your_kakao_client_id
NEXT_PUBLIC_KAKAO_AUTH_URL=https://kauth.kakao.com/oauth/token
NEXT_PUBLIC_KAKAO_API_URL=https://kapi.kakao.com
NEXT_PUBLIC_KAKAO_REDIRECT_URL=http://mylocal.dev.com:5176/login/kakaoLogging/
NEXT_PUBLIC_KAKAO_JS_KEY=your_kakao_js_key

## GOOGLE API
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_GOOGLE_AUTH_URL=https://accounts.google.com/o/oauth2/v2/auth
NEXT_PUBLIC_GOOGLE_REDIRECT_URL=http://mylocal.dev.com:5176/login/googleLogging/
```

### 로컬 도메인 설정 (선택사항)

`mylocal.dev.com` 도메인을 사용하기 위해 hosts 파일을 수정할 수 있습니다.

**macOS/Linux:**
```bash
sudo nano /etc/hosts

# 다음 줄 추가
127.0.0.1 mylocal.dev.com
```

**Windows:**
```
C:\Windows\System32\drivers\etc\hosts 파일 편집

# 다음 줄 추가
127.0.0.1 mylocal.dev.com
```

## 프로젝트 구조

```
yummy-next/
├── .nvmrc                 # Node.js 버전 명시 (20.18.1)
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── (auth)/       # 인증 관련 라우트 그룹
│   │   │   ├── login/    # 로그인 페이지
│   │   │   ├── joinMember/   # 회원가입
│   │   │   ├── findId/       # 아이디 찾기
│   │   │   ├── findPw/       # 비밀번호 찾기
│   │   │   └── ...
│   │   ├── api/          # API 라우트
│   │   ├── page.tsx      # 메인 페이지
│   │   ├── layout.tsx    # 루트 레이아웃
│   │   └── globals.css   # 전역 스타일
│   ├── components/       # 재사용 가능한 컴포넌트
│   ├── lib/              # 라이브러리 및 유틸리티
│   │   └── client/       # 클라이언트 전용 라이브러리
│   │       └── map/      # 지도 관련 기능
│   ├── hooks/            # 커스텀 React Hooks
│   ├── context/          # React Context
│   ├── types/            # TypeScript 타입 정의
│   ├── utils/            # 유틸리티 함수
│   ├── services/         # API 서비스 레이어
│   ├── class/            # 클래스 정의
│   └── middleware.tsx    # Next.js 미들웨어
├── public/               # 정적 파일
├── erd/                  # ERD 문서
├── server.js             # HTTPS 프로덕션 서버 (SSL)
├── next.config.ts        # Next.js 설정
├── tailwind.config.js    # Tailwind CSS 설정
├── tsconfig.json         # TypeScript 설정
├── eslint.config.mjs     # ESLint 설정
└── package.json          # 프로젝트 의존성
```

### 주요 디렉토리 설명

- **`src/app`**: Next.js App Router 기반 페이지 및 레이아웃
- **`src/components`**: 재사용 가능한 UI 컴포넌트
- **`src/lib`**: 외부 라이브러리 통합 및 헬퍼 함수
- **`src/hooks`**: 커스텀 React Hooks
- **`src/types`**: TypeScript 타입 및 인터페이스 정의
- **`src/utils`**: 공통 유틸리티 함수

## 개발 가이드

### 사용 가능한 스크립트

```bash
# Windows 개발 서버 실행
npm run wdev

# macOS/Linux 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행 (HTTPS - SSL 인증서 필요)
npm run start

# 코드 린팅
npm run lint
```

### 개발 서버 포트

- 기본 포트: `.env.local`의 `NEXT_PUBLIC_PORT` 설정값 (기본 5176)
- 포트 변경: `.env.local` 파일에서 `NEXT_PUBLIC_PORT` 값 수정

### TypeScript 경로 별칭

프로젝트는 `@/*` 경로 별칭을 사용합니다.

```typescript
// 절대 경로 import 예시
import { Component } from '@/components/Component'
import { useCustomHook } from '@/hooks/useCustomHook'
import { apiService } from '@/services/apiService'
```

### 코드 스타일 및 린팅

- **ESLint**: JavaScript/TypeScript 코드 품질 관리
- **Prettier**: 코드 포맷팅 (설정 시)

```bash
# 린팅 실행
npm run lint
```

## 빌드 및 배포

### 1. 개발 환경 빌드

```bash
npm run build
```

빌드 결과물은 `.next` 디렉토리에 생성됩니다.

### 2. 프로덕션 환경

#### 일반 Node.js 서버

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행 (HTTP)
npx next start
```

#### HTTPS 서버 (SSL 인증서 필요)

프로젝트에 포함된 `server.js`는 HTTPS 프로덕션 서버를 실행합니다.

**요구사항:**
- SSL 인증서 및 개인키 파일
- 인증서 경로: `/etc/letsencrypt/live/yummy-chocosonge.duckdns.org/`

```bash
# HTTPS 프로덕션 서버 실행
npm run start
```

**참고**: `server.js`의 인증서 경로를 실제 환경에 맞게 수정해야 합니다.

```javascript
// server.js
const httpsOptions = {
  key: fs.readFileSync('path/to/privkey.pem'),
  cert: fs.readFileSync('path/to/fullchain.pem')
};
```

### 3. 배포 플랫폼

#### Vercel (권장)

Next.js의 제작사인 Vercel에서 가장 쉽게 배포할 수 있습니다.

1. [Vercel](https://vercel.com) 계정 생성
2. GitHub 저장소 연결
3. 환경 변수 설정
4. 자동 배포

#### 기타 플랫폼

- AWS (EC2, Elastic Beanstalk, Amplify)
- Google Cloud Platform
- Azure
- DigitalOcean
- Netlify

## 트러블슈팅

### Node.js 버전 문제

```bash
# nvm 사용 시 올바른 버전으로 전환
nvm use 20.18.1

# 또는
nvm use
```

### 포트 충돌

`.env.local`의 `NEXT_PUBLIC_PORT`를 다른 포트로 변경합니다.

### SSL 인증서 오류 (프로덕션)

`server.js`의 인증서 경로가 올바른지 확인하거나, HTTP 모드로 실행합니다.

```bash
# HTTP 모드 (개발/테스트용)
npx next start -p 3000
```

### 환경 변수가 적용되지 않는 경우

1. 개발 서버 재시작
2. `.env.local` 파일 위치 확인 (프로젝트 루트)
3. 환경 변수명이 `NEXT_PUBLIC_` 접두사를 포함하는지 확인

## 참고 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [React 공식 문서](https://react.dev)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [TypeScript 문서](https://www.typescriptlang.org/docs)
- [Naver Maps API](https://navermaps.github.io/maps.js.ncp/)

## 라이선스

이 프로젝트의 라이선스는 별도로 명시되지 않았습니다.

---

**개발 문의**: 프로젝트 관련 문의사항은 이슈 트래커를 이용해주세요.
