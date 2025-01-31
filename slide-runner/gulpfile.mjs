import { src, dest, watch, series, parallel } from 'gulp';
import sass from 'sass';
import gulpSass from 'gulp-sass';
import connect from 'gulp-connect';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import rollup from 'rollup';
import { terser } from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { unlinkSync, existsSync } from 'fs';
import path from 'path';

const sassCompiler = gulpSass(sass);

// Configuration
const config = {
	root: './',
	port: 8000,
	host: 'localhost',
	jsInput: 'js/index.js',
	cssInput: 'css/reveal.scss',
	dist: './dist',
	plugins: [
		{ name: 'RevealHighlight', input: './plugin/highlight/plugin.js', output: './plugin/highlight/highlight' },
		{ name: 'RevealMarkdown', input: './plugin/markdown/plugin.js', output: './plugin/markdown/markdown' },
	],
};

// JavaScript bundling
async function bundleJavaScript() {
	const bundle = await rollup.rollup({
		input: config.jsInput,
		plugins: [
			resolve(),
			commonjs(),
			babel({ babelHelpers: 'bundled', presets: ['@babel/preset-env'] }),
			terser(),
		],
	});

	await bundle.write({
		file: path.join(config.dist, 'reveal.js'),
		format: 'umd',
		sourcemap: true,
	});
}

// Plugin bundling
async function bundlePlugins() {
	await Promise.all(
		config.plugins.map(async ({ name, input, output }) => {
			const bundle = await rollup.rollup({
				input,
				plugins: [resolve(), commonjs(), babel({ babelHelpers: 'bundled' }), terser()],
			});

			await bundle.write({
				file: `${output}.esm.js`,
				format: 'es',
			});

			await bundle.write({
				file: `${output}.js`,
				format: 'umd',
			});
		})
	);
}

// Sass compilation
function compileCSS() {
	return src(config.cssInput)
		.pipe(sassCompiler().on('error', sassCompiler.logError))
		.pipe(autoprefixer())
		.pipe(cleanCSS())
		.pipe(dest(config.dist))
		.pipe(connect.reload());
}

// Watch for changes
function watchFiles() {
	watch(['css/**/*.scss'], compileCSS);
	watch(['js/**/*.js'], series(bundleJavaScript, reload));
}

// Reload server
function reload(done) {
	connect.reload();
	done();
}

// Serve files with live reload
function serve(done) {
	connect.server({
		root: config.root,
		port: config.port,
		host: config.host,
		livereload: true,
	});

	process.on('SIGINT', () => {
		console.log('\nShutting down server...');
		connect.serverClose();
		if (existsSync(path.join(config.root, 'index.html'))) {
			unlinkSync(path.join(config.root, 'index.html'));
		}
		done();
		process.exit(0);
	});
}

// Task composition
export const build = series(bundleJavaScript, bundlePlugins, compileCSS);
export const dev = series(build, serve, watchFiles);
export const cleanBuild = build;

// Default task
export default dev;
