const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const minify = require("html-minifier").minify;
const FConfig = require('../fragment.config.json');

const { dist, name } = FConfig;

const App = require(path.resolve(process.cwd(), `${FConfig.dist}/.temp/ssr.js`));

const baseTemplate = fs.readFileSync(
  path.resolve(process.cwd(), "src/template.html"),
  "utf-8"
);

const { html, css } = App.render({ name: 'test prop' });

const minifiedHtml = minify(html, {
  collapseWhitespace: true
});

const markup = baseTemplate.replace(
  "<!-- fragment-markup -->",
  minifiedHtml
)

// css
const cssInclude = `<link rel="stylesheet" href="/${FConfig.name}.css" />`
fs.writeFileSync(path.resolve(process.cwd(), `${FConfig.dist}/${FConfig.name}.css`), css.code);
fs.writeFileSync(path.resolve(process.cwd(), `${FConfig.dist}/${FConfig.name}.css.html`), cssInclude);

// js
const jsInclude = `<script type="text/javascript" src="/${FConfig.name}.js"></script>`
fs.writeFileSync(path.resolve(process.cwd(), `${FConfig.dist}/${FConfig.name}.js.html`), jsInclude);

// markup
fs.writeFileSync(path.resolve(process.cwd(), `${FConfig.dist}/${FConfig.name}.html`), markup);

rimraf.sync(path.resolve(process.cwd(), `${FConfig.dist}/.temp`));
