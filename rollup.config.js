import node from "rollup-plugin-node-resolve";
import commonJS from "rollup-plugin-commonjs";
import serve from "rollup-plugin-serve";
import typescript from "rollup-plugin-typescript";
import htmlTemplate from "rollup-plugin-generate-html-template";

export default {
  input: "./src/main.ts",
  output: {
    file: "./build/main.js",
    format: "iife",
    name: "Platformer",
  },
  plugins: [
    serve({
        contentBase: "build",
        verbose: true
    }),
    node(),
    commonJS(),
    typescript(),
    htmlTemplate({
      template: "./src/main.html",
      target: "index.html",
    }),
  ],
};
