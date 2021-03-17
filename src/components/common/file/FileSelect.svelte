<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let accept = "";
  export let multiple = false;

  const dispatch = createEventDispatcher();
  let fileInput = null;

  const onClick = () => {
    if (fileInput) fileInput.click();
  };
  
  const onSelectFile = e => {
    dispatch("select", {
      files: e.target.files
    });
  };
</script>

<style>
  input[type="file"] {
    /* opacity: 0; */
    /* width: 0; */
    /* height: 0; */
    display: none;
  }
</style>

<a href="#!" on:click|preventDefault={onClick}>
  <slot></slot>
</a>

<input 
  bind:this={fileInput} 
  type="file" 
  accept={accept}
  multiple={multiple}
  on:change={onSelectFile}
>
