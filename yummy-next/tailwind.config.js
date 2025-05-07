/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 1. 기본 텍스트 색상
        // 사용법: className="text-text" 또는 className="text-text-light"
        text: {
          DEFAULT: '#2C2C2C', // 기본 텍스트 색상 (딥 그레이)
          light: '#6E6E6E',   // 밝은 텍스트 색상 (서브 텍스트용 그레이)
        },

        // 2. 배경색
        // 사용법: className="bg-background" 또는 className="bg-background-light"
        background: {
          DEFAULT: '#FAFAF9', // 기본 배경색 (아주 연한 웜 화이트)
          light: '#F0EFEC',   // 밝은 배경색 (섹션 배경용 연한 베이지)
        },

        // 3. 주요 색상
        // 사용법: className="text-primary" 또는 className="bg-primary"
        primary: {
          DEFAULT: '#FF7755', // 기본 primary 색상 (소프트 테라코타 오렌지)
          dark: '#E25C3D',    // 진한 primary 색상 (클릭/호버용)
        },

        // 4. 보조 색상
        // 사용법: className="text-secondary" 또는 className="bg-secondary"
        secondary: {
          DEFAULT: '#4A90E2', // 기본 secondary 색상
          dark: '#357ABD',    // 진한 secondary 색상
        },

        // 5. 강조 색상
        // 사용법: className="text-accent" 또는 className="bg-accent"
        accent: {
          DEFAULT: '#A78BFA', // 기본 accent 색상 (라벤더 퍼플)
        }
      }
    }
  },
  plugins: [],
} 