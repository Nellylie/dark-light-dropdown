import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import url from 'rollup-plugin-url';

const packageJson = require('./package.json');

export default {
  // Entry point for the bundle
  input: 'src/index.jsx',

  // Output configuration for different formats
  output: [
    {
      file: packageJson.main, // File path for CommonJS output
      format: 'cjs', 
      sourcemap: true,
      exports: 'auto'
    },
    {
      file: packageJson.module, // File path for ES module output
      format: 'es',
      sourcemap: true
    }
  ],
  // Exclude peer dependencies from the bundle
  external: Object.keys(packageJson.peerDependencies || {}),
  
  // Plugins used in the build process
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
