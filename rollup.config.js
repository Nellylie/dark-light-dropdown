import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import url from 'rollup-plugin-url';

const packageJson = require('./package.json');

export default {
  input: 'src/index.jsx',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'auto'
    },
    {
      file: packageJson.module,
      format: 'es',
      sourcemap: true
    }
  ],
  external: Object.keys(packageJson.peerDependencies || {}),
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    babel({
      exclude: /node_modules/,
      babelHelpers: 'bundled'
    }),
    postcss({
      sourceMap: true, 
      extract: true 
    }),
    url({
      include: ['**/*.svg'],
      limit: 8192, 
      emitFiles: true, 
      fileName: '[dirname][hash][extname]', 
    }),
    terser()
  ]
};
