import globals from 'globals';
import react from 'eslint-plugin-react';

export default [
  {
    ignores: ['dist/', 'coverage/', '**/*.test.jsx'], // Ignore files in these folders
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: {
      react,
    },
    settings: {
      react: {
        version: 'detect', // Use 'detect' to automatically detect the version of React
      },
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    ...react.configs.flat.recommended,
    rules: {
      ...react.configs.flat.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    ...react.configs.flat['jsx-runtime'],
  },
];
