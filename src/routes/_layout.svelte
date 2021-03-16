<script lang="ts">
	import Nav from "../components/Nav.svelte";

	export let segment: string;
</script>

<style>
	.wrapper {
	  height: 100vh;
	  display: flex;
	  flex-direction: column;
	}

	header {
	  flex: 0 1 auto;
	}

	main {
	  flex: 1 1 auto;
	  overflow: hidden;
	  padding: 1rem;
	}

	footer {
	  flex: 0 1 auto;
	}
</style>

<div class="wrapper">
	<header>
		<Nav {segment} />
	</header>

	<main>
		<slot></slot>
	</main>

	<footer>
		<!-- <StatusBar /> -->
	</footer>
</div>