import typescript from 'rollup-plugin-typescript2';

const iifeBundle = {
  input: 'src/index.ts',

  plugins: [typescript()],

  output: {
    name: 'DOMElementDescriptors',
    file: 'dist/dom-element-descriptors.js',
    format: 'iife',
    sourcemap: true,
  },
};

const esBundle = {
  input: 'src/index.ts',

  plugins: [typescript()],

  output: {
    file: 'dist/index.mjs',
    format: 'es',
    sourcemap: true,
  },
};

export default [iifeBundle, esBundle];
