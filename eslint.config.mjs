import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
    plugins: ["@typescript-eslint", "eslint-plugin-import-helpers"],
    rules: {
      "import-helpers/order-imports": [
        "warn", {
          "newlinesBetween": "always",
          "groups": [["/^next/", "module"], "/^@/models/", "/^@/hooks/", "/^@table-library/", "/^@/styles/", "/^@/components/", "/^@/lib/", "/^@/features/", ["parent", "sibling", "index"]],
          "alphabetize": {
            "order": "asc",
            "ignoreCase": true
          }
        }
      ],
      "@next/next/no-html-link-for-pages": ["error", "packages/my-app/pages/"],
      "@next/next/no-async-client-component": "error",
      "@next/next/no-sync-scripts": "error",
      semi: "error",

    },
  },
  ),

];

export default eslintConfig;
