<script>
	import { page } from '$app/stores';
	import { base, assets } from '$app/paths';
</script>

<nav>
	<ul>
		<li>
			<a aria-current={$page.path === '/' ? 'page' : undefined} href={`${base}/`}> Home </a>
		</li>
		<li>
			<a aria-current={$page.path === '/monthly/' ? 'page' : undefined} href={`${base}/monthly/`}>
				Monthly
			</a>
		</li>
		<li>
			<a aria-current={$page.path === '/yearly/' ? 'page' : undefined} href={`${base}/yearly/`}>
				Yearly
			</a>
		</li>
		<li>
			<a aria-current={$page.path === '/about/' ? 'page' : undefined} href={`${base}/about/`}>
				About
			</a>
		</li>
	</ul>
</nav>

<style>
	nav {
		border-bottom: 1px solid rgba(255, 62, 0, 0.1);
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255, 62, 0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>
