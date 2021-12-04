import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		paths: {
			base: dev ? '' : '/stl-lambert-airport-data'
		},
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: adapter({}),
		trailingSlash: 'always'
	}
};

export default config;
