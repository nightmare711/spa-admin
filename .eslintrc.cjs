module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      'eslint-config-prettier', 
      'plugin:react/recommended',
      'prettier'
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', 'prettier', 'unused-imports', 'eslint-plugin-react-hooks', 'react'],
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': [
        'error',
        {
          arrowParens: 'always',
          semi: true,
          trailingComma: 'none',
          tabWidth: 2,
          endOfLine: 'auto',
          useTabs: false,
          singleQuote: true,
          printWidth: 120,
          jsxSingleQuote: true
        }
      ],
      'react/display-name': 0,
      'no-unused-vars': 0,
      'react/no-unused-state': 1,
      'react/prop-types': 0,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
  
      '@typescript-eslint/no-empty-interface': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/triple-slash-reference': 0,
  
      'prefer-const': 0,
      '@typescript-eslint/explicit-module-boundary-types': 'off',
  
      '@typescript-eslint/no-var-requires': 0,
      '@typescript-eslint/no-empty-function': 0,
  
      'import/no-unresolved': 'off',
      'import/no-mutable-exports': 'off',
      'import/prefer-default-export': 'off',
      'import/no-dynamic-require': 'off',
      'global-require': 'off',
      'import/no-extraneous-dependencies': 'off',
  
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',
      
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/media-has-caption': 'off',
  
      'no-useless-catch': 'off',
      'no-continue': 'off',
      'no-nested-ternary': 'off',
      'no-unused-expressions': 'off',
      'consistent-return': 'off',
      'react/no-danger': 'off',
      'no-console': 'off',
      'no-underscore-dangle': 'off',
      '@typescript-eslint/no-unused-vars': 1,
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace|debug)$/]",
          message: 'Unexpected property on console object was called',
        },
      ],
      '@typescript-eslint/no-namespace': 'off',
      'eslint-plugin-import': 'off',
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
}