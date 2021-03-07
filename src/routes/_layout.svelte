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
	/* main { */
	/* position: relative; */
	/* max-width: 56em; */
	/* background-color: white; */
	/* padding: 2em; */
	/* margin: 0 auto; */
	/* box-sizing: border-box; */
	/* } */

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