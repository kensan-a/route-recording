<script lang="ts">
  export let content;
  export let type = "text/plain";
  export let bom = null;
  export let fileName = "download.txt";

  let downloadLink = null;

  const onClick = () => {
    const blob = bom
      ? new Blob([bom, content], { type })
      : new Blob([content], { type });
      
    if (window.navigator.msSaveBlob) {
      // IE10/11の場合
      window.navigator.msSaveOrOpenBlob(blob, fileName);
      // window.navigator.msSaveBlob(blob, fileName);
    } else {
      // その他のブラウザの場合
      downloadLink.href = window.URL.createObjectURL(blob);
    }
  };
</script>

<a 
  bind:this={downloadLink} 
  href="#!" 
  download={fileName}
  on:click={onClick}
>
  <slot></slot>
</a>
