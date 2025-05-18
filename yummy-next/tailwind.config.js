/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Pretendard', 'sans-serif'],
      },
      colors: {
        // 1. 텍스트 색상 (로고색과 어울리는 브라운 계열)
        text: {
          DEFAULT: '#3B2F2F',  // 다크 브라운
          light: '#7D6E63',    // 밝은 브라운-그레이
        },

        // 2. 배경색 (따뜻한 아이보리 톤)
        background: {
          DEFAULT: '#FCF8F5',  // 따뜻한 아이보리
          light: '#F1E8E2',    // 연한 베이지 톤
        },

        // 3. Primary 색상 (로고색 기반)
        primary: {
          DEFAULT: '#7C4017',  // 로고 색상
          dark: '#5A2D10',     // 더 진한 클릭/호버용 브라운
        },

        // 4. Secondary 색상 (보완 색: 그린 브라운 계열)
        secondary: {
          DEFAULT: '#A97343',  // 따뜻한 카라멜 브라운
          dark: '#805530',     // 진한 버전
        },

        // 5. Accent 색상 (대비감 있는 브릭 오렌지)
        accent: {
          DEFAULT: '#C95E2C',  // 브릭 오렌지
        },
      },
    },
  },
  plugins: [],
}
