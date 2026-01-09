import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';
import terser from '@rollup/plugin-terser';

export default [
  // JS bundle (minified)
  {
    input: 'app.js',
    output: {
      file: 'dist/app.min.js',
      format: 'iife',
      name: 'App',
      sourcemap: true
    },
    plugins: [
      resolve(),
      terser()
    ]
  },

  // CSS build: this imports a small entry that pulls in `styles.css`
  {
    input: 'build/css-entry.js',
    output: {
      dir: 'dist',
      format: 'es'
    },
    plugins: [
      postcss({
        extract: 'styles.min.css',
        sourceMap: true,
        plugins: [cssnano()]
      })
    ]
  }
];
