import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy';

const typescriptConfiguration = {
  exclude: [
    'node_modules/**',
    'src/**/__tests__/**',
  ],
};

const copyStaticArtifacts = copy({
  targets: [
    { src: '../../README.md', dest: '.' },
    { src: '../../LICENSE', dest: '.' },
  ],
});

const iifeBundle = {
  input: 'src/dom-element-descriptors.ts',

  plugins: [typescript({
    ...typescriptConfiguration,
    tsconfigOverride: {
      compilerOptions: {
        declaration: false,
      }
    }
  }), copyStaticArtifacts],

  output: {
    name: 'DOMElementDescriptors',
    file: 'dist/dom-element-descriptors.js',
    format: 'iife',
    sourcemap: true,
  },
};

const esBundle = {
  input: 'src/dom-element-descriptors.ts',

  plugins: [typescript(typescriptConfiguration)],

  output: {
    file: 'dist/es/index.js',
    format: 'es',
    sourcemap: true,
  },
};

export default [iifeBundle, esBundle];
