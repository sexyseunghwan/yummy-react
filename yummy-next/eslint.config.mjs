import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off", /* any 타입을 써도 경고가 안나오게 표시 */
      "@typescript-eslint/no-unused-vars": "warn", /* 선언만하고 사용하지 않은 변수가 있으면 -> 빨간색 대신 노란색 경고 */ 
    },
  },
];

export default eslintConfig;
