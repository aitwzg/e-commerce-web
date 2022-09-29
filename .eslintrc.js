module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': 0, // 逗号
    indent: ['off', 2], // 缩进
    'eol-last': 0,
    'space-before-function-paren': 0, // 函数名和括号之间的空格
    'space-in-parens': 0,
    'func-call-spacing': 0,
    'vue/multi-word-component-names': 0,
    'prefer-const': 0
  }
}
