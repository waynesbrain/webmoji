/**
 * @file Frontend eslint
 *
 * See:
 *
 * - https://github.com/vitejs/vite/blob/8033e5bf8d3ff43995d0620490ed8739c59171dd/packages/create-vite/template-react-ts/eslint.config.js
 */
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "prefer-const": "warn",
      // "@typescript-eslint/ban-types": [ // no longer working! rule not found
      //   "warn",
      //   {
      //     // See https://github.com/typescript-eslint/typescript-eslint/issues/2063#issuecomment-675156492
      //     extendDefaults: true,
      //     types: {
      //       "{}": false,
      //     },
      //   },
      // ],
      "@typescript-eslint/explicit-function-return-type": "off",
      // "@typescript-eslint/naming-convention": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-namespace": "off",
      // "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-use-before-define": "off",
      // https://typescript-eslint.io/rules/no-unused-vars/#what-benefits-does-this-rule-have-over-typescript
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      // "@typescript-eslint/no-var-requires": "off",
      // "react-hooks/exhaustive-deps": "warn",
      // "react-hooks/exhaustive-deps": [
      //   //
      //   // See the following issues
      //   // - https://github.com/facebook/react/issues/29786
      //   // - https://github.com/facebook/react/issues/14920#issuecomment-471070149
      //   // - https://github.com/facebook/react/issues/16873
      //   //
      //   "warn",
      //   {
      //     additionalHooks: "(useThing|useYada)",
      //   },
      // ],
      // // See https://github.com/ArnaudBarre/eslint-plugin-react-refresh
      // "react-refresh/only-export-components": [
      //   "warn",
      //   { allowConstantExport: true },
      // ],
    },
  },
]);
