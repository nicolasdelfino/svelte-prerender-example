import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import execute from "rollup-plugin-execute";
import FConfig from './fragment.config.json'
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';

const production = !process.env.ROLLUP_WATCH;
const { dist, name } = FConfig;

export default [
  {
    input: "src/main.ts",
    output: {
      sourcemap: false,
      format: "iife",
      name: "app",
      file: `${dist}/${name}.js`
    },
    plugins: [
      svelte({
        dev: !production,
        hydratable: true,
        preprocess: sveltePreprocess(),
      }),
      resolve({
        browser: true,
        dedupe: importee =>
          importee === "svelte" || importee.startsWith("svelte/")
      }),
      commonjs(),
      typescript({
        sourceMap: !production,
        inlineSources: !production
      }),
    ]
  },
  {
    input: "src/App.svelte",
    output: {
      format: "cjs",
      file: `${dist}/.temp/ssr.js`
    },
    plugins: [
      svelte({
        dev: !production,
        generate: "ssr"
      }),
      resolve({
        browser: true,
        dedupe: importee =>
          importee === "svelte" || importee.startsWith("svelte/")
      }),
      commonjs(),
      execute("node src/prerender.js")
    ]
  }
];
