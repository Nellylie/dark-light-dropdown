import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import autoprefixer from 'autoprefixer';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';
import postcss from 'rollup-plugin-postcss';

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
    }),
    postcss({
      plugins: [autoprefixer()],
      extract: true
    }),
    url({
      limit: 10 * 1024, 
      include: ["**/*.svg", "**/*.png", "**/*.jpg", "**/*.gif"], 
      emitFiles: true, 
      fileName: "[dirname][name][extname]",
      destDir: "dist/assets",
    }), 
    svgr(), 
  ]
};
