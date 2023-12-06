import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

const packageJson = require('./package.json');

export default {
  input: 'src/index.jsx',
  output: [
    {
      file: "dist/index.js", 
      format: "cjs",
      sourcemap: true,
      exports: 'auto'

    },
    {
      file: "dist/index.es.js", 
      format: "es",
      sourcemap: true,
    }],

    external: ['react', 'react-dom']
,      
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled'
    })
  ]
};
