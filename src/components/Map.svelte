<script lang="ts">
  import { onMount } from "svelte";
  import { cmanPosWatch } from "./common/getLocation";

  let container;

  onMount(async () => {});
</script>

<div id="watMap"></div>

<div class="map" bind:this={container} />
